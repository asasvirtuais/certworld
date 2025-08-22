'use client'

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
import { Container } from '../ui'
import { Progress } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

function CourseProgress({ course, profile }: { course: Course, profile: Profile }) {

  const totalLessons = course['Lessons']?.length
  const completedLessons = course['Lessons']?.filter( id => profile['Completed Lessons']?.includes(id) ).length
  const totalExams = course['Exams']?.length
  const completedExams = course['Exams']?.filter( id => profile['Completed Exams']?.includes(id) ).length
  const ratio = ((completedLessons + completedExams) / (totalLessons + totalExams))
  const complete = totalLessons === completedLessons && totalExams === completedExams

  return (
    <Box key={course.id} borderColor='gray.200' pb={4}>
      <Box mb={4}>
        <Heading size='md' fontWeight='bold' color='gray.900'>
          <Text as='span' textTransform='uppercase'>{course.Location.split(', ')[0]}</Text> | {course.Name}
        </Heading>
      </Box>
      <Box mb={2}>
        <Progress.Root defaultValue={100 * ratio}>
          <Progress.Track>
            <Progress.Range/>
          </Progress.Track>
        </Progress.Root>
      </Box>
      <Flex justify='space-between' align='center'>
        <Text fontSize='sm' color='gray.500'>
          {completedLessons} of {totalLessons} lessons completed | {completedExams} of {totalExams} exams completed
        </Text>
        {complete ? (
          <Button variant='solid' size='xs' colorPalette='blue' asChild>
            <Link href={`/certificate/${course['Certificate ID']}`}>
              View Certificate
              <ArrowRight size={16} />
            </Link>
          </Button>
        ) : (
          <Button variant='solid' size='xs' colorPalette='blue' asChild>
            <Link href={`/course/${course.id}`}>
              Resume Course
              <ArrowRight size={16} />
            </Link>
          </Button>
        )}
      </Flex>
    </Box>
  )
}

export function WelcomeCourses( { profile, courses } : { profile: Profile, courses: Course[] } ) {

  return (
    <Card.Root>
      <Card.Body asChild>
        <Stack gap={4}>
          {courses?.map((course, index) => (
            <CourseProgress key={course.id} course={course} profile={profile} />
          ))}
        </Stack>
      </Card.Body>
    </Card.Root>
  )
}

export function WelcomeHeader({name}: {name: string}) {
  return (
    <Box mb={12}>
      <Heading size='xl' fontWeight='bold' color='gray.900' mb={2}>Welcome, {name}!</Heading>
      <Text color='gray.500' fontSize='lg'>Track your progress and continue learning.</Text>
    </Box>
  )
}

export function WelcomeNav() {
  return (
    <Flex mb={8} justify='space-between' align='center' alignItems='flex-start'>
      <Heading size='lg' fontWeight='bold' color='gray.900'>My Courses</Heading>
      <Button size='sm' variant='outline' colorPalette='gray' asChild>
        <Link href='/courses'>
          Explore more courses
        </Link>
      </Button>
    </Flex>
  )
}

export function WelcomeContent({ children } : React.PropsWithChildren) {

  return (
    <Container maxW='breakpoint-lg' my={12}>
      {children}
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
