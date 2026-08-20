'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Field {
  key: string
  label: string
  type?: 'text' | 'textarea' | 'select' | 'checkbox' | 'date' | 'number' | 'url'
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
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '9px 11px', fontFamily: 'Inter, sans-serif', fontSize: 13,
  color: '#1E2328', backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3',
  outline: 'none', boxSizing: 'border-box',
}

export default function AdminForm({ title, fields, initialValues = {}, apiPath, method = 'POST', redirectTo }: AdminFormProps) {
  const router = useRouter()
  const [values, setValues] = useState<Record<string, unknown>>(initialValues)
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
      body: JSON.stringify(values),
    })

    if (res.ok) {
      router.push(redirectTo)
      router.refresh()
    } else {
      const data = await res.json()
      setError(data.error ?? 'Something went wrong')
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
