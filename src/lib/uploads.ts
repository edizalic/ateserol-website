import path from 'path'
import fs from 'fs/promises'
import { createWriteStream } from 'fs'
import { pipeline } from 'stream/promises'
import { Readable, Transform } from 'stream'
import { randomUUID } from 'crypto'
import busboy from 'busboy'
import type { NextRequest } from 'next/server'

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50 MB

/** Absolute path to the uploads directory. */
export function uploadsDir(): string {
  return path.join(process.cwd(), 'uploads')
}

/** Absolute path to a stored file by its `filename` field. */
export function uploadedFilePath(filename: string): string {
  return path.join(uploadsDir(), filename)
}

/** Ensure the uploads directory exists. */
export async function ensureUploadsDir(): Promise<void> {
  await fs.mkdir(uploadsDir(), { recursive: true })
}

export interface SavedFile {
  storedName: string
  originalName: string
  mimeType: string
  size: number
}

/**
 * Stream all files from a multipart/form-data request directly to disk
 * without buffering the entire body in memory first.
 */
export async function streamUploadFiles(req: NextRequest): Promise<SavedFile[]> {
  await ensureUploadsDir()
  if (!req.body) return []

  const headers: Record<string, string> = {}
  req.headers.forEach((v, k) => { headers[k] = v })

  return new Promise((resolve, reject) => {
    const bb = busboy({
      headers,
      limits: { fileSize: MAX_FILE_SIZE, files: 20 },
    })
    const saved: SavedFile[] = []
    const writes: Promise<void>[] = []
    let settled = false

    const fail = (err: unknown) => {
      if (settled) return
      settled = true
      reject(err)
    }

    bb.on('file', (_field, fileStream, info) => {
      const filename = info.filename || 'upload'
      const mimeType = info.mimeType || 'application/octet-stream'
      const ext = path.extname(filename)
      const storedName = `${randomUUID()}${ext}`
      const dest = uploadedFilePath(storedName)
      let size = 0
      let truncated = false

      fileStream.on('limit', () => { truncated = true })

      const counter = new Transform({
        transform(chunk, _enc, cb) {
          size += (chunk as Buffer).length
          cb(null, chunk)
        },
      })

      writes.push(
        pipeline(fileStream, counter, createWriteStream(dest)).then(async () => {
          if (truncated) {
            await fs.unlink(dest).catch(() => {})
            throw new Error(`File "${filename}" exceeds the 50 MB limit`)
          }
          saved.push({ storedName, originalName: filename, mimeType, size })
        }),
      )
    })

    bb.on('error', fail)
    bb.on('finish', () => {
      Promise.all(writes)
        .then(() => {
          if (!settled) {
            settled = true
            resolve(saved)
          }
        })
        .catch(fail)
    })

    const nodeStream = Readable.fromWeb(req.body as Parameters<typeof Readable.fromWeb>[0])
    nodeStream.on('error', fail)
    nodeStream.pipe(bb)
  })
}
