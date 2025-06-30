import { z } from 'zod'
import { database } from '@asasvirtuais/crud'

export const schema = {
    Courses: {
        readable: z.object({
            id: z.string(),
            Name: z.string(),
        }),
        writable: z.object({
            Name: z.string(),
        })
    },
    Lessons: {
        readable: z.object({
            id: z.string(),
            Name: z.string(),
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
        }),
        writable: z.object({
            Name: z.string(),
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
    namespace Courses {
        type Readable = z.infer<typeof schema.Courses.readable>
        type Writable = z.infer<typeof schema.Courses.writable>
    }
    namespace Lessons {
        type Readable = z.infer<typeof schema.Lessons.readable>
        type Writable = z.infer<typeof schema.Lessons.writable>
    }
    namespace LessonProgress {
        type Readable = z.infer<typeof schema['Lesson Progress']['readable']>
        type Writable = z.infer<typeof schema['Lesson Progress']['writable']>
    }
    namespace Certificates {
        type Readable = z.infer<typeof schema.Certificates.readable>
        type Writable = z.infer<typeof schema.Certificates.writable>
    }
    namespace Profiles {
        type Readable = z.infer<typeof schema.Profiles.readable>
        type Writable = z.infer<typeof schema.Profiles.writable>
    }
    namespace Exams {
        type Readable = z.infer<typeof schema.Exams.readable>
        type Writable = z.infer<typeof schema.Exams.writable>
    }
    namespace Questions {
        type Readable = z.infer<typeof schema.Questions.readable>
        type Writable = z.infer<typeof schema.Questions.writable>
    }
    namespace ExamResults {
        type Readable = z.infer<typeof schema['Exam Results']['readable']>
        type Writable = z.infer<typeof schema['Exam Results']['writable']>
    }
        
}

export const { table } = database(schema)
