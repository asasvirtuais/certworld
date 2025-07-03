"use client"

import { MapPin } from "lucide-react"
import {
  Card,
  Heading,
  Text,
  Stack,
  Flex,
  Button,
} from "@chakra-ui/react"
import { CourseDrawer } from "../views/course-drawer"

'use client'

import { MapPin } from 'lucide-react'
import {
  Card,
  Heading,
  Text,
  Stack,
  Flex,
} from '@chakra-ui/react'
import CourseDrawer from '@/data/course/drawer'
import { useSingle } from '@/data/react'

export function CourseCard() {
  const { single: course } = useSingle<'Courses'>()

  if (!course) return null

  const {
    Name,
    Category,
    Languages,
    Duration,
    Location,
  } = course

  return (
    <Card.Root overflow='hidden' _hover={{ shadow: 'lg' }} transition='shadow'>
      <Card.Header bg='blue.100' p={6}>
        <Heading size='md' fontWeight='medium' color='blue.600' textAlign='center'>
          {Category}
        </Heading>
      </Card.Header>
      <Card.Body p={6}>
        <Heading size='md' fontWeight='semibold' color='gray.900' mb={3}>
          {Name}
        </Heading>
        <Stack gap={2} mb={4}>
          <Flex justify='space-between' fontSize='sm' color='gray.600'>
            <Text>{Languages.join(' / ')}</Text>
            <Text>{Duration / 60} minutes</Text>
          </Flex>
          <Flex align='center' fontSize='sm' color='gray.500'>
            <MapPin size={16} style={{ marginRight: '4px' }} />
            <Text>{Location}</Text>
          </Flex>
        </Stack>
        <CourseDrawer />
      </Card.Body>
    </Card.Root>
  )
}