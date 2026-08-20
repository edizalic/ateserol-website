import { z } from 'zod'
import { LocalizedString } from './shared'

export const PortfolioTypeSchema = z.enum(['research', 'project', 'event'])

export const CreatePortfolioEntrySchema = z.object({
  type: PortfolioTypeSchema,
  title: LocalizedString,
  description: LocalizedString,
  tags: z.array(z.string()).default([]),
  url: z.string().url().optional().or(z.literal('')),
  imageUrl: z.string().url().optional().or(z.literal('')),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  date: z.string().datetime().optional(),
})

export const UpdatePortfolioEntrySchema = CreatePortfolioEntrySchema.partial()

export type CreatePortfolioEntryInput = z.infer<typeof CreatePortfolioEntrySchema>
export type UpdatePortfolioEntryInput = z.infer<typeof UpdatePortfolioEntrySchema>
