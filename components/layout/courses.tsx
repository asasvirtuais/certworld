"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Text,
  Stack,
  Container,
  Card,
  NativeSelectRoot,
  NativeSelectField,
} from "@chakra-ui/react"

interface Course {
  id: number
  category: string
  title: string
  location: string
  languages: string
  duration: string
  region: string
  country: string
  state?: string
}

const courses: Course[] = [
  {
    id: 1,
    category: "Food Safety Certification",
    title: "TEXAS | Food Safety Certification",
    location: "Texas, United States",
    languages: "English / Spanish",
    duration: "2 hours",
    region: "Texas, United States",
    country: "United States",
    state: "Texas",
  },
  {
    id: 2,
    category: "Notary Public Preparation",
    title: "CALIFORNIA | Notary Public Prep",
    location: "California, United States",
    languages: "English / Spanish",
    duration: "3 hours",
    region: "California, United States",
    country: "United States",
    state: "California",
  },
  {
    id: 3,
    category: "Workplace Safety Training",
    title: "Diversity, Equity, and Inclusion",
    location: "All locations",
    languages: "English / Spanish",
    duration: "1.5 hours",
    region: "All locations",
    country: "All",
  },
  {
    id: 4,
    category: "WASHINGTON | Boat Safety",
    title: "WASHINGTON | Boat Safety",
    location: "Washington, United States",
    languages: "English / Spanish",
    duration: "2.5 hours",
    region: "Washington, United States",
    country: "United States",
    state: "Washington",
  },
  {
    id: 5,
    category: "COSTA RICA | Native Beekeeping",
    title: "COSTA RICA | Native Beekeeping",
    location: "Costa Rica",
    languages: "English / Spanish",
    duration: "4 hours",
    region: "Costa Rica",
    country: "Costa Rica",
  },
  {
    id: 6,
    category: "MEXICO | Food Handler Safety",
    title: "MEXICO | Food Handler Safety",
    location: "Mexico",
    languages: "English / Spanish",
    duration: "1.5 hours",
    region: "Mexico",
    country: "Mexico",
  },
]

export function Courses() {
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedState, setSelectedState] = useState("")

  const countries = Array.from(new Set(courses.map((course) => course.country))).filter((country) => country !== "All")
  const states =
    selectedCountry === "United States"
      ? Array.from(
          new Set(
            courses
              .filter((course) => course.country === "United States" && course.state)
              .map((course) => course.state!),
          ),
        )
      : []

  const filteredCourses = courses.filter((course) => {
    if (!selectedCountry || selectedCountry === "all") return true
    if (selectedCountry === "United States" && selectedState) {
      return course.country === selectedCountry && course.state === selectedState
    }
    return course.country === selectedCountry
  })

  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }} py={8}>
        <Heading size="xl" fontWeight="bold" color="gray.900" mb={8}>Available Courses</Heading>

        {/* Filters Section */}
        <Box bg="white" borderRadius="lg" p={6} mb={8} shadow="sm">
          <Heading size="lg" fontWeight="semibold" color="gray.900" mb={4}>Explore courses by location</Heading>
          <Flex direction={{ base: "column", sm: "row" }} gap={4}>
            <NativeSelectRoot w={{ base: "full", sm: "64" }}>
              <NativeSelectField value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                <option value="">Select a country</option>
                <option value="all">All Countries</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </NativeSelectField>
            </NativeSelectRoot>

            <NativeSelectRoot 
              w={{ base: "full", sm: "64" }}
              opacity={selectedCountry !== "United States" ? 0.5 : 1}
            >
              <NativeSelectField 
                value={selectedState} 
                onChange={(e) => setSelectedState(e.target.value)}
                // disabled={selectedCountry !== "United States"}
              >
                <option value="">Select a state</option>
                <option value="all">All States</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </NativeSelectField>
            </NativeSelectRoot>
          </Flex>
        </Box>

        {/* Results Counter */}
        <Box mb={6}>
          <Text color="gray.500">{filteredCourses.length} courses found</Text>
        </Box>

        {/* Course Grid */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
          {filteredCourses.map((course) => (
            <Card.Root key={course.id} overflow="hidden" _hover={{ shadow: "lg" }} transition="shadow">
              <Card.Header bg="blue.100" p={6}>
                <Heading size="md" fontWeight="medium" color="blue.600" textAlign="center">{course.category}</Heading>
              </Card.Header>
              <Card.Body p={6}>
                <Heading size="md" fontWeight="semibold" color="gray.900" mb={3}>{course.title}</Heading>
                <Stack gap={2} mb={4}>
                  <Flex justify="space-between" fontSize="sm" color="gray.600">
                    <Text>{course.languages}</Text>
                    <Text>{course.duration}</Text>
                  </Flex>
                  <Flex align="center" fontSize="sm" color="gray.500">
                    <MapPin size={16} style={{ marginRight: '4px' }} />
                    <Text>{course.location}</Text>
                  </Flex>
                </Stack>
                <Button w="full" bg="blue.500" _hover={{ bg: "blue.600" }} color="white">Explore Course</Button>
              </Card.Body>
            </Card.Root>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
