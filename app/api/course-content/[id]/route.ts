import { server } from '@/data/server'
import { NextRequest } from 'next/server'

export const GET = async (request: NextRequest, { params: promise } : { params: Promise<{ id: string }> } ) => {

    const { id } = await promise
    const course = await server.service('Courses').find({id, table: 'Courses'})
    const exams = await server.service('Exams').list({table: 'Exams', query: { 'Course ID': id }})

    for (const exam of exams) {
        const lessons = await server.service('Lessons').list({table: 'Lessons', query: { 'Exam ID': exam.id }})
        for (const lesson of lessons) {
            // const questions = await server.service('Questions').list({table: 'Questions', query: { 'Lesson ID': lesson.id }})
            // for (const question of questions) {
            // }
        }
    }
}
