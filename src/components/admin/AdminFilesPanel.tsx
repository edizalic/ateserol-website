'use client'

import { useState, useEffect, useCallback } from 'react'

interface FileRecord {
  id: string
  originalName: string
  mimeType: string
  size: number
  createdAt: string
}

interface AdminFilesPanelProps {
  /** Full API path to the files endpoint, e.g. /api/reflections/my-slug/files
   *  or /api/entity-files/portfolio/abc123 */
  apiPath: string
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '9px 11px', fontFamily: 'Inter, sans-serif', fontSize: 13,
  color: '#1E2328', backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3',
  outline: 'none', boxSizing: 'border-box',
}

export default function AdminFilesPanel({ apiPath }: AdminFilesPanelProps) {
  const [files, setFiles] = useState<FileRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadPercent, setUploadPercent] = useState(0)
  const [pendingFiles, setPendingFiles] = useState<File[]>([])
  const [error, setError] = useState('')
  const [fetchError, setFetchError] = useState('')

  const fetchFiles = useCallback(async () => {
    setLoading(true)
    setFetchError('')
    try {
      const res = await fetch(apiPath)
      if (res.ok) {
        setFiles(await res.json())
      } else {
        const data = await res.json().catch(() => ({}))
        setFetchError(data.error ?? `Failed to load files (${res.status})`)
      }
    } catch {
      setFetchError('Network error — could not load files.')
    } finally {
      setLoading(false)
    }
  }, [apiPath])

  useEffect(() => { fetchFiles() }, [fetchFiles])

  async function handleUpload() {
    if (!pendingFiles.length) return
    setUploading(true)
    setUploadPercent(0)
    setError('')
    const fd = new FormData()
    for (const f of pendingFiles) fd.append('files', f)

    const ok = await new Promise<boolean>((resolve) => {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', apiPath)
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) setUploadPercent(Math.round((e.loaded / e.total) * 100))
      }
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(true)
          return
        }
        if (xhr.status === 413) {
          setError('The reverse proxy rejected this file (HTTP 413). Files over ~1 MB are blocked until nginx sets client_max_body_size 50M; then reload nginx.')
          resolve(false)
          return
        }
        try {
          const data = JSON.parse(xhr.responseText) as { error?: string }
          setError(data.error ?? `Upload failed (${xhr.status})`)
        } catch {
          setError(`Upload failed (${xhr.status})`)
        }
        resolve(false)
      }
      xhr.onerror = () => {
        setError('Network error — upload did not complete.')
        resolve(false)
      }
      xhr.send(fd)
    })

    if (ok) {
      setPendingFiles([])
      await fetchFiles()
    }
    setUploading(false)
    setUploadPercent(0)
  }

  async function handleDelete(fileId: string) {
    if (!confirm('Delete this file?')) return
    await fetch(`${apiPath}/${fileId}`, { method: 'DELETE' })
    await fetchFiles()
  }

  return (
    <div style={{ marginTop: 32, backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3', padding: '28px' }}>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#6A747D', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
        Additional Files
      </div>

      {error && (
        <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', padding: '10px 14px', marginBottom: 16, fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#DC2626' }}>
          {error}
        </div>
      )}

      {fetchError && (
        <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', padding: '10px 14px', marginBottom: 16, fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#DC2626' }}>
          ⚠ {fetchError}
        </div>
      )}

      {/* Existing files */}
      {loading ? (
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6A747D' }}>Loading…</div>
      ) : files.length === 0 ? (
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6A747D', marginBottom: 16 }}>No files attached yet.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
          {files.map(f => (
            <div key={f.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 12px', backgroundColor: '#FAFAF8', border: '1px solid #E7E0D3' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <svg width="13" height="15" viewBox="0 0 13 15" fill="none">
                  <rect x="1" y="1" width="11" height="13" rx="1" stroke="#B08D45" strokeWidth="1.2"/>
                  <path d="M4 5h5M4 8h5M4 11h3" stroke="#B08D45" strokeWidth="1.1" strokeLinecap="round"/>
                </svg>
                <div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, color: '#1E2328' }}>{f.originalName}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6A747D' }}>{formatBytes(f.size)}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <a href={`${apiPath}/${f.id}`} download={f.originalName} style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#0B1F33', textDecoration: 'none', letterSpacing: '0.04em', textTransform: 'uppercase', borderBottom: '1px solid #0B1F33' }}>Download</a>
                <button onClick={() => handleDelete(f.id)} style={{ background: 'none', border: '1px solid #FECACA', padding: '4px 10px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#DC2626', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload new files */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '9px 14px', border: '1px solid #E7E0D3', backgroundColor: '#FAFAF8', fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6A747D', flexShrink: 0, ...inputStyle, width: 'auto' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v7M3 5l3-4 3 4" stroke="#6A747D" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 11h10" stroke="#6A747D" strokeWidth="1.3" strokeLinecap="round"/></svg>
          Choose files…
          <input type="file" multiple style={{ display: 'none' }} onChange={e => { if (e.target.files) setPendingFiles(prev => [...prev, ...Array.from(e.target.files!)]) }} />
        </label>
        {pendingFiles.length > 0 && (
          <button onClick={handleUpload} disabled={uploading} style={{ padding: '9px 20px', backgroundColor: '#0B1F33', color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', border: 'none', cursor: uploading ? 'not-allowed' : 'pointer', opacity: uploading ? 0.7 : 1 }}>
            {uploading ? `Uploading… ${uploadPercent}%` : `Upload ${pendingFiles.length} file${pendingFiles.length > 1 ? 's' : ''}`}
          </button>
        )}
      </div>
      {pendingFiles.length > 0 && (
        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {pendingFiles.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 10px', backgroundColor: '#F0EBE0', fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#1E2328' }}>
              <span>{f.name} <span style={{ color: '#6A747D', fontSize: 11 }}>({formatBytes(f.size)})</span></span>
              <button type="button" onClick={() => setPendingFiles(prev => prev.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6A747D', fontSize: 16, lineHeight: 1, padding: '0 4px' }}>×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
