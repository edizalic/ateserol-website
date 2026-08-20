'use client'

import Link from 'next/link'

interface Column<T> {
  header: string
  accessor: (row: T) => React.ReactNode
  width?: string
}

interface AdminTableProps<T> {
  columns: Column<T>[]
  rows: T[]
  editHref?: (row: T) => string
  onDelete?: (row: T) => void
  emptyMessage?: string
}

export default function AdminTable<T extends { id: string }>({
  columns, rows, editHref, onDelete, emptyMessage = 'No records found.',
}: AdminTableProps<T>) {
  if (rows.length === 0) {
    return (
      <div style={{ padding: '48px 32px', textAlign: 'center', backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6A747D' }}>
        {emptyMessage}
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E7E0D3', overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #E7E0D3' }}>
            {columns.map(col => (
              <th key={col.header} style={{ padding: '12px 16px', textAlign: 'left', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#6A747D', letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap', width: col.width }}>
                {col.header}
              </th>
            ))}
            {(editHref || onDelete) && <th style={{ padding: '12px 16px', width: 100 }} />}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id} style={{ borderBottom: i < rows.length - 1 ? '1px solid #F0EBE2' : 'none' }}>
              {columns.map(col => (
                <td key={col.header} style={{ padding: '12px 16px', fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#1E2328', verticalAlign: 'middle' }}>
                  {col.accessor(row)}
                </td>
              ))}
              {(editHref || onDelete) && (
                <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    {editHref && (
                      <Link href={editHref(row)} style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#0B1F33', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Edit</Link>
                    )}
                    {onDelete && (
                      <button onClick={() => onDelete(row)} style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: '#DC2626', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.06em', textTransform: 'uppercase', padding: 0 }}>Del</button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
