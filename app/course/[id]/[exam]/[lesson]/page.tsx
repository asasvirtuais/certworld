'use server'
import { LessonContent } from '@/components/layout/course'
import { server } from '@/data/server'

export default async function CoursePage( { params: promise } : { params: Promise<{ id: string, lesson: string }> } ) {
  const { id, lesson: lessonId } = await promise

  const lesson = await server.service('Lessons').find({ table: 'Lessons', id: lessonId })

  const lines = await Promise.all((lesson['Echo Lines'] ?? []).map(
    async (lineId) => server.service('Echo Lines').find({table: 'Echo Lines', id: lineId})
  ))

  return (
    <LessonContent lesson={lesson} lines={lines} />
  )
}