'use server'
import { CourseContent } from '@/components/layout/course'
import { SingleProvider, FilterForm } from '@/data/react'

export default async function CoursePage( { params: promise } : { params: Promise<{ id: string }> } ) {
  const { id } = await promise
  return (
    <SingleProvider id={id} table='Courses'>
      <FilterForm table='Exams' defaults={{query: { 'Course ID': id }}}>
        <CourseContent/>
      </FilterForm>
    </SingleProvider>
  )
}