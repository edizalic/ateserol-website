'use client'

import Link from 'next/link'

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

export function Breadcrumb({ items, backgroundColor = '#F7F5F0' }: { items: { label: string; href?: string }[]; backgroundColor?: string }) {
  return (
    <div style={{ backgroundColor, borderBottom: '1px solid #E7E0D3', padding: '0 32px' }} className="breadcrumb-bar">
      <div style={{ maxWidth: 1240, margin: '0 auto', height: 44, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        {items.map((item, i) => (
          <span key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {i > 0 && (
              <svg width="5" height="9" viewBox="0 0 5 9" fill="none">
                <path d="M1 1l3 3.5L1 8" stroke="#E7E0D3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {item.href ? (
              <Link href={item.href}
                style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400, color: '#6A747D', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#B08D45')}
                onMouseLeave={e => (e.currentTarget.style.color = '#6A747D')}>
                {item.label}
              </Link>
            ) : (
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, color: '#1E2328' }}>{item.label}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Section label ────────────────────────────────────────────────────────────

export function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
      <span style={{ display: 'block', width: 28, height: 1.5, backgroundColor: '#B08D45' }} />
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5, fontWeight: 500, color: '#B08D45', letterSpacing: '0.12em', textTransform: 'uppercase' as const }}>{text}</span>
    </div>
  )
}

// ─── Tag chip ─────────────────────────────────────────────────────────────────

export function Tag({ label, color = '#0B1F33' }: { label: string; color?: string }) {
  return (
    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 600, color, border: `1px solid ${color}`, padding: '2px 8px', letterSpacing: '0.05em', whiteSpace: 'nowrap' as const, opacity: 0.85 }}>
      {label}
    </span>
  )
}

// ─── Download button ──────────────────────────────────────────────────────────

export function DownloadBtn({ label, meta }: { label: string; meta?: string }) {
  return (
    <button style={{
      display: 'flex', alignItems: 'center', gap: 8,
      fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600,
      color: '#0B1F33', backgroundColor: 'transparent',
      border: '1px solid #E7E0D3', padding: '10px 16px', cursor: 'pointer',
      letterSpacing: '0.04em', textTransform: 'uppercase' as const, transition: 'all 0.15s', minHeight: 44,
    }}
      onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = '#B08D45'; el.style.color = '#B08D45' }}
      onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = '#E7E0D3'; el.style.color = '#0B1F33' }}>
      <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
        <path d="M5.5 1v8M2.5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M1 12h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      {label}
      {meta && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 400, color: '#6A747D', letterSpacing: '0.02em', textTransform: 'none' as const }}>{meta}</span>}
    </button>
  )
}

// ─── Arrow link ───────────────────────────────────────────────────────────────

export function ArrowLink({ href, label, light }: { href: string; label: string; light?: boolean }) {
  const color = light ? '#B08D45' : '#0B1F33'
  return (
    <Link href={href} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color, textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase' as const, borderBottom: `1px solid ${color}`, paddingBottom: 1, transition: 'opacity 0.15s' }}
      onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
      {label}
      <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
        <path d="M8 1l3 3-3 3M1 4h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  )
}

// ─── Primary button ───────────────────────────────────────────────────────────

export function PrimaryBtn({ label, onClick, type = 'button' }: { label: string; onClick?: () => void; type?: 'button' | 'submit' }) {
  return (
    <button type={type} onClick={onClick} style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: '#FFFFFF', backgroundColor: '#0B1F33', border: 'none', padding: '12px 24px', cursor: 'pointer', letterSpacing: '0.06em', textTransform: 'uppercase' as const, minHeight: 44, transition: 'background-color 0.15s' }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1A3550')}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#0B1F33')}>
      {label}
    </button>
  )
}

// ─── Ghost button ─────────────────────────────────────────────────────────────

export function GhostBtn({ label, onClick, active }: { label: string; onClick?: () => void; active?: boolean }) {
  return (
    <button onClick={onClick} style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: active ? 600 : 400, color: active ? '#FFFFFF' : '#0B1F33', backgroundColor: active ? '#0B1F33' : 'transparent', border: '1px solid #E7E0D3', padding: '8px 14px', cursor: 'pointer', letterSpacing: '0.04em', minHeight: 36, transition: 'all 0.15s' }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = '#0B1F33' } }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = '#E7E0D3' } }}>
      {label}
    </button>
  )
}

// ─── Filter chip ──────────────────────────────────────────────────────────────

export function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, color: '#0B1F33', backgroundColor: '#F0EBE0', border: '1px solid #E7E0D3', padding: '5px 10px', letterSpacing: '0.03em' }}>
      {label}
      <button onClick={onRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6A747D', display: 'flex', alignItems: 'center', padding: 0, minWidth: 16, minHeight: 16 }}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 2l6 6M8 2L2 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </button>
    </span>
  )
}

// ─── Nav strip (page-bottom) ──────────────────────────────────────────────────

export function NavStrip({ heading, sub, links }: {
  heading: string; sub: string
  links: { label: string; href: string; primary?: boolean }[]
}) {
  return (
    <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E7E0D3', padding: '40px 32px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 17, fontWeight: 700, color: '#0B1F33', marginBottom: 4 }}>{heading}</div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6A747D' }}>{sub}</div>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {links.map(l => (
            <Link key={l.label} href={l.href} style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: l.primary ? '#FFFFFF' : '#0B1F33', backgroundColor: l.primary ? '#0B1F33' : 'transparent', border: l.primary ? 'none' : '1px solid #0B1F33', padding: '11px 22px', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' as const, transition: 'all 0.15s' }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.backgroundColor = '#1A3550'; el.style.color = '#FFFFFF' }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.backgroundColor = l.primary ? '#0B1F33' : 'transparent'; el.style.color = l.primary ? '#FFFFFF' : '#0B1F33' }}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Empty / No-results state ─────────────────────────────────────────────────

export function EmptyState({ title, body, icon }: { title: string; body: string; icon?: React.ReactNode }) {
  return (
    <div style={{ padding: '64px 32px', textAlign: 'center', backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3' }}>
      {icon && <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center', opacity: 0.4 }}>{icon}</div>}
      <div style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: 18, fontWeight: 700, color: '#0B1F33', marginBottom: 8 }}>{title}</div>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6A747D', lineHeight: 1.65, maxWidth: 400, margin: '0 auto' }}>{body}</div>
    </div>
  )
}
