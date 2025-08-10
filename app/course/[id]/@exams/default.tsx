import { CourseExams, CourseSection } from '@/components/layout/course'
import { server } from '@/data/server'
import { Box, Text } from '@chakra-ui/react'

export default async function Exams( { params: promise } : { params: Promise<{ id: string }> } ) {
    const { id } = await promise
    const course = await server.service('Courses').find({ table: 'Courses', id })
    const exams = await server.service('Exams').list({ table: 'Exams', query: { 'Course ID': id } })

    const items = await Promise.all( exams?.map( async exam => {

        const lessons = await server.service('Lessons').list( { table: 'Lessons', query: { 'Exam ID': exam.id } } )

        return (
            <CourseSection key={exam.id} title={exam.Name} lessons={lessons} />
        )
    }))

    return (
        <CourseExams>
            <Box p={4} borderBottom='1px' borderColor='gray.200'>
                <Text fontSize='lg' color='gray.500'>{course.Name}</Text>
            </Box>

            <Box p={4}>
                {items}
            </Box>
        </CourseExams>
    )
}