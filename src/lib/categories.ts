import prisma from '@/lib/prisma'

export function categoryLabel(name: unknown): string {
  if (name && typeof name === 'object' && 'en' in name) {
    const en = (name as { en?: unknown }).en
    if (typeof en === 'string' && en.trim()) return en.trim()
  }
  return 'Untitled'
}

export async function loadCategoryFieldOptions() {
  const categories = await prisma.category.findMany({ orderBy: { createdAt: 'asc' } })
  return categories.map(category => ({
    value: category.id,
    label: categoryLabel(category.name),
  }))
}

export function slugifyCategory(input: string): string {
  const replaced = input
    .replace(/İ/g, 'i')
    .replace(/I/g, 'i')
    .replace(/ı/g, 'i')
    .replace(/Ş/g, 's')
    .replace(/ş/g, 's')
    .replace(/Ğ/g, 'g')
    .replace(/ğ/g, 'g')
    .replace(/Ü/g, 'u')
    .replace(/ü/g, 'u')
    .replace(/Ö/g, 'o')
    .replace(/ö/g, 'o')
    .replace(/Ç/g, 'c')
    .replace(/ç/g, 'c')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
  return replaced || 'category'
}

export async function uniqueCategorySlug(name: string) {
  const base = slugifyCategory(name)
  let slug = base
  let n = 2
  while (await prisma.category.findUnique({ where: { slug } })) {
    slug = `${base}-${n}`
    n += 1
  }
  return slug
}

export function categoryConnect(ids: string[]) {
  return { connect: ids.map(id => ({ id })) }
}

export function categorySet(ids: string[]) {
  return { set: ids.map(id => ({ id })) }
}
