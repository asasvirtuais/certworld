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
            lastEdited: z.string().optional(),
            status: z.string().optional(),
            statusColor: z.string().optional(),
            progress: z.number().optional(),
            lessonsCompleted: z.number().optional(),
            totalLessons: z.number().optional(),
            isComplete: z.boolean().optional(),
        }),
        writable: z.object({
            Name: z.string(),
            Description: z.string(),
            Category: z.string(),
            Languages: z.string().array(),
            Duration: z.number(),
            Price: z.number(),
            Location: z.string(),
        }),
    },
    Lessons: {
        readable: z.object({
            id: z.string(),
            Name: z.string(),
            titleEn: z.string().optional(),
            titleEs: z.string().optional(),
            completed: z.boolean().optional(),
            type: z.enum(['lesson', 'quiz']).optional(),
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
        }),
        writable: z.object({
            Name: z.string(),
        })
    },
    Profiles: {
        readable: z.object({
            id: z.string(),
            Name: z.string(),
        }),
        writable: z.object({
            Name: z.string(),
        })
    },
    Exams: {
        readable: z.object({
            id: z.string(),
            Name: z.string(),
            Course: z.string(),
            'Course ID': z.string(),
        }),
        writable: z.object({
            Name: z.string(),
            Course: z.string(),
        })
    },
    Questions: {
        readable: z.object({
            id: z.string(),
            Name: z.string(),
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
