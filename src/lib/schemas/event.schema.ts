import { z } from 'zod'
import { LocalizedString } from './shared'

// Accepts "YYYY-MM-DD" from <input type="date"> as well as full ISO datetime
const DateTimeOrDate = z.string()
  .transform(val => /^\d{4}-\d{2}-\d{2}$/.test(val) ? `${val}T00:00:00.000Z` : val)
  .pipe(z.string().datetime())

export const CreateAcademicEventSchema = z.object({
  title: LocalizedString,
  description: LocalizedString.optional(),
  date: DateTimeOrDate,
  location: z.string().optional(),
  type: z.string().optional(),
  status: z.enum(['Upcoming', 'Past']).default('Upcoming'),
  featured: z.boolean().default(false),
})

export const UpdateAcademicEventSchema = CreateAcademicEventSchema.partial()

export type CreateAcademicEventInput = z.infer<typeof CreateAcademicEventSchema>
export type UpdateAcademicEventInput = z.infer<typeof UpdateAcademicEventSchema>
