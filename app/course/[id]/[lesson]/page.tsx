'use server'
import { LessonContent } from '@/components/layout/course'
import { SingleProvider } from '@/data/react'
import { Box, Container, Flex, Heading, Stack } from '@chakra-ui/react'

export default async function CoursePage( { params: promise } : { params: Promise<{ id: string, lesson: string }> } ) {
  const { id, lesson } = await promise

  return (
      <SingleProvider id={lesson} table='Lessons'>
        <LessonContent />
      </SingleProvider>
  )
}