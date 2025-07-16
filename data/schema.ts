import { z } from 'zod'
import { database } from '@asasvirtuais/crud'

export const schema = {
    Courses: {
        readable: z.object({
            id: z.string(),
            Name: z.string(),
            Description: z.string(),
            Category: z.string(),
            Languages: z.string().array(),
            Duration: z.number(),
            Price: z.number(),
            Location: z.string(),
            'Stripe ID': z.string(),
            'Last Edited': z.string().optional(),
            'Status': z.string().optional(),
            'Status Color': z.string().optional(),
            'Progress': z.number().optional(),
            'Lessons Completed': z.number().optional(),
            'Total Lessons': z.number().optional(),
            'Is Complete': z.boolean().optional(),
            'Created By': z.string().optional(), // Profile ID
        }),
        writable: z.object({
            Name: z.string(),
            Description: z.string(),
            Category: z.string(),
            Languages: z.string().array(),
            Duration: z.number(),
            Price: z.number(),
            Location: z.string(),
            'Stripe ID': z.string(),
        }),
    },
    Lessons: {
        readable: z.object({
            id: z.string(),
            Name: z.string(),
            'Title En': z.string().optional(),
            'Title Es': z.string().optional(),
            'Completed': z.boolean().optional(),
            'Type': z.enum(['lesson', 'quiz']).optional(),
            'Exam ID': z.string().optional(), // Exam ID reference
            'Content En': z.string().optional(),
            'Content Es': z.string().optional(),
        }),
        writable: z.object({
            Name: z.string(),
        })
    },
    'Lesson Progress': {
        readable: z.object({
            id: z.string(),
            Name: z.string(),
        }),
        writable: z.object({
            Name: z.string(),
        })
    },
    Certificates: {
        readable: z.object({
            id: z.string(),
            Name: z.string(),
            'User Name': z.string().optional(),
            'Completion Date': z.string().optional(),
        }),
        writable: z.object({
            Name: z.string(),
        })
    },
    Profiles: {
        readable: z.object({
            id: z.string(),
            Name: z.string(),
            Email: z.string(),
            Role: z.enum(['Creator', 'Owner', 'Learner']),
            'Customer ID': z.string(),
            'OAuth ID': z.string(),
            'Created At': z.string(),
            'Owned Courses': z.string().array(),
        }),
        writable: z.object({
            Name: z.string(),
            Email: z.string(),
            'Customer ID': z.string(),
            'OAuth ID': z.string(),
            Role: z.enum(['Creator', 'Owner', 'Learner']),
            'Owned Courses': z.string().array(),
        })
    },
    Exams: {
        readable: z.object({
            id: z.string(),
            Name: z.string(),
            Course: z.string(), // Course Name
            'Course ID': z.string(), // Course ID reference
            Description: z.string().optional(),
        }),
        writable: z.object({
            Name: z.string(),
            Course: z.string(),
        })
    },
    Questions: {
        readable: z.object({
            id: z.string(),
            Name: z.string(), // Question text
            'Lesson ID': z.string(), // Lesson ID reference
        }),
        writable: z.object({
            Name: z.string(),
        })
    },
    'Exam Results': {
        readable: z.object({
            id: z.string(),
            Name: z.string(),
        }),
        writable: z.object({
            Name: z.string(),
        })
    },
}

declare global {
    namespace Course {
        type Readable = z.infer<typeof schema.Courses.readable>
        type Writable = z.infer<typeof schema.Courses.writable>
    }
    type Course = Course.Readable
    namespace Lesson {
        type Readable = z.infer<typeof schema.Lessons.readable>
        type Writable = z.infer<typeof schema.Lessons.writable>
    }
    type Lesson = Lesson.Readable
    namespace LessonProgress {
        type Readable = z.infer<typeof schema['Lesson Progress']['readable']>
        type Writable = z.infer<typeof schema['Lesson Progress']['writable']>
    }
    type LessonProgress = LessonProgress.Readable
    namespace Certificate {
        type Readable = z.infer<typeof schema.Certificates.readable>
        type Writable = z.infer<typeof schema.Certificates.writable>
    }
    type Certificate = Certificate.Readable
    namespace Profile {
        type Readable = z.infer<typeof schema.Profiles.readable>
        type Writable = z.infer<typeof schema.Profiles.writable>
    }
    type Profile = Profile.Readable
    namespace Exam {
        type Readable = z.infer<typeof schema.Exams.readable>
        type Writable = z.infer<typeof schema.Exams.writable>
    }
    type Exam = Exam.Readable
    namespace Question {
        type Readable = z.infer<typeof schema.Questions.readable>
        type Writable = z.infer<typeof schema.Questions.writable>
    }
    type Question = Question.Readable
    namespace ExamResult {
        type Readable = z.infer<typeof schema['Exam Results']['readable']>
        type Writable = z.infer<typeof schema['Exam Results']['writable']>
    }
    type ExamResult = ExamResult.Readable
}

export const { table } = database(schema)
