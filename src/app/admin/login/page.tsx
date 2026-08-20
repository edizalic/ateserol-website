'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      const data = await res.json()
      setError(data.error ?? 'Login failed')
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', fontFamily: 'Inter, sans-serif', fontSize: 14,
    color: '#1E2328', backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3',
    outline: 'none', boxSizing: 'border-box',
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0B1F33' }}>
      <div style={{ width: '100%', maxWidth: 400, padding: 32 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 22, color: '#FFFFFF', fontWeight: 700, marginBottom: 4 }}>Ateş Erol</div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#B08D45', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Admin Access</div>
        </div>

        <form onSubmit={handleSubmit} style={{ backgroundColor: '#FFFFFF', padding: '32px 28px' }}>
          <div style={{ borderTop: '3px solid #B08D45', marginBottom: 28, paddingTop: 24 }}>
            <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 18, color: '#0B1F33', fontWeight: 700 }}>Sign In</div>
          </div>

          {error && (
            <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', padding: '10px 14px', marginBottom: 20, fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#DC2626' }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#6A747D', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} autoComplete="email" />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#6A747D', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={inputStyle} autoComplete="current-password" />
          </div>

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', backgroundColor: '#0B1F33', color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
