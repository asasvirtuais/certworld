'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
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

export function CoursesDisplay( {
  myCourses,
  otherCourses,
} : {
  myCourses: Course[],
  otherCourses: Course[],
} ) {
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedState, setSelectedState] = useState('')

  const courses = useMemo(() => [...myCourses, ...otherCourses], [myCourses, otherCourses])

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

  const filterCb = useCallback((course: Course) => {
    const [state, country] = course.Location.split(', ').map(s => s.trim())

    if (!selectedCountry || selectedCountry === 'all') return true

    if (selectedCountry === 'United States') {
      if (!selectedState || selectedState === 'all') return country === 'United States'
      return country === 'United States' && state === selectedState
    }

    return country === selectedCountry
  }, [])

  const myFilteredCourses = useMemo(() => {
    if (!myCourses) return []
    return myCourses.filter(filterCb)
  }, [myCourses])
  const filteredCourses = useMemo(() => {
    if (!otherCourses) return []
    return otherCourses.filter(filterCb)
  }, [otherCourses])



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
            disabled={selectedCountry !== 'United States'}
          >
            <NativeSelectField 
              value={selectedState} 
              onChange={(e) => setSelectedState(e.target.value)}
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
        {myFilteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} owned />
        ))}
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </ResponsiveGrid>
    </Container>
  )
}
