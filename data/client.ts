// import io from 'socket.io-client'
// import socketio from '@feathersjs/socketio-client'
import { CRUD, fetcher } from '@asasvirtuais/crud'
import { feathers } from '@feathersjs/feathers'
import { table } from './schema'

export const client = feathers<{
    'Certificates': CRUD<Certificates.Readable, Certificates.Writable>,
    'Courses': CRUD<Courses.Readable, Courses.Writable>,
    'Exams': CRUD<Exams.Readable, Exams.Writable>,
    'Exam Results': CRUD<ExamResults.Readable, ExamResults.Writable>,
    'Lessons': CRUD<Lessons.Readable, Lessons.Writable>,
    'Lesson Progress': CRUD<LessonProgress.Readable, LessonProgress.Writable>,
    'Profiles': CRUD<Profiles.Readable, Profiles.Writable>,
    'Questions': CRUD<Questions.Readable, Questions.Writable>,
}>()
.use('Certificates', table('Certificates', fetcher()))
.use('Courses', table('Courses', fetcher()))
.use('Exams', table('Exams', fetcher()))
.use('Exam Results', table('Exam Results', fetcher()))
.use('Lessons', table('Lessons', fetcher()))
.use('Lesson Progress', table('Lesson Progress', fetcher()))
.use('Profiles', table('Profiles', fetcher()))
.use('Questions', table('Questions', fetcher()))
// .use('todos', table('todos', fetcher()))
// .configure(socketio(io()))
