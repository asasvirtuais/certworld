'use server'
import { LessonContent } from '@/components/layout/course'
import { server } from '@/data/server'

export default async function CoursePage( { params: promise } : { params: Promise<{ id: string, lesson: string }> } ) {
  const { id, lesson: lessonId } = await promise

  const lesson = await server.service('Lessons').find({ table: 'Lessons', id: lessonId })

  return (
    <LessonContent lesson={lesson} />
  )
}