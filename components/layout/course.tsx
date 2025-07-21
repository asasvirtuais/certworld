'use client'

import { useState, useEffect, useMemo } from 'react'
import { Check, FileText, BookOpen } from 'lucide-react'
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Circle,
  List,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { ResponsiveSidebar } from '../ui'
import { FilterForm, useFiltersForm, useSingle, SingleProvider } from '@/data/react'

const LessonButton = ({ selected, onSelect }: { selected: string, onSelect: (lessonId: string) => void }) => {
  const { single: lesson } = useSingle<'Lessons'>()

  return (
    <Button
      key={lesson.id}
      onClick={() => onSelect(lesson.id)}
      variant='outline'
      w='full'
      textAlign='left'
      p={3}
      borderRadius='lg'
      border='1px'
      transition='colors'
      bg={selected === lesson.id ? 'blue.50' : 'white'}
      borderColor={selected === lesson.id ? 'blue.200' : 'gray.200'}
      _hover={{ bg: selected === lesson.id ? 'blue.50' : 'gray.50' }}
      height='auto'
    >
      <Flex align='center' gap={3} w='full'>
        <Box flexShrink={0} mt={0.5}>
          {lesson['Completed'] ? (
            <Circle size={5} bg='green.500' color='white'>
              <Check size={12} />
            </Circle>
          ) : lesson['Type'] === 'quiz' ? (
            <FileText size={20}/>
          ) : (
            <BookOpen size={20}/>
          )}
        </Box>
        <Box flex={1} minW={0} textAlign='left'>
          <Text fontSize='sm' fontWeight='medium' color='gray.900' mb={1}>
            {lesson['Title En']}
          </Text>
          <Text fontSize='xs' color='gray.500'>
            {lesson['Title Es']}
          </Text>
        </Box>
      </Flex>
    </Button>
  )
}

const CourseSection = ({
  title,
  lessons,
  selected,
  onSelect,
}: {
  title: string,
  lessons: string[],
  selected: string,
  onSelect: (lessonId: string) => void,
}) => (
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
        <SingleProvider key={lesson} id={lesson} table='Lessons'>
          <LessonButton selected={selected} onSelect={onSelect}/>
        </SingleProvider>
      ))}
    </Stack>
  </Box>
)

const LessonAttachments = () => {
  const { single: lesson } = useSingle<'Lessons'>()
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

const LessonContent = () => {
  const { single: lesson } = useSingle<'Lessons'>()

  return (
    <Box>
      <Heading size='xl' fontWeight='bold' color='gray.900' mb={2}>
        {lesson['Title En']}
      </Heading>
      <Heading size='lg' fontWeight='semibold' color='blue.600' mb={6}>
        {lesson['Title Es']}
      </Heading>

      <Stack gap={4}>
        <Text color='gray.700' lineHeight='relaxed'>
          {lesson['Content En']}
        </Text>
        <Text color='blue.700' lineHeight='relaxed'>
          {lesson['Content Es']}
        </Text>
        <LessonAttachments/>
      </Stack>
    </Box>
  )
}

export function CourseContent() {
  const { single: course } = useSingle<'Courses'>()
  const { result: exams, submit } = useFiltersForm('Exams')
  const [selectedLesson, setSelectedLesson] = useState<string>('')

  useEffect(() => {
    submit({})
  }, [])

  return (
    <Flex h='100vh' bg='gray.50'>
      <ResponsiveSidebar width='80'>
        <Box p={4} borderBottom='1px' borderColor='gray.200'>
          <Text fontSize='lg' color='gray.500'>{course.Name}</Text>
        </Box>

        <Box p={4}>
          {exams?.map(exam => (
            <CourseSection key={exam.id} title={exam.Name} lessons={exam.Lessons} selected={selectedLesson} onSelect={setSelectedLesson} />
          ))}
        </Box>
      </ResponsiveSidebar>

      {/* Main Content */}
      <Box flex={1} overflowY='auto'>
        <Container maxW='4xl' p={8}>
          <Stack>
            <Heading as='h1' fontSize='4xl' mb={12}>{course.Name}</Heading>
            {selectedLesson && (
              <SingleProvider key={selectedLesson} id={selectedLesson} table='Lessons'>
                <LessonContent />
              </SingleProvider>
            )}
          </Stack>
        </Container>
      </Box>
    </Flex>
  )
}