import { z } from 'zod'
import { LocalizedString } from './shared'

export const ReflectionStatusSchema = z.enum(['published', 'forthcoming', 'draft'])

export const CreateReflectionSchema = z.object({
  slug: z.string().min(1),
  title: LocalizedString,
  subtitle: LocalizedString.optional(),
  body: LocalizedString,
  excerpt: LocalizedString.optional(),
  category: LocalizedString.optional(),
  status: ReflectionStatusSchema.default('draft'),
  featured: z.boolean().default(false),
  publishedAt: z.string().datetime().optional(),
})

export const UpdateReflectionSchema = CreateReflectionSchema.partial()

export type CreateReflectionInput = z.infer<typeof CreateReflectionSchema>
export type UpdateReflectionInput = z.infer<typeof UpdateReflectionSchema>
