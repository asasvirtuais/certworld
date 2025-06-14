"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import {
  Box,
  Flex,
  Heading,
  Text,
  Container,
  Card,
} from "@chakra-ui/react"
import { MobileHeader, Button, ProgressBar } from "../ui"

interface Course {
  id: number
  title: string
  state: string
  progress: number
  lessonsCompleted: number
  totalLessons: number
  isComplete: boolean
}

export function Welcome() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: "Notary Public Prep",
      state: "TEXAS",
      progress: 50,
      lessonsCompleted: 2,
      totalLessons: 4,
      isComplete: false,
    },
    {
      id: 2,
      title: "Notary Public Prep",
      state: "CALIFORNIA",
      progress: 100,
      lessonsCompleted: 4,
      totalLessons: 4,
      isComplete: true,
    },
  ])

  return (
    <Box minH="100vh" bg="white">
      <MobileHeader 
        navLinks={[
          { href: "/courses", label: "Courses" },
          { href: "/my-learning", label: "My Learning" }
        ]}
      />

      {/* Main Content */}
      <Container maxW="7xl" py={12} as="main">
        <Box mb={12} px={{ base: 4, sm: 6, lg: 8 }}>
          <Heading size="xl" fontWeight="bold" color="gray.900" mb={2}>Welcome, Demo User!</Heading>
          <Text color="gray.500" fontSize="lg">Track your progress and continue learning.</Text>
        </Box>

        <Flex mb={8} justify="space-between" align="center" flexDirection={{base: 'column', sm: 'row'}} alignItems='flex-start'>
          <Heading size="lg" fontWeight="bold" color="gray.900">My Courses</Heading>
          <Button variant="outline" size="sm">
            Explore more courses
          </Button>
        </Flex>

        <Card.Root bg="white" borderRadius="lg" border="1px" borderColor="gray.200" overflow="hidden">
          {courses.map((course, index) => (
            <Box key={course.id} borderBottom={index !== courses.length - 1 ? "1px" : "none"} borderColor="gray.200">
              <Box mb={4}>
                <Heading size="md" fontWeight="bold" color="gray.900">
                  <Text as="span" textTransform="uppercase">{course.state}</Text> | {course.title}
                </Heading>
              </Box>
              <Box mb={2}>
                <ProgressBar value={course.progress} />
              </Box>
              <Flex justify="space-between" align="center">
                <Text fontSize="sm" color="gray.500">
                  {course.lessonsCompleted} of {course.totalLessons} lessons completed
                </Text>
                {course.isComplete ? (
                  <Button 
                    variant="primary"
                    rightIcon={<ArrowRight size={16} />}
                  >
                    View Certificate
                  </Button>
                ) : (
                  <Button 
                    variant="primary"
                    rightIcon={<ArrowRight size={16} />}
                  >
                    Resume Course
                  </Button>
                )}
              </Flex>
            </Box>
          ))}
        </Card.Root>
      </Container>
    </Box>
  )
}
