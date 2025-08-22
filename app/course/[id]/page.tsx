'use server'
import { CourseSection } from '@/components/layout/course'
import { server } from '@/data/server'
import { SimpleGrid } from '@chakra-ui/react'

export default async function CoursePage( { params: promise } : { params: Promise<{ id: string }> } ) {

  const { id } = await promise

  const exams = await server.service('Exams').list({ table: 'Exams', query: { 'Course ID': id } })

  const items = await Promise.all( exams?.map( async exam => {

      const lessons = await server.service('Lessons').list( { table: 'Lessons', query: { 'Exam ID': exam.id } } )

      return (
        <CourseSection key={exam.id} title={exam.Name} lessons={lessons} exam={exam.id} />
      )
  }))

  return (
    <SimpleGrid columns={{base: 1, sm: 2}} gap={4}>
      {items}
    </SimpleGrid>
  )
}