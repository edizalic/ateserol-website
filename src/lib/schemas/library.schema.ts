import { z } from 'zod'
import { LocalizedString } from './shared'

export const CreateLibraryResourceSchema = z.object({
  categoryIds: z.array(z.string()).optional(),
  title: z.string().min(1),
  author: z.string().optional(),
  url: z.string().optional().or(z.literal('')),
  description: LocalizedString.optional(),
  published: z.boolean().default(false),
})

export const UpdateLibraryResourceSchema = CreateLibraryResourceSchema.partial()

export type CreateLibraryResourceInput = z.infer<typeof CreateLibraryResourceSchema>
export type UpdateLibraryResourceInput = z.infer<typeof UpdateLibraryResourceSchema>
