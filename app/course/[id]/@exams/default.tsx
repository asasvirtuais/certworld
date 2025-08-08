import { CourseExams } from '@/components/layout/course'
import { server } from '@/data/server'

export default async function Exams( { params: promise } : { params: Promise<{ id: string }> } ) {
    const { id } = await promise
    const exams = await server.service('Exams').list({ table: 'Exams', query: { 'Course ID': id } })

    return (
        <CourseExams exams={exams} />
    )
}