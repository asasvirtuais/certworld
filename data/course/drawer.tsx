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
import { useForm } from '@asasvirtuais/react'
import { useEffect } from 'react'

const Header = () => {

  const { single: {
    Name,
    Languages,
    Duration,
  } } = useSingle<'Courses'>()

  return (
    <Box pr={4}>
      <Heading size='xl' fontWeight='bold' color='gray.900' lineHeight='tight' mb={3}>
        {Name}
      </Heading>
      <Flex align='center' gap={4} color='gray.500' fontSize='sm'>
        <Text>{Languages.join(' / ')}</Text>
        <Text>{Duration / 60} minutes</Text>
      </Flex>
    </Box>
  )
}

const Description = ({ course }: any) => (
  <Text color='gray.700' fontSize='lg' lineHeight='relaxed'>
    {course.description}
  </Text>
)

const LearningPoints = () => {
    const { single: course } = useSingle<'Courses'>()

    const { result: exams, submit } = useFiltersForm('Exams')

    useEffect(() => {
        submit()
    }, [])

    return (
      <>
        <Text fontSize='lg' lineHeight={1.2}>
          {course.Description}
        </Text>
        <Heading size='lg' fontWeight='bold' color='gray.900' my={4}>
          What you'll learn
        </Heading>
        <Stack gap={3}>
          {exams?.map(exam => (
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
  const { single: {
    id, Price
  } } = useSingle<'Courses'>()

  return (
    <>
      <Stack w='100%' gap={6} p={6} bg='gray.200'>
        <Text fontSize='3xl' fontWeight='bold' color='gray.900'>
          {Price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </Text>
        <Text color='gray.500' fontSize='xl'>
          Includes certificate upon completion
        </Text>
      </Stack>
      <Button w='100%'>
        Select Course
      </Button>
    </>
  )
}

export default function CourseDrawer() {

    const { single: course } = useSingle<'Courses'>()

    return (
        <Drawer.Root size='lg'>
        <Drawer.Trigger asChild>
            <Button width='full' colorPalette='blue'>
            Explore Course
            </Button>
        </Drawer.Trigger>
        <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
            <Drawer.Content maxW='540px' bg='white'>
              <Drawer.CloseTrigger asChild>
                <CloseButton />
              </Drawer.CloseTrigger>
              <Drawer.Header>
                <Header />
              </Drawer.Header>
              <Drawer.Body>
              <Stack gap={0}>
                <Description course={course} />
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