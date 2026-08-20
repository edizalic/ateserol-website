import { z } from 'zod'

export const LocalizedString = z.object({
  en: z.string(),
  tr: z.string(),
  fr: z.string().optional(),
})

export const LocalizedStringOptional = z.object({
  en: z.string().optional().default(''),
  tr: z.string().optional().default(''),
  fr: z.string().optional().default(''),
})

export const LocalizedStringArray = z.object({
  en: z.array(z.string()),
  tr: z.array(z.string()),
  fr: z.array(z.string()).optional(),
})

export type LocalizedStringType = z.infer<typeof LocalizedString>
