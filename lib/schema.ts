import { z } from 'zod';

// Certificate Schema - aligned with Airtable Title Case fields
export const CertificateSchema = z.object({
  id: z.string(),
  'Title': z.string().min(1, 'Title is required'),
  'Description': z.string().optional(),
  'Issuer': z.string().min(1, 'Issuer is required'),
  'Date Issued': z.string().optional(),
  'Expiry Date': z.string().optional(),
  'Status': z.enum(['active', 'expired', 'pending']).default('active'),
  'Image Url': z.string().url().optional().or(z.literal('')),
  'Recipient Email': z.string().email('Invalid email format'),
  'Recipient Name': z.string().min(1, 'Recipient name is required'),
  'Completed Date': z.string().optional(),
  'Category': z.string().optional(),
});

export const CertificateInputSchema = CertificateSchema.omit({ id: true }).extend({
  'Date Issued': z.string().optional(),
  'Status': z.enum(['active', 'expired', 'pending']).optional(),
});

export const CertificateUpdateSchema = CertificateInputSchema.partial();

// Course Schema - aligned with Airtable Title Case fields
export const CourseSchema = z.object({
  id: z.string(),
  'Title': z.string().min(1, 'Title is required'),
  'Description': z.string().optional(),
  'Instructor': z.string().optional(),
  'Duration': z.string().optional(),
  'Level': z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  'Category': z.string().min(1, 'Category is required'),
  'Price': z.number().min(0).optional(),
  'Is Active': z.boolean().default(true),
  'Created At': z.string().optional(),
  'Last Modified Time': z.string().optional(),
  'Location': z.string().optional(),
  'Region': z.string().optional(),
  'Country': z.string().optional(),
  'State': z.string().optional(),
  'Languages': z.string().optional(),
  'Status': z.string().optional(),
});

export const CourseInputSchema = CourseSchema.omit({ id: true, 'Created At': true, 'Last Modified Time': true }).extend({
  'Is Active': z.boolean().optional(),
});

export const CourseUpdateSchema = CourseInputSchema.partial();

// Lesson Schema - aligned with Airtable Title Case fields (removed Section Id)
export const LessonSchema = z.object({
  id: z.string(),
  'Course Id': z.string().min(1, 'Course ID is required'),
  'Title En': z.string().min(1, 'English title is required'),
  'Title Es': z.string().min(1, 'Spanish title is required'),
  'Completed': z.boolean().default(false),
  'Type': z.enum(['lesson', 'quiz']),
  'Order': z.number().min(1, 'Order must be at least 1'),
});

export const LessonInputSchema = LessonSchema.omit({ id: true }).extend({
  'Completed': z.boolean().optional(),
});

export const LessonUpdateSchema = LessonInputSchema.partial().extend({
  'Course Id': z.string().optional(),
});

// TypeScript types derived from Zod schemas
export type Certificate = z.infer<typeof CertificateSchema>;
export type CertificateInput = z.infer<typeof CertificateInputSchema>;
export type CertificateUpdate = z.infer<typeof CertificateUpdateSchema>;

export type Course = z.infer<typeof CourseSchema>;
export type CourseInput = z.infer<typeof CourseInputSchema>;
export type CourseUpdate = z.infer<typeof CourseUpdateSchema>;

export type Lesson = z.infer<typeof LessonSchema>;
export type LessonInput = z.infer<typeof LessonInputSchema>;
export type LessonUpdate = z.infer<typeof LessonUpdateSchema>;

// Validation helper functions
export const validateCertificate = (data: unknown) => CertificateSchema.parse(data);
export const validateCertificateInput = (data: unknown) => CertificateInputSchema.parse(data);
export const validateCertificateUpdate = (data: unknown) => CertificateUpdateSchema.parse(data);

export const validateCourse = (data: unknown) => CourseSchema.parse(data);
export const validateCourseInput = (data: unknown) => CourseInputSchema.parse(data);
export const validateCourseUpdate = (data: unknown) => CourseUpdateSchema.parse(data);

export const validateLesson = (data: unknown) => LessonSchema.parse(data);
export const validateLessonInput = (data: unknown) => LessonInputSchema.parse(data);
export const validateLessonUpdate = (data: unknown) => LessonUpdateSchema.parse(data);