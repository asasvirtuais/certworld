'use client'

import { useState, useEffect } from 'react'
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
} from '@chakra-ui/react'
import { ResponsiveSidebar } from '../ui'
import { FilterForm, useFiltersForm, useSingle, SingleProvider } from '@/data/react'

const LessonButton = ({
  lesson,
  selectedLesson,
  setSelectedLesson,
}: {
  lesson: Lesson
  selectedLesson: string
  setSelectedLesson: (id: string) => void
}) => (
  <Button
    key={lesson.id}
    onClick={() => setSelectedLesson(lesson.id)}
    variant='outline'
    w='full'
    textAlign='left'
    p={3}
    borderRadius='lg'
    border='1px'
    transition='colors'
    bg={selectedLesson === lesson.id ? 'blue.50' : 'white'}
    borderColor={selectedLesson === lesson.id ? 'blue.200' : 'gray.200'}
    _hover={{ bg: selectedLesson === lesson.id ? 'blue.50' : 'gray.50' }}
    height='auto'
  >
    <Flex align='start' gap={3} w='full'>
      <Box flexShrink={0} mt={0.5}>
        {lesson['Completed'] ? (
          <Circle size={5} bg='green.500' color='white'>
            <Check size={12} />
          </Circle>
        ) : lesson['Type'] === 'quiz' ? (
          <FileText size={20} color='gray.400' />
        ) : (
          <BookOpen size={20} color='gray.400' />
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

const CourseSection = ({
  section,
  selectedLesson,
  setSelectedLesson,
}: {
  section: { id: string; 'Title En': string; 'Title Es': string; lessons: Lesson[] }
  selectedLesson: string
  setSelectedLesson: (id: string) => void
}) => (
  <Box key={section.id} mb={6}>
    <Heading
      size='sm'
      fontWeight='semibold'
      color='gray.700'
      mb={3}
      textTransform='uppercase'
      letterSpacing='wide'
    >
      {section['Title En']} | {section['Title Es']}
    </Heading>

    <Stack gap={2}>
      {section.lessons.map((lesson) => (
        <LessonButton
          key={lesson.id}
          lesson={lesson}
          selectedLesson={selectedLesson}
          setSelectedLesson={setSelectedLesson}
        />
      ))}
    </Stack>
  </Box>
)

const LessonContent = ({}: {}) => {
  const { single: lesson } = useSingle<'Lessons'>()

  return (
    <Box>
      <Heading size='xl' fontWeight='bold' color='gray.900' mb={2}>
        {lesson['Title En']}
      </Heading>
      <Heading size='lg' fontWeight='semibold' color='blue.600' mb={6}>
        {lesson['Title Es']}
      </Heading>

      <Text color='gray.700' lineHeight='relaxed'>
        Content for this lesson would be displayed here.
      </Text>
    </Box>
  )
}

export function CourseContent({ id } : { id: string }) {
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
          <Text fontSize='sm' color='gray.500' mb={1}>{course.Name}</Text>
          <Text fontSize='sm' color='gray.500'>{course.Name}</Text>
        </Box>

        <Box p={4}>
          {/* <CourseSection  
            key={section.id}
            section={section}
            selectedLesson={selectedLesson!}
            setSelectedLesson={setSelectedLesson}
          /> */}
        </Box>
      </ResponsiveSidebar>

      {/* Main Content */}
      <Box flex={1} overflowY='auto'>
        <Container maxW='4xl' p={8}>
          <SingleProvider id={selectedLesson} table='Lessons'>
            <LessonContent />
          </SingleProvider>
        </Container>
      </Box>
    </Flex>
  )
}