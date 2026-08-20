import { z } from 'zod'
import { LocalizedString, LocalizedStringArray } from './shared'

export const WeekItemSchema = z.object({
  week: z.number(),
  title: z.string(),
  topics: z.array(z.string()).optional(),
})

export const AssessmentItemSchema = z.object({
  name: z.string(),
  weight: z.number(),
  description: z.string().optional(),
})

export const CreateCourseSchema = z.object({
  slug: z.string().min(1),
  title: LocalizedString,
  subtitle: LocalizedString.optional(),
  description: LocalizedString,
  outcomes: LocalizedStringArray,
  weeklyPlan: z.object({
    en: z.array(WeekItemSchema),
    tr: z.array(WeekItemSchema),
  }),
  assessments: z.object({
    en: z.array(AssessmentItemSchema),
    tr: z.array(AssessmentItemSchema),
  }),
  published: z.boolean().default(false),
  categoryId: z.string().optional(),
})

export const UpdateCourseSchema = CreateCourseSchema.partial()

export const CreateCourseCategorySchema = z.object({
  slug: z.string().min(1),
  name: LocalizedString,
})

export type CreateCourseInput = z.infer<typeof CreateCourseSchema>
export type UpdateCourseInput = z.infer<typeof UpdateCourseSchema>
export type CreateCourseCategoryInput = z.infer<typeof CreateCourseCategorySchema>
