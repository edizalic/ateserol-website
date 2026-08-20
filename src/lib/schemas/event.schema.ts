import { z } from 'zod'
import { LocalizedString } from './shared'

export const CreateAcademicEventSchema = z.object({
  title: LocalizedString,
  description: LocalizedString.optional(),
  date: z.string().datetime(),
  location: z.string().optional(),
  type: z.string().optional(),
  status: z.enum(['Upcoming', 'Past']).default('Upcoming'),
  featured: z.boolean().default(false),
})

export const UpdateAcademicEventSchema = CreateAcademicEventSchema.partial()

export type CreateAcademicEventInput = z.infer<typeof CreateAcademicEventSchema>
export type UpdateAcademicEventInput = z.infer<typeof UpdateAcademicEventSchema>
