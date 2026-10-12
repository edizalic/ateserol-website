import { z } from 'zod'
import { LocalizedString } from './shared'

export const CreateStudentProjectSchema = z.object({
  title: z.string().min(1),
  description: LocalizedString.optional().default({ en: '', tr: '' }),
  year: z.number().int().optional(),
  courseId: z.string().optional().or(z.literal('')).transform(v => v === '' ? undefined : v),
  imageUrl: z.string().optional().or(z.literal('')),
  published: z.boolean().default(false),
})

export const UpdateStudentProjectSchema = CreateStudentProjectSchema.partial()

export type CreateStudentProjectInput = z.infer<typeof CreateStudentProjectSchema>
export type UpdateStudentProjectInput = z.infer<typeof UpdateStudentProjectSchema>
