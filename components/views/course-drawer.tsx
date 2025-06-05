"use client"

import { Check } from "lucide-react"
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Stack,
  Circle,
} from "@chakra-ui/react"

const course = {
  id: "texas-notary-prep",
  title: "TEXAS | Notary Public Preparation",
  languages: "English / Spanish",
  duration: "3 hours",
  description: "Comprehensive preparation for the Notary Public exam with practice questions and scenarios.",
  price: "$29.99",
  lessons: 20,
  learningPoints: [
    "Learn notary public laws and regulations",
    "Understand document authentication procedures",
    "Practice with sample exam questions",
    "Master required notarial acts and procedures",
  ],
}

export default function CourseDrawerDemo() {
  const handleSelectCourse = () => {
    console.log("Course selected:", course.id)
    // In a real app, this would handle course enrollment
  }

  return (
    <Box w="full" maxW="540px" p={6} bg="white">
      <Box pb={6}>
        <Flex align="start" justify="space-between">
          <Box flex={1} pr={4}>
            <Heading size="xl" fontWeight="bold" color="gray.900" lineHeight="tight" mb={3}>
              {course.title}
            </Heading>
            <Flex align="center" gap={4} color="gray.500" fontSize="sm">
              <Text>{course.languages}</Text>
              <Text>{course.duration}</Text>
            </Flex>
          </Box>
        </Flex>
      </Box>

      <Stack gap={8}>
        {/* Description */}
        <Text color="gray.700" fontSize="lg" lineHeight="relaxed">{course.description}</Text>

        {/* What you'll learn */}
        <Box>
          <Heading size="lg" fontWeight="bold" color="gray.900" mb={4}>What you'll learn</Heading>
          <Stack gap={3}>
            {course.learningPoints.map((point, index) => (
              <Flex key={index} align="start" gap={3}>
                <Box flexShrink={0} mt={0.5}>
                  <Circle size={5} bg="blue.500" color="white">
                    <Check size={12} />
                  </Circle>
                </Box>
                <Text color="gray.700">{point}</Text>
              </Flex>
            ))}
          </Stack>
        </Box>

        {/* Pricing */}
        <Box bg="gray.50" borderRadius="lg" p={6}>
          <Flex align="end" justify="space-between" mb={6}>
            <Box>
              <Text fontSize="3xl" fontWeight="bold" color="gray.900" mb={1}>{course.price}</Text>
              <Text color="gray.500" fontSize="sm">Includes certificate upon completion</Text>
            </Box>
            <Button onClick={handleSelectCourse} bg="blue.500" _hover={{ bg: "blue.600" }} color="white" px={8} py={3}>
              Select Course
            </Button>
          </Flex>

          {/* Course includes */}
          <Box>
            <Heading size="sm" fontWeight="semibold" color="gray.900" mb={2}>Course includes:</Heading>
            <Text color="gray.700">{course.lessons} lessons</Text>
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}
