import { z } from 'zod'
import { LocalizedString } from './shared'

export const ReflectionStatusSchema = z.enum(['published', 'forthcoming', 'draft'])

// Accepts both full ISO datetime ("2026-10-12T00:00:00.000Z") and
// date-only ("2026-10-12") from <input type="date">
const DateTimeOrDate = z.string()
  .transform(val => /^\d{4}-\d{2}-\d{2}$/.test(val) ? `${val}T00:00:00.000Z` : val)
  .pipe(z.string().datetime())

export const CreateReflectionSchema = z.object({
  slug: z.string().min(1),
  title: LocalizedString,
  subtitle: LocalizedString.optional(),
  body: LocalizedString,
  excerpt: LocalizedString.optional(),
  category: LocalizedString.optional(),
  status: ReflectionStatusSchema.default('draft'),
  featured: z.boolean().default(false),
  publishedAt: DateTimeOrDate.optional(),
})

export const UpdateReflectionSchema = CreateReflectionSchema.partial()

export type CreateReflectionInput = z.infer<typeof CreateReflectionSchema>
export type UpdateReflectionInput = z.infer<typeof UpdateReflectionSchema>
