'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

interface FileRecord {
  id: string
  originalName: string
  mimeType: string
  size: number
  createdAt: string
}

interface ReflectionFilesSectionProps {
  slug: string
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function getFileLabel(mimeType: string) {
  if (mimeType === 'application/pdf') return 'PDF'
  if (mimeType.includes('spreadsheet') || mimeType.includes('excel') || mimeType.includes('csv')) return 'XLS'
  if (mimeType.includes('word') || mimeType.includes('document')) return 'DOC'
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return 'PPT'
  if (mimeType.startsWith('image/')) return 'IMG'
  if (mimeType.startsWith('text/')) return 'TXT'
  return 'FILE'
}

const UI = {
  en: { title: 'Additional Files', subtitle: 'Supporting materials attached to this reflection', download: 'Download', noFiles: null },
  tr: { title: 'Ek Dosyalar', subtitle: 'Bu düşünceye eklenmiş destekleyici materyaller', download: 'İndir', noFiles: null },
  fr: { title: 'Fichiers supplémentaires', subtitle: 'Matériaux joints à cette réflexion', download: 'Télécharger', noFiles: null },
}

export default function ReflectionFilesSection({ slug }: ReflectionFilesSectionProps) {
  const { lang } = useLanguage()
  const L = UI[lang]
  const [files, setFiles] = useState<FileRecord[]>([])
  const [loaded, setLoaded] = useState(false)
  const [fetchError, setFetchError] = useState(false)

  useEffect(() => {
    setLoaded(false)
    setFetchError(false)
    fetch(`/api/reflections/${slug}/files`)
      .then(async r => {
        if (!r.ok) {
          console.warn(`[ReflectionFilesSection] API returned ${r.status} for slug="${slug}"`)
          setFetchError(true)
          setLoaded(true)
          return
        }
        const data: FileRecord[] = await r.json()
        console.log(`[ReflectionFilesSection] ${data.length} file(s) for slug="${slug}"`)
        setFiles(data)
        setLoaded(true)
      })
      .catch(err => {
        console.error('[ReflectionFilesSection] fetch failed:', err)
        setFetchError(true)
        setLoaded(true)
      })
  }, [slug])

  // Don't render anything while loading or if there truly are no files and no error
  if (!loaded) return null
  if (!fetchError && files.length === 0) return null

  return (
    <section style={{ borderTop: '1px solid #E7E0D3', padding: '56px 32px 72px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ display: 'block', width: 28, height: 1.5, backgroundColor: '#B08D45' }} />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5, fontWeight: 500, color: '#B08D45', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{L.title}</span>
        </div>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A747D', margin: '0 0 28px', lineHeight: 1.6 }}>{L.subtitle}</p>

        {fetchError ? (
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#DC2626', fontStyle: 'italic' }}>
            Could not load files. Please try refreshing the page.
          </p>
        ) : (
          /* File grid */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
            {files.map(file => (
              <a
                key={file.id}
                href={`/api/files/${file.id}`}
                download={file.originalName}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '16px 18px', border: '1px solid #E7E0D3',
                  backgroundColor: '#FFFFFF', textDecoration: 'none',
                  color: 'inherit', transition: 'border-color 0.15s, background-color 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#B08D45'; e.currentTarget.style.backgroundColor = '#FAFAF8' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E7E0D3'; e.currentTarget.style.backgroundColor = '#FFFFFF' }}
              >
                {/* File type badge */}
                <div style={{
                  width: 40, height: 40, flexShrink: 0, display: 'grid', placeItems: 'center',
                  backgroundColor: '#F0EBE0', border: '1px solid #E7E0D3',
                  fontFamily: 'Inter, sans-serif', fontSize: 9, fontWeight: 700,
                  color: '#B08D45', letterSpacing: '0.04em',
                }}>
                  {getFileLabel(file.mimeType)}
                </div>

                {/* Name + size */}
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500,
                    color: '#1E2328', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>{file.originalName}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#6A747D', marginTop: 2 }}>
                    {formatBytes(file.size)}
                  </div>
                </div>

                {/* Download arrow */}
                <div style={{ flexShrink: 0, color: '#B08D45' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1v8M4 7l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1.5 12.5h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
