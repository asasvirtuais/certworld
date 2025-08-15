'use client'

import { Check } from 'lucide-react'
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Circle,
  Drawer,
  Portal,
  CloseButton,
  Button,
} from '@chakra-ui/react'
import { FilterForm, useFiltersForm, useSingle } from '@/data/react'
import { useCart } from '@/data/cart-context'
import { useEffect } from 'react'
import Link from 'next/link'

const LearningPoints = () => {

    const { result: exams, submit } = useFiltersForm('Exams')

    useEffect(() => {
        submit()
    }, [])

    return (
      <>
        <Heading size='lg' fontWeight='bold' color='gray.900' my={4}>
          What you'll learn
        </Heading>
        <Stack gap={3}>
          {exams?.map((exam) => (
            <Flex key={exam.id} align='start' gap={3}>
              <Box flexShrink={0} mt={0.5}>
                <Circle size={5} bg='blue.500' color='white'>
                  <Check size={12} />
                </Circle>
              </Box>
              <Text color='gray.700'>{exam.Name}</Text>
            </Flex>
          ))}
        </Stack>
      </>
    )
}

const Pricing = () => {
  const { single: course } = useSingle<'Courses'>()
  const { addItem, isInCart, toggleDrawer } = useCart()
  
  const handleAddToCart = () => {
    if (!isInCart(course.id)) {
      addItem(course)
      toggleDrawer() // Open cart drawer
    }
  }

  return (
    <>
      <Stack w='100%' gap={6} p={6} bg='gray.200'>
        <Text fontSize='3xl' fontWeight='bold' color='gray.900'>
          {course.Price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </Text>
        <Text color='gray.500' fontSize='xl'>
          Includes certificate upon completion
        </Text>
      </Stack>
      <Button 
        w='100%' 
        onClick={handleAddToCart}
        colorPalette={isInCart(course.id) ? 'green' : 'blue'}
      >
        {isInCart(course.id) ? 'Added to Cart' : 'Add to Cart'}
      </Button>
    </>
  )
}

export default function CourseDrawer( { course, owned } : { course : Course, owned?: boolean } ) {

    return (
      <Drawer.Root size='lg'>
        <Drawer.Trigger asChild>
              {owned ? (
                <Button width='full' asChild>
                  <Link href={`/course/${course.id}`} >Open Course</Link>
                </Button>
              ) : (
                <Button width='full' colorPalette='blue'>Explore Course</Button>
              )}
        </Drawer.Trigger>
        <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
            <Drawer.Content maxW='540px' bg='white'>
              <Drawer.CloseTrigger asChild>
                <CloseButton />
              </Drawer.CloseTrigger>
              <Drawer.Header>
              <Box pr={4}>
                <Heading size='xl' fontWeight='bold' color='gray.900' lineHeight='tight' mb={3}>
                  {course.Name}
                </Heading>
                <Flex align='center' gap={4} color='gray.500' fontSize='sm'>
                  <Text>{course.Languages.join(' / ')}</Text>
                  <Text>{course.Duration / 60} minutes</Text>
                </Flex>
              </Box>
              </Drawer.Header>
              <Drawer.Body>
              <Stack gap={0}>
                <Text color='gray.700' fontSize='lg' lineHeight='relaxed'>
                  {course.Description}
                </Text>
                <FilterForm table='Exams' defaults={{ query: { 'Course ID':  course.id } }} >
                  <LearningPoints />
                </FilterForm>
              </Stack>
              </Drawer.Body>
              <Drawer.Footer pt={8} flexDir='column' w='100%'>
                <Pricing />
              </Drawer.Footer>
            </Drawer.Content>
            </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    )
}