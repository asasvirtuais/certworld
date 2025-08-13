'use client'

import { useMemo, ReactNode, useCallback, useState, useEffect } from 'react'
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
  HStack,
} from '@chakra-ui/react'
import { ResponsiveSidebar } from '../ui'
import { SingleProvider, useSingle, useTable } from '@/data/react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0'

const LessonButton = ( { selected, children, completed, quiz, href } : React.PropsWithChildren<{ selected?: boolean, completed?: boolean, quiz?: boolean, href : string }> ) => {

  return (
    <Button
      variant='outline'
      w='full'
      textAlign='left'
      p={3}
      borderRadius='lg'
      border='1px'
      transition='colors'
      bg={selected ? 'blue.50' : 'white'}
      borderColor={selected ? 'blue.200' : 'gray.200'}
      _hover={{ bg: selected ? 'blue.50' : 'gray.50' }}
      height='auto'
      asChild
    >
      <Link href={href}>
        <Flex align='center' gap={3} w='full'>
          <Box flexShrink={0} mt={0.5}>
            {completed && (
              <Circle size={5} bg='green.500' color='white'>
                <Check size={12} />
              </Circle>
            )}
            {quiz && (
              <BookOpen size={20}/>
            )}
            {! quiz && ! completed && ( <FileText size={20}/> )}
          </Box>
          <Box flex={1} minW={0} textAlign='left'>
            {children}
          </Box>
        </Flex>
      </Link>
    </Button>
  )
}

export const LessonCard = ({ lesson, exam, selected } : { lesson : Lesson, exam: string, selected : boolean }) => {
  const { id } = useParams()

  return (
    <LessonButton key={lesson.id} selected={selected} href={`/course/${id}/${exam}/${lesson.id}`}>
      <Text fontSize='sm' fontWeight='medium' color='gray.900'>
        {lesson['Title En']}
      </Text>
      <Text fontSize='xs' color='gray.500'>
        {lesson['Title Es']}
      </Text>
    </LessonButton>
  )
}

export const CourseSection = ({
  title,
  exam,
  lessons,
}: {
  title: string,
  exam: string,
  lessons: Lesson[],
}) => {
  const { id, lesson, exam: examParam } = useParams()

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
        {lessons.map((single) => (
          <LessonCard key={single.id} selected={lesson === single.id} lesson={single} exam={exam}/>
        ))}
        <LessonButton selected={! lesson && examParam === exam} quiz href={`/course/${id}/${exam}`}>
            <Text fontSize='sm' fontWeight='medium' color='gray.900' mb={1}>Module Quiz</Text>
            <Text fontSize='xs' color='gray.500'>Examen del Módulo</Text>
        </LessonButton>
      </Stack>
    </Box>
  )
}

const LessonAttachments = ( { lesson } : { lesson: Lesson } ) => {
  const attachments = useMemo(() => lesson.Attachments ?? [], [lesson.Attachments])

  return (
    <Grid
      gridTemplateColumns='1fr 1fr 1fr 1fr'
      // gridTemplateRows='3fr 1fr'
    >
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
    <Box>
      <Text color='gray.700'>
        {line['Content En']}
      </Text>
      <Text color='blue.700'>
        {line['Content Es']}
      </Text>
    </Box>
  )
}

const CompleteLessonButtonInner = () => {
  const { lesson } = useParams()
  const [loading, setLoading] = useState(false)
  const profiles = useTable('Profiles')
  const { single: profile } = useSingle<'Profiles'>()

  const onClick = useCallback(async () => {
    setLoading(true)
    const set = new Set([...profile['Completed Lessons'] ?? [], lesson])
    const array = Array.from(set)
    await profiles.update.trigger({ table: 'Profiles', id: profile.id, data: { 'Completed Lessons': array } })
    setLoading(false)
  }, [lesson, profile])

  const completed = useMemo(() => {
    return (profile?.['Completed Lessons'] ?? []).includes(lesson as string)
  }, [profile, lesson])

  return (
    <Button onClick={onClick} colorPalette={completed ? 'green' : 'blue'} disabled={loading || completed}>{completed ? 'Completed' : loading ? 'Loading...' : 'Complete Lesson'}</Button>
  )
}

const CompleteLessonButton = () => {
  const { user } = useUser()

  if ( ! user )
    return <Button colorPalette='gray'>Loading</Button>


  return (
    <SingleProvider table='Profiles' id={(user as any).id} >
      <CompleteLessonButtonInner/>
    </SingleProvider>
  )
}

export const LessonContent = ( { lesson, lines } : { lesson: Lesson, lines: EchoLine[] } ) => {

  return (
    <Stack gap={4}>

      <Box mt={2} mb={4}>
        <HStack>
          <Box>
            <Heading size='2xl' color='gray.900'>
              {lesson['Title En']}
            </Heading>
            <Heading size='xl' color='blue.600'>
              {lesson['Title Es']}
            </Heading>
          </Box>
          <Box ml='auto'>
            <CompleteLessonButton/>    
          </Box>
        </HStack>
      </Box>

      <Box fontSize='xl'>
        <Text color='gray.700'>
          {lesson['Content En']}
        </Text>
        <Text color='blue.700'>
          {lesson['Content Es']}
        </Text>
      </Box>

      {lines.map(line => (
        <EchoLineDisplay key={line.id} line={line} />
      ))}

      <LessonAttachments lesson={lesson} />

      <CompleteLessonButton />
    </Stack>
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