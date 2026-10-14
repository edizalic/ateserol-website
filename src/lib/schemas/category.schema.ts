import { z } from 'zod'

export const CategoryNameSchema = z.object({
  en: z.string().trim().min(1),
  tr: z.string().trim().min(1),
  fr: z.string().trim().min(1),
})

export const CreateCategorySchema = z.object({
  name: CategoryNameSchema,
})

export const UpdateCategorySchema = CreateCategorySchema

export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>
export type UpdateCategoryInput = z.infer<typeof UpdateCategorySchema>
