'use client'

import { useState } from 'react'
import {
  Box,
  Flex,
  Heading,
  Text,
  Container,
  NativeSelectRoot,
  NativeSelectField,
} from '@chakra-ui/react'
import { CourseCard, ResponsiveGrid } from '../ui'

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
    category: 'Food Safety Certification',
    title: 'TEXAS | Food Safety Certification',
    location: 'Texas, United States',
    languages: 'English / Spanish',
    duration: '2 hours',
    region: 'Texas, United States',
    country: 'United States',
    state: 'Texas',
  },
  {
    id: 2,
    category: 'Notary Public Preparation',
    title: 'CALIFORNIA | Notary Public Prep',
    location: 'California, United States',
    languages: 'English / Spanish',
    duration: '3 hours',
    region: 'California, United States',
    country: 'United States',
    state: 'California',
  },
  {
    id: 3,
    category: 'Workplace Safety Training',
    title: 'Diversity, Equity, and Inclusion',
    location: 'All locations',
    languages: 'English / Spanish',
    duration: '1.5 hours',
    region: 'All locations',
    country: 'All',
  },
  {
    id: 4,
    category: 'WASHINGTON | Boat Safety',
    title: 'WASHINGTON | Boat Safety',
    location: 'Washington, United States',
    languages: 'English / Spanish',
    duration: '2.5 hours',
    region: 'Washington, United States',
    country: 'United States',
    state: 'Washington',
  },
  {
    id: 5,
    category: 'COSTA RICA | Native Beekeeping',
    title: 'COSTA RICA | Native Beekeeping',
    location: 'Costa Rica',
    languages: 'English / Spanish',
    duration: '4 hours',
    region: 'Costa Rica',
    country: 'Costa Rica',
  },
  {
    id: 6,
    category: 'MEXICO | Food Handler Safety',
    title: 'MEXICO | Food Handler Safety',
    location: 'Mexico',
    languages: 'English / Spanish',
    duration: '1.5 hours',
    region: 'Mexico',
    country: 'Mexico',
  },
]

export function Courses() {
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedState, setSelectedState] = useState('')

  const countries = Array.from(new Set(courses.map((course) => course.country))).filter((country) => country !== 'All')
  const states =
    selectedCountry === 'United States'
      ? Array.from(
          new Set(
            courses
              .filter((course) => course.country === 'United States' && course.state)
              .map((course) => course.state!),
          ),
        )
      : []

  const filteredCourses = courses.filter((course) => {
    if (!selectedCountry || selectedCountry === 'all') return true
    if (selectedCountry === 'United States' && selectedState) {
      return course.country === selectedCountry && course.state === selectedState
    }
    return course.country === selectedCountry
  })

  return (
    <Box minH='100vh' bg='gray.50'>
      <Container maxW='7xl' px={{ base: 4, sm: 6, lg: 8 }} py={8}>
        <Heading size='xl' fontWeight='bold' color='gray.900' mb={8}>Available Courses</Heading>

        {/* Filters Section */}
        <Box bg='white' borderRadius='lg' p={6} mb={8} shadow='sm'>
          <Heading size='lg' fontWeight='semibold' color='gray.900' mb={4}>Explore courses by location</Heading>
          <Flex direction={{ base: 'column', sm: 'row' }} gap={4}>
            <NativeSelectRoot w={{ base: 'full', sm: '64' }}>
              <NativeSelectField value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                <option value=''>Select a country</option>
                <option value='all'>All Countries</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </NativeSelectField>
            </NativeSelectRoot>

            <NativeSelectRoot 
              w={{ base: 'full', sm: '64' }}
              opacity={selectedCountry !== 'United States' ? 0.5 : 1}
            >
              <NativeSelectField 
                value={selectedState} 
                onChange={(e) => setSelectedState(e.target.value)}
                // disabled={selectedCountry !== 'United States'}
              >
                <option value=''>Select a state</option>
                <option value='all'>All States</option>
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
          <Text color='gray.500'>{filteredCourses.length} courses found</Text>
        </Box>

        {/* Course Grid */}
        <ResponsiveGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              category={course.category}
              title={course.title}
              location={course.location}
              languages={course.languages}
              duration={course.duration}
              onExplore={() => console.log('Exploring course:', course.id)}
            />
          ))}
        </ResponsiveGrid>
      </Container>
    </Box>
  )
}
