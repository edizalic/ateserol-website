import path from 'path'
import fs from 'fs/promises'

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
