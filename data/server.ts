import { feathers } from '@feathersjs/feathers'
import { CRUD } from '@asasvirtuais/crud'
import { table } from './schema'
import { crud } from './airtable'

export const server = feathers<{
    'Certificates':    CRUD<Certificate.Readable,    Certificate.Writable>,
    'Courses':         CRUD<Course.Readable,         Course.Writable>,
    'Exams':           CRUD<Exam.Readable,           Exam.Writable>,
    'Exam Results':    CRUD<ExamResult.Readable,     ExamResult.Writable>,
    'Lessons':         CRUD<Lesson.Readable,         Lesson.Writable>,
    'Lesson Progress': CRUD<LessonProgress.Readable, LessonProgress.Writable>,
    'Profiles':        CRUD<Profile.Readable,        Profile.Writable>,
    'Questions':       CRUD<Question.Readable,       Question.Writable>,
    'Echo Lines':      CRUD<EchoLine.Readable,       EchoLine.Writable>,
    'Answers':         CRUD<Answers.Readable,        Answers.Writable>,
}>()
.use('Certificates',    table('Certificates', crud))
.use('Courses',         table('Courses', crud))
.use('Exams',           table('Exams', crud))
.use('Exam Results',    table('Exam Results', crud))
.use('Lessons',         table('Lessons', crud))
.use('Lesson Progress', table('Lesson Progress', crud))
.use('Profiles',        table('Profiles', crud))
.use('Questions',       table('Questions', crud))
.use('Answers',         table('Answers', crud))
.use('Echo Lines',      table('Echo Lines', crud))
