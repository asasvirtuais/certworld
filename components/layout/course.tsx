'use client'

import { useMemo, ReactNode } from 'react'
import { Check, FileText, BookOpen } from 'lucide-react'
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Stack,
  Circle,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { ResponsiveSidebar } from '../ui'
import { useSingle } from '@/data/react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

const LessonButton = ( { single } : { single: Lesson } ) => {

  const { id, lesson } = useParams()

  return (
    <Button
      key={single.id}
      variant='outline'
      w='full'
      textAlign='left'
      p={3}
      borderRadius='lg'
      border='1px'
      transition='colors'
      bg={lesson === single.id ? 'blue.50' : 'white'}
      borderColor={lesson === single.id ? 'blue.200' : 'gray.200'}
      _hover={{ bg: lesson === single.id ? 'blue.50' : 'gray.50' }}
      height='auto'
      asChild
    >
      <Link href={`/course/${id}/${single.id}`}>
        <Flex align='center' gap={3} w='full'>
          <Box flexShrink={0} mt={0.5}>
            {single['Completed'] ? (
              <Circle size={5} bg='green.500' color='white'>
                <Check size={12} />
              </Circle>
            ) : single['Type'] === 'quiz' ? (
              <FileText size={20}/>
            ) : (
              <BookOpen size={20}/>
            )}
          </Box>
          <Box flex={1} minW={0} textAlign='left'>
            <Text fontSize='sm' fontWeight='medium' color='gray.900' mb={1}>
              {single['Title En']}
            </Text>
            <Text fontSize='xs' color='gray.500'>
              {single['Title Es']}
            </Text>
          </Box>
        </Flex>
      </Link>
    </Button>
  )
}

export const CourseSection = ({
  title,
  lessons,
}: {
  title: string,
  lessons: Lesson[],
}) => {
  return (
    <Box mb={6}>
      <Heading
        size='sm'
        fontWeight='semibold'
        color='gray.700'
        mb={3}
        letterSpacing='wide'
      >
        {title}
      </Heading>
  
      <Stack gap={2}>
        {lessons.map((lesson) => (
          <LessonButton key={lesson.id} single={lesson} />
        ))}
      </Stack>
    </Box>
  )
}

const LessonAttachments = ( { lesson } : { lesson: Lesson } ) => {
  const attachments = useMemo(() => lesson.Attachments, [lesson.Attachments])

  return (
    <Grid gridTemplateColumns='1fr 1fr 1fr 1fr' gridTemplateRows='3fr 1fr'>
      {attachments.map((file, index) => (
        <GridItem key={file.id} colSpan={index === 0 ? 4 : 1}>
          {file.type === 'video/mp4' && (
            <video width='100%' controls src={file.url}/>
          )}
        </GridItem>
      ))}
    </Grid>
  )
}

export const EchoLineDisplay = ( { line } : { line: EchoLine } ) => {
  return (
    <>
      <Heading size='xl' fontWeight='bold' color='gray.900' mb={2}>
        {line['Content En']}
      </Heading>
      <Heading size='lg' fontWeight='semibold' color='blue.600' mb={6}>
        {line['Content Es']}
      </Heading>
    </>
  )
}

export const LessonContent = ( { lesson, lines } : { lesson: Lesson, lines: EchoLine[] } ) => {

  return (
    <Box>
      <Heading size='xl' fontWeight='bold' color='gray.900' mb={2}>
        {lesson['Title En']}
      </Heading>
      <Heading size='lg' fontWeight='semibold' color='blue.600' mb={6}>
        {lesson['Title Es']}
      </Heading>

      {lines.map(line => (
        <EchoLineDisplay key={line.id} line={line} />
      ))}

      <Stack gap={4}>
        <Text color='gray.700' lineHeight='relaxed'>
          {lesson['Content En']}
        </Text>
        <Text color='blue.700' lineHeight='relaxed'>
          {lesson['Content Es']}
        </Text>
        <LessonAttachments lesson={lesson} />
      </Stack>
    </Box>
  )
}

export function CourseExams( { children } : { children: ReactNode } ) {

  return (
    <Flex h='100vh' bg='gray.50'>
      <ResponsiveSidebar width='80'>
        {children}
      </ResponsiveSidebar>
    </Flex>
  )
}