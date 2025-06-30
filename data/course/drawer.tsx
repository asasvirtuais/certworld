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
import { useSingle } from '../react'

const Header = ({ course }: any) => (
  <Box pb={6} spaceY={0}>
    <Flex align='start' justify='space-between'>
      <Box flex={1} pr={4}>
        <Heading size='xl' fontWeight='bold' color='gray.900' lineHeight='tight' mb={3}>
          {course.title}
        </Heading>
        <Flex align='center' gap={4} color='gray.500' fontSize='sm'>
          <Text>{course.languages}</Text>
          <Text>{course.duration}</Text>
        </Flex>
      </Box>
    </Flex>
  </Box>
)

const Description = ({ course }: any) => (
  <Text color='gray.700' fontSize='lg' lineHeight='relaxed'>
    {course.description}
  </Text>
)

const LearningPoints = ({ course }: any) => (
  <Box>
    <Heading size='lg' fontWeight='bold' color='gray.900' mb={4}>
      What you'll learn
    </Heading>
    <Stack gap={3}>
      {course?.learningPoints?.map((point: any, index: number) => (
        <Flex key={index} align='start' gap={3}>
          <Box flexShrink={0} mt={0.5}>
            <Circle size={5} bg='blue.500' color='white'>
              <Check size={12} />
            </Circle>
          </Box>
          <Text color='gray.700'>{point}</Text>
        </Flex>
      ))}
    </Stack>
  </Box>
)

const Pricing = ({ course }: any) => (
  <Box bg='gray.50' borderRadius='lg' p={6}>
    <Flex align='end' justify='space-between' mb={6}>
      <Box>
        <Text fontSize='3xl' fontWeight='bold' color='gray.900' mb={1}>
          {course.price}
        </Text>
        <Text color='gray.500' fontSize='sm'>
          Includes certificate upon completion
        </Text>
      </Box>
      <Button 
        bg='blue.500' 
        _hover={{ bg: 'blue.600' }} 
        color='white' 
        px={8} 
        py={3}
        onClick={() => console.log('Course selected:', course.id)}
      >
        Select Course
      </Button>
    </Flex>
    <Box>
      <Heading size='sm' fontWeight='semibold' color='gray.900' mb={2}>
        Course includes:
      </Heading>
      <Text color='gray.700'>{course.lessons} lessons</Text>
    </Box>
  </Box>
)

interface Course {
  id: string
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
          <Drawer.Content maxW='540px' bg='white' p={6}>
            <Drawer.CloseTrigger asChild>
              <CloseButton />
            </Drawer.CloseTrigger>
            <Drawer.Header p={0}>
              <Header course={course} />
            </Drawer.Header>
            <Drawer.Body p={0}>
              <Stack gap={8}>
                <Description course={course} />
                <LearningPoints course={course} />
              </Stack>
            </Drawer.Body>
            <Drawer.Footer p={0} pt={8}>
              <Pricing course={course} />
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}