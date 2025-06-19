'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Card,
  Button,
} from '@chakra-ui/react'
import { Container, ProgressBar } from '../ui'
import { Progress } from '@chakra-ui/react'
import Link from 'next/link'

interface Course {
  id: number
  title: string
  state: string
  progress: number
  lessonsCompleted: number
  totalLessons: number
  isComplete: boolean
}

function CourseCard({ course, isLast }: { course: Course; isLast: boolean }) {
  return (
    <Box key={course.id} borderBottom={isLast ? 'none' : '1px'} borderColor='gray.200'>
      <Box mb={4}>
        <Heading size='md' fontWeight='bold' color='gray.900'>
          <Text as='span' textTransform='uppercase'>{course.state}</Text> | {course.title}
        </Heading>
      </Box>
      <Box mb={2}>
        <Progress.Root value={course.progress}>
          <Progress.Track>
            <Progress.Range></Progress.Range>
          </Progress.Track>
        </Progress.Root>
      </Box>
      <Flex justify='space-between' align='center'>
        <Text fontSize='sm' color='gray.500'>
          {course.lessonsCompleted} of {course.totalLessons} lessons completed
        </Text>
        {course.isComplete ? (
          <Button variant='solid' size='xs' colorPalette='blue' asChild>
            <Link href='/certificate'>
              View Certificate
              <ArrowRight size={16} />
            </Link>
          </Button>
        ) : (
          <Button variant='solid' size='xs' colorPalette='blue'>
            Resume Course
            <ArrowRight size={16} />
          </Button>
        )}
      </Flex>
    </Box>
  )
}

export function MyCourses() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: 'Notary Public Prep',
      state: 'TEXAS',
      progress: 50,
      lessonsCompleted: 2,
      totalLessons: 4,
      isComplete: false,
    },
    {
      id: 2,
      title: 'Notary Public Prep',
      state: 'CALIFORNIA',
      progress: 100,
      lessonsCompleted: 4,
      totalLessons: 4,
      isComplete: true,
    },
  ])
  return (
    <Card.Root>
      <Card.Body asChild>
        <Stack gap={4}>
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} isLast={index === courses.length - 1} />
          ))}
        </Stack>
      </Card.Body>
    </Card.Root>
  )
}

export function WelcomeContent({ name } : { name: string }) {

  return (
    <Container maxW='breakpoint-lg' my={12}>
      <Box mb={12}>
        <Heading size='xl' fontWeight='bold' color='gray.900' mb={2}>Welcome, {name}!</Heading>
        <Text color='gray.500' fontSize='lg'>Track your progress and continue learning.</Text>
      </Box>

      <Flex mb={8} justify='space-between' align='center' alignItems='flex-start'>
        <Heading size='lg' fontWeight='bold' color='gray.900'>My Courses</Heading>
        <Button size='sm' variant='outline' colorPalette='gray' asChild>
          <Link href='/courses'>
            Explore more courses
          </Link>
        </Button>
      </Flex>
      <MyCourses/>
    </Container>
  )
}

export const WelcomeLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box minH='100dvh' bg='white'>
      {children}
    </Box>
  )
}
