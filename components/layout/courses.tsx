'use client'

import { useState, useMemo } from 'react'
import {
  Box,
  Flex,
  Heading,
  Text,
  NativeSelectRoot,
  NativeSelectField,
} from '@chakra-ui/react'
import { Container } from '@/components/ui/container'
import { CourseCard, ResponsiveGrid } from '@/components/ui'
import { FilterForm, SingleProvider, useFiltersForm } from '@/data/react'

function CoursesDisplay() {
  const { result: courses, submit } = useFiltersForm<'Courses'>()
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedState, setSelectedState] = useState('')

  const countries = useMemo(() => {
    if (!courses) return []
    return Array.from(new Set(courses.map((course) => course.Location.split(', ')[1] || course.Location))).filter(Boolean)
  }, [courses])

  const states = useMemo(() => {
    if (selectedCountry === 'United States' && courses) {
      return Array.from(
        new Set(
          courses
            .filter((course) => course.Location.includes('United States') && course.Location.split(', ').length > 1)
            .map((course) => course.Location.split(', ')[0])
        )
      )
    }
    return []
  }, [courses, selectedCountry])

  const filteredCourses = useMemo(() => {
    if (!courses) return []
    return courses.filter((course) => {
      const [state, country] = course.Location.split(', ').map(s => s.trim())

      if (!selectedCountry || selectedCountry === 'all') return true

      if (selectedCountry === 'United States') {
        if (!selectedState || selectedState === 'all') return country === 'United States'
        return country === 'United States' && state === selectedState
      }

      return country === selectedCountry
    })
  }, [courses, selectedCountry, selectedState])

  return (
    <Container py={8} bg='gray.50' minH='100dvh'>
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
              disabled={selectedCountry !== 'United States'}
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
          <SingleProvider key={course.id} table="Courses" id={course.id}>
            <CourseCard />
          </SingleProvider>
        ))}
      </ResponsiveGrid>
    </Container>
  )
}

export function CoursesLayout() {
  return (
    <FilterForm table="Courses">
      <CoursesDisplay />
    </FilterForm>
  )
}
