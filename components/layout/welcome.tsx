"use client"

import { useState } from "react"
import { ArrowRight, Globe } from "lucide-react"
import {
  Box,
  Button,
  Progress,
  Stack,
  Flex,
  Heading,
  Text,
  Container,
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItemCommand,
  Card,
} from "@chakra-ui/react"
import Link from "next/link"

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
      {/* Header */}
      <Box as="header" borderBottom="1px" borderColor="gray.200">
        <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }}>
          <Flex align="center" justify="space-between" h={16}>
            <Flex align="center">
              <Link href="/">
                <Heading size="lg" color="blue.500" fontWeight="bold">
                  CertWorld
                </Heading>
              </Link>
            </Flex>
            <Stack direction="row" gap={8} align="center" display={{ base: "none", md: "flex" }}>
              <Stack direction="row" gap={8} as="nav">
                <Link href="/courses">
                  <Text color="gray.500" _hover={{ color: "gray.700" }} px={3} py={2} fontSize="sm" fontWeight="medium">
                    Courses
                  </Text>
                </Link>
                <Link href="/my-learning">
                  <Text color="gray.500" _hover={{ color: "gray.700" }} px={3} py={2} fontSize="sm" fontWeight="medium">
                    My Learning
                  </Text>
                </Link>
              </Stack>
              <Stack direction="row" gap={4} align="center">
                <Button variant="outline" fontSize="sm" fontWeight="medium">
                  Login
                </Button>
                <Button bg="blue.500" _hover={{ bg: "blue.600" }} color="white" fontSize="sm" fontWeight="medium">
                  Sign Up
                </Button>
                <MenuRoot>
                  <MenuTrigger>
                    <Button variant="ghost" size="sm">
                      <Globe size={20} />
                      <Text ml={2} fontSize="sm">EN</Text>
                    </Button>
                  </MenuTrigger>
                  <MenuContent>
                    <MenuItemCommand cursor="pointer">EN</MenuItemCommand>
                    <MenuItemCommand cursor="pointer">ES</MenuItemCommand>
                  </MenuContent>
                </MenuRoot>
              </Stack>
            </Stack>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }} py={12} as="main">
        <Box mb={12}>
          <Heading size="xl" fontWeight="bold" color="gray.900" mb={2}>Welcome, Demo User!</Heading>
          <Text color="gray.500" fontSize="lg">Track your progress and continue learning.</Text>
        </Box>

        <Flex mb={8} justify="space-between" align="center">
          <Heading size="lg" fontWeight="bold" color="gray.900">My Courses</Heading>
          <Button variant="outline" fontSize="sm">
            Explore more courses
          </Button>
        </Flex>

        <Card.Root bg="white" borderRadius="lg" border="1px" borderColor="gray.200" overflow="hidden">
          {courses.map((course, index) => (
            <Box key={course.id} p={6} borderBottom={index !== courses.length - 1 ? "1px" : "none"} borderColor="gray.200">
              <Box mb={4}>
                <Heading size="md" fontWeight="bold" color="gray.900">
                  <Text as="span" textTransform="uppercase">{course.state}</Text> | {course.title}
                </Heading>
              </Box>
              <Box mb={2}>
                <Flex justify="space-between" align="center" mb={2}>
                  <Text fontSize="sm" color="gray.500">Progress</Text>
                  <Text fontSize="sm" fontWeight="medium" color="gray.700">{course.progress}%</Text>
                </Flex>
                <Progress.Root value={course.progress} h={2}>
                  <Progress.Track>
                    <Progress.Range />
                  </Progress.Track>
                </Progress.Root>
              </Box>
              <Flex justify="space-between" align="center">
                <Text fontSize="sm" color="gray.500">
                  {course.lessonsCompleted} of {course.totalLessons} lessons completed
                </Text>
                {course.isComplete ? (
                  <Button bg="blue.500" _hover={{ bg: "blue.600" }} color="white">
                    View Certificate <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                  </Button>
                ) : (
                  <Button bg="blue.500" _hover={{ bg: "blue.600" }} color="white">
                    Resume Course <ArrowRight size={16} style={{ marginLeft: '8px' }} />
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
