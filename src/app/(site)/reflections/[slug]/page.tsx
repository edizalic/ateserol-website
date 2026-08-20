import type { Metadata } from 'next'
import ReflectionArticleClient from './ReflectionArticleClient'

export const metadata: Metadata = {
  title: 'Reflection',
  description: 'An essay on teaching, business and judgment.',
}

export default function Page() {
  return <ReflectionArticleClient />
}
