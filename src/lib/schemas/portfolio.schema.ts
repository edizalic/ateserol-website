import { z } from 'zod'
import { LocalizedString } from './shared'

// Accepts "YYYY-MM-DD" from <input type="date"> as well as full ISO datetime
const DateTimeOrDate = z.string()
  .transform(val => /^\d{4}-\d{2}-\d{2}$/.test(val) ? `${val}T00:00:00.000Z` : val)
  .pipe(z.string().datetime())

// Accepts either a string array or a comma-separated string from the admin form
const TagsFromStringOrArray = z.union([
  z.array(z.string()),
  z.string().transform(s => s.split(',').map(t => t.trim()).filter(Boolean)),
]).default([])

export const PortfolioTypeSchema = z.enum(['research', 'project', 'event'])

export const CreatePortfolioEntrySchema = z.object({
  type: PortfolioTypeSchema,
  title: LocalizedString,
  description: LocalizedString.optional().default({ en: '', tr: '' }),
  tags: TagsFromStringOrArray,
  url: z.string().optional().or(z.literal('')),
  imageUrl: z.string().optional().or(z.literal('')),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  date: DateTimeOrDate.optional(),
})

export const UpdatePortfolioEntrySchema = CreatePortfolioEntrySchema.partial()

export type CreatePortfolioEntryInput = z.infer<typeof CreatePortfolioEntrySchema>
export type UpdatePortfolioEntryInput = z.infer<typeof UpdatePortfolioEntrySchema>
