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

export function CourseCard(course : any) {
  const { 
    category, 
    title, 
    location, 
    languages, 
    duration,
  } = course

  return (
    <Card.Root overflow="hidden" _hover={{ shadow: "lg" }} transition="shadow">
      <Card.Header bg="blue.100" p={6}>
        <Heading size="md" fontWeight="medium" color="blue.600" textAlign="center">
          {category}
        </Heading>
      </Card.Header>
      <Card.Body p={6}>
        <Heading size="md" fontWeight="semibold" color="gray.900" mb={3}>
          {title}
        </Heading>
        <Stack gap={2} mb={4}>
          <Flex justify="space-between" fontSize="sm" color="gray.600">
            <Text>{languages}</Text>
            <Text>{duration}</Text>
          </Flex>
          <Flex align="center" fontSize="sm" color="gray.500">
            <MapPin size={16} style={{ marginRight: '4px' }} />
            <Text>{location}</Text>
          </Flex>
        </Stack>
        <CourseDrawer {...course} />
      </Card.Body>
    </Card.Root>
  )
}