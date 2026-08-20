import { z } from 'zod'
import { LocalizedString } from './shared'

export const CreateLibraryResourceSchema = z.object({
  category: z.string().min(1),
  title: z.string().min(1),
  author: z.string().optional(),
  url: z.string().url().optional().or(z.literal('')),
  description: LocalizedString.optional(),
  published: z.boolean().default(false),
})

export const UpdateLibraryResourceSchema = CreateLibraryResourceSchema.partial()

export type CreateLibraryResourceInput = z.infer<typeof CreateLibraryResourceSchema>
export type UpdateLibraryResourceInput = z.infer<typeof UpdateLibraryResourceSchema>
