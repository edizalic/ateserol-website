'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Field {
  key: string
  label: string
  type?: 'text' | 'textarea' | 'select' | 'checkbox' | 'date' | 'number' | 'url' | 'files' | 'image' | 'upload'
  options?: { value: string; label: string }[]
  required?: boolean
  placeholder?: string
  rows?: number
  localized?: boolean
}

interface AdminFormProps {
  title: string
  fields: Field[]
  initialValues?: Record<string, unknown>
  apiPath: string
  method?: 'POST' | 'PUT'
  redirectTo: string
  /** If provided, after saving a record any pending files will be uploaded here.
   *  Supports `{slug}` and `{id}` placeholders that are replaced with the saved
   *  record's corresponding fields, e.g. "/api/reflections/{slug}/files". */
  fileUploadPath?: string
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '9px 11px', fontFamily: 'Inter, sans-serif', fontSize: 13,
  color: '#1E2328', backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3',
  outline: 'none', boxSizing: 'border-box',
}

export default function AdminForm({ title, fields, initialValues = {}, apiPath, method = 'POST', redirectTo, fileUploadPath }: AdminFormProps) {
  const router = useRouter()
  const [values, setValues] = useState<Record<string, unknown>>(initialValues)
  const [pendingFiles, setPendingFiles] = useState<File[]>([])
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  function set(key: string, val: unknown) {
    setValues(prev => ({ ...prev, [key]: val }))
  }

  function setLocalized(key: string, lang: 'en' | 'tr' | 'fr', val: string) {
    setValues(prev => {
      const existing = (prev[key] as Record<string, string>) ?? {}
      return { ...prev, [key]: { ...existing, [lang]: val } }
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const res = await fetch(apiPath, {
      method,
      headers: { 'Content-Type': 'application/json' },
      // Strip out empty strings so optional fields (e.g. publishedAt) are absent rather than ""
      body: JSON.stringify(
        Object.fromEntries(Object.entries(values).filter(([, v]) => v !== '' && v !== undefined && v !== null))
      ),
    })

    if (res.ok) {
      // If there are pending files and we know where to upload them, do so now
      if (pendingFiles.length > 0 && fileUploadPath) {
        const savedRecord = await res.json() as Record<string, unknown>
        // Replace {slug} / {id} placeholders with values from the saved record
        const uploadUrl = fileUploadPath.replace(/\{(\w+)\}/g, (_, key) =>
          String(savedRecord[key] ?? '')
        )
        const fd = new FormData()
        for (const f of pendingFiles) fd.append('files', f)
        await fetch(uploadUrl, { method: 'POST', body: fd })
      }
      router.push(redirectTo)
      router.refresh()
    } else {
      const data = await res.json()
      console.error('[AdminForm] save failed status=%d', res.status, data)
      // Build a human-readable error message from Zod flatten() details if present
      let msg = data.error ?? 'Something went wrong'
      if (data.details) {
        const fieldErrors = data.details.fieldErrors as Record<string, string[]> | undefined
        const formErrors = data.details.formErrors as string[] | undefined
        const parts: string[] = []
        if (formErrors?.length) parts.push(...formErrors)
        if (fieldErrors) {
          for (const [field, errs] of Object.entries(fieldErrors)) {
            if (Array.isArray(errs) && errs.length) parts.push(`${field}: ${errs.join(', ')}`)
          }
        }
        if (parts.length) msg = parts.join(' · ')
      }
      setError(msg)
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 22, fontWeight: 700, color: '#0B1F33', margin: 0 }}>{title}</h2>
        <button type="submit" disabled={saving} style={{ padding: '10px 24px', backgroundColor: '#0B1F33', color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>

      {error && (
        <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', padding: '10px 14px', marginBottom: 20, fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#DC2626' }}>
          {error}
        </div>
      )}

      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3', padding: '28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {fields.map(field => {
          const val = values[field.key]
          const locVal = (val as Record<string, string> | undefined) ?? {}

          if (field.localized) {
            return (
              <div key={field.key}>
                <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#6A747D', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>{field.label}</label>
                <div className="admin-loc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8 }}>
                  {(['en', 'tr', 'fr'] as const).map(lang => (
                    <div key={lang}>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: '#B08D45', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>{lang.toUpperCase()}</div>
                      {field.type === 'textarea' ? (
                        <textarea rows={field.rows ?? 3} value={locVal[lang] ?? ''} onChange={e => setLocalized(field.key, lang, e.target.value)} placeholder={field.placeholder} style={{ ...inputStyle, resize: 'vertical' }} />
                      ) : (
                        <input type="text" value={locVal[lang] ?? ''} onChange={e => setLocalized(field.key, lang, e.target.value)} placeholder={field.placeholder} style={inputStyle} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          }

          if (field.type === 'checkbox') {
            return (
              <div key={field.key} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <input type="checkbox" id={field.key} checked={!!val} onChange={e => set(field.key, e.target.checked)} style={{ width: 16, height: 16 }} />
                <label htmlFor={field.key} style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#1E2328' }}>{field.label}</label>
              </div>
            )
          }

          if (field.type === 'select') {
            return (
              <div key={field.key}>
                <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#6A747D', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>{field.label}</label>
                <select value={(val as string) ?? ''} onChange={e => set(field.key, e.target.value)} style={{ ...inputStyle, appearance: 'auto' }}>
                  <option value="">— Select —</option>
                  {field.options?.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
            )
          }

          if (field.type === 'textarea') {
            return (
              <div key={field.key}>
                <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#6A747D', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>{field.label}</label>
                <textarea rows={field.rows ?? 4} value={(val as string) ?? ''} onChange={e => set(field.key, e.target.value)} placeholder={field.placeholder} style={{ ...inputStyle, resize: 'vertical' }} />
              </div>
            )
          }

          // 'image' — upload an image; stores the resulting URL in values[field.key]
          if (field.type === 'image') {
            const currentUrl = (val as string) ?? ''
            return (
              <div key={field.key}>
                <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#6A747D', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>{field.label}</label>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  {currentUrl && (
                    <div style={{ position: 'relative', border: '1px solid #E7E0D3', flexShrink: 0 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={currentUrl} alt="Preview" style={{ display: 'block', width: 120, height: 80, objectFit: 'cover' }} />
                      <button type="button" onClick={() => set(field.key, '')} style={{ position: 'absolute', top: 2, right: 2, background: 'rgba(0,0,0,0.55)', border: 'none', color: '#fff', width: 18, height: 18, cursor: 'pointer', display: 'grid', placeItems: 'center', fontSize: 12, lineHeight: 1 }}>×</button>
                    </div>
                  )}
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '9px 14px', border: '1px solid #E7E0D3', backgroundColor: '#FAFAF8', fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6A747D' }}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="1" y="1" width="11" height="11" rx="1" stroke="#6A747D" strokeWidth="1.2"/><circle cx="4.5" cy="4.5" r="1" fill="#6A747D"/><path d="M1 9l3-3 2.5 2.5L9 6l3 3" stroke="#6A747D" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {currentUrl ? 'Replace image…' : 'Upload image…'}
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={async e => {
                      const f = e.target.files?.[0]
                      if (!f) return
                      const fd = new FormData()
                      fd.append('file', f)
                      const res = await fetch('/api/media', { method: 'POST', body: fd })
                      if (res.ok) {
                        const data = await res.json() as { url: string }
                        set(field.key, data.url)
                      }
                    }} />
                  </label>
                </div>
              </div>
            )
          }

          // 'upload' — upload a single file; stores URL in values[field.key]
          if (field.type === 'upload') {
            const currentUrl = (val as string) ?? ''
            return (
              <div key={field.key}>
                <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#6A747D', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>{field.label}</label>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                  {currentUrl && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px', backgroundColor: '#F0EBE0', border: '1px solid #E7E0D3', fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#1E2328' }}>
                      <svg width="11" height="13" viewBox="0 0 11 13" fill="none"><rect x="1" y="1" width="9" height="11" rx="1" stroke="#B08D45" strokeWidth="1.1"/><path d="M3 5h5M3 7.5h5M3 10h3" stroke="#B08D45" strokeWidth="1" strokeLinecap="round"/></svg>
                      <a href={currentUrl} target="_blank" rel="noreferrer" style={{ color: '#0B1F33', textDecoration: 'underline', maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{currentUrl.split('/').pop()}</a>
                      <button type="button" onClick={() => set(field.key, '')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6A747D', fontSize: 15, lineHeight: 1 }}>×</button>
                    </div>
                  )}
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '9px 14px', border: '1px solid #E7E0D3', backgroundColor: '#FAFAF8', fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6A747D' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v7M3 5l3-4 3 4" stroke="#6A747D" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 11h10" stroke="#6A747D" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    {currentUrl ? 'Replace file…' : 'Upload file…'}
                    <input type="file" style={{ display: 'none' }} onChange={async e => {
                      const f = e.target.files?.[0]
                      if (!f) return
                      const fd = new FormData()
                      fd.append('file', f)
                      const res = await fetch('/api/media', { method: 'POST', body: fd })
                      if (res.ok) {
                        const data = await res.json() as { url: string }
                        set(field.key, data.url)
                      }
                    }} />
                  </label>
                </div>
              </div>
            )
          }

          if (field.type === 'files') {            return (
              <div key={field.key}>
                <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#6A747D', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>{field.label}</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '10px 14px', border: '1px solid #E7E0D3', backgroundColor: '#FAFAF8', fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6A747D' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M4 7l3 4 3-4" stroke="#6A747D" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 12h12" stroke="#6A747D" strokeWidth="1.3" strokeLinecap="round"/></svg>
                  {pendingFiles.length > 0 ? `${pendingFiles.length} file${pendingFiles.length > 1 ? 's' : ''} selected` : 'Choose files…'}
                  <input type="file" multiple style={{ display: 'none' }} onChange={e => { if (e.target.files) setPendingFiles(prev => [...prev, ...Array.from(e.target.files!)]) }} />
                </label>
                {pendingFiles.length > 0 && (
                  <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {pendingFiles.map((f, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 10px', backgroundColor: '#F0EBE0', fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#1E2328' }}>
                        <span>{f.name} <span style={{ color: '#6A747D', fontSize: 11 }}>({(f.size / 1024).toFixed(1)} KB)</span></span>
                        <button type="button" onClick={() => setPendingFiles(prev => prev.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6A747D', fontSize: 16, lineHeight: 1, padding: '0 4px' }}>×</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          }

          return (
            <div key={field.key}>
              <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#6A747D', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>{field.label}</label>
              <input
                type={field.type ?? 'text'}
                value={(val as string | number) ?? ''}
                onChange={e => set(field.key, field.type === 'number' ? (e.target.value ? Number(e.target.value) : '') : e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                style={inputStyle}
              />
            </div>
          )
        })}
      </div>
      <style>{`@media (max-width: 900px) { .admin-loc-grid { grid-template-columns: 1fr !important; } }`}</style>
    </form>
  )
}
