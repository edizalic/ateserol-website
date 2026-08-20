import type { Metadata } from 'next'
import { Inter, Libre_Baskerville } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-libre-baskerville',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Ateş Erol — Lecturer, Business Education',
    template: '%s | Ateş Erol',
  },
  description:
    'Teaching, research, applied projects and notes on business education, feasibility and management.',
  icons: {
    icon: [
      { url: '/icons/illustrated/ates-erol-logo.png', type: 'image/png' },
    ],
    shortcut: '/icons/illustrated/ates-erol-logo.png',
    apple: '/icons/illustrated/ates-erol-logo.png',
  },
  openGraph: {
    siteName: 'Ateş Erol',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ateserol.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${libreBaskerville.variable}`}>
      <body style={{ margin: 0, backgroundColor: '#F7F5F0' }}>{children}</body>
    </html>
  )
}
