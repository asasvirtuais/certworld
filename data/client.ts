// import io from 'socket.io-client'
// import socketio from '@feathersjs/socketio-client'
import { CRUD, fetcher } from '@asasvirtuais/crud'
import { feathers } from '@feathersjs/feathers'
import { table } from './schema'

const config = {
    baseUrl: '/api/v1'
}

export const client = feathers<{
    'Certificates':    CRUD<Certificate.Readable,    Certificate.Writable>,
    'Courses':         CRUD<Course.Readable,         Course.Writable>,
    'Exams':           CRUD<Exam.Readable,           Exam.Writable>,
    'Exam Results':    CRUD<ExamResult.Readable,     ExamResult.Writable>,
    'Lessons':         CRUD<Lesson.Readable,         Lesson.Writable>,
    'Lesson Progress': CRUD<LessonProgress.Readable, LessonProgress.Writable>,
    'Profiles':        CRUD<Profile.Readable,        Profile.Writable>,
    'Questions':       CRUD<Question.Readable,       Question.Writable>,
}>()
.use('Certificates', table('Certificates', fetcher(config)))
.use('Courses', table('Courses', fetcher(config)))
.use('Exams', table('Exams', fetcher(config)))
.use('Exam Results', table('Exam Results', fetcher(config)))
.use('Lessons', table('Lessons', fetcher(config)))
.use('Lesson Progress', table('Lesson Progress', fetcher(config)))
.use('Profiles', table('Profiles', fetcher(config)))
.use('Questions', table('Questions', fetcher(config)))
// .use('todos', table('todos', fetcher()))
// .configure(socketio(io()))
