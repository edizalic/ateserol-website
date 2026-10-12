import { z } from 'zod'
import { LocalizedString } from './shared'

export const MaterialTypeSchema = z.enum(['presentation', 'note', 'template', 'dataset'])

export const CreateTeachingMaterialSchema = z.object({
  title: LocalizedString,
  type: MaterialTypeSchema,
  fileUrl: z.string().optional().or(z.literal('')),
  course: z.string().optional(),
  semester: z.string().optional(),
  published: z.boolean().default(false),
})

export const UpdateTeachingMaterialSchema = CreateTeachingMaterialSchema.partial()

export type CreateTeachingMaterialInput = z.infer<typeof CreateTeachingMaterialSchema>
export type UpdateTeachingMaterialInput = z.infer<typeof UpdateTeachingMaterialSchema>
