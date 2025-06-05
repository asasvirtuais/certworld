"use client"

import { useState } from "react"
import { Search, Plus, Download, Edit, MoreHorizontal, Menu as MenuIcon } from "lucide-react"
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputElement,
  Badge,
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItemCommand,
  Table,
  Flex,
  Heading,
  Text,
  IconButton,
  Stack,
  Container,
  NativeSelectRoot,
  NativeSelectField,
  Card,
} from "@chakra-ui/react"

const courses = [
  {
    id: 1,
    title: "Advanced Spanish Grammar",
    status: "Closed to All Learners",
    lastEdited: "4/30/2025",
    statusColor: "secondary",
  },
  {
    id: 2,
    title: "Business English for Beginners",
    status: "Open to All Learners",
    lastEdited: "5/14/2025",
    statusColor: "success",
  },
  {
    id: 3,
    title: "English for Medical Professionals",
    status: "Closed to New Learners",
    lastEdited: "4/27/2025",
    statusColor: "warning",
  },
  {
    id: 4,
    title: "Introduction to Spanish",
    status: "Open to All Learners",
    lastEdited: "5/9/2025",
    statusColor: "success",
  },
  {
    id: 5,
    title: "Spanish Vocabulary Builder",
    status: "Draft",
    lastEdited: "5/16/2025",
    statusColor: "default",
  },
]

const getStatusVariant = (statusColor: string) => {
  switch (statusColor) {
    case "success":
      return "solid"
    case "warning":
      return "subtle"
    case "secondary":
      return "outline"
    default:
      return "subtle"
  }
}

const getStatusColorScheme = (statusColor: string) => {
  switch (statusColor) {
    case "success":
      return "green"
    case "warning":
      return "yellow"
    case "secondary":
      return "gray"
    default:
      return "blue"
  }
}

export function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("title")

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || course.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Header */}
      <Box as="header" bg="white" borderBottom="1px" borderColor="gray.200" px={4} py={3}>
        <Container maxW="7xl">
          <Flex align="center" justify="space-between">
            <Stack direction="row" gap={3} align="center">
              <IconButton
                variant="ghost"
                size="sm"
                display={{ base: "flex", md: "none" }}
                aria-label="Menu"
              >
                <MenuIcon size={20} />
              </IconButton>
              <Heading size="lg" color="blue.600">CertWorld</Heading>
            </Stack>
            <Button colorScheme="gray" variant="solid">
              <Plus size={16} />
              <Text ml={2}>New</Text>
            </Button>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="7xl" px={4} py={8}>
        <Stack direction="column" align="start" gap={8} mb={8}>
          <Box>
            <Heading size="xl" color="gray.900" mb={2}>Course Dashboard – CertWorld</Heading>
            <Text color="gray.600">Manage all your bilingual courses</Text>
          </Box>
        </Stack>

        {/* Filters and Search */}
        <Card.Root mb={6}>
          <Card.Body p={4} borderBottom="1px" borderColor="gray.200">
            <Flex direction={{ base: "column", sm: "row" }} gap={4} align={{ base: "start", sm: "center" }} justify="space-between">
              <Flex direction={{ base: "column", sm: "row" }} gap={4} align={{ base: "start", sm: "center" }} flex={1}>
                <Box maxW="md" flex={1}>
                  <InputElement pointerEvents="none">
                    <Search color="gray.400" size={16} />
                  </InputElement>
                  <Input
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    pl={10}
                  />
                </Box>
                <NativeSelectRoot w="48">
                  <NativeSelectField value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="all">All Statuses</option>
                    <option value="Open to All Learners">Open to All Learners</option>
                    <option value="Closed to All Learners">Closed to All Learners</option>
                    <option value="Closed to New Learners">Closed to New Learners</option>
                    <option value="Draft">Draft</option>
                  </NativeSelectField>
                </NativeSelectRoot>
                <NativeSelectRoot w="32">
                  <NativeSelectField value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="title">Title</option>
                    <option value="status">Status</option>
                    <option value="lastEdited">Last Edited</option>
                  </NativeSelectField>
                </NativeSelectRoot>
              </Flex>
              <Button variant="outline">
                <Download size={16} />
                <Text ml={2}>Export CSV</Text>
              </Button>
            </Flex>
          </Card.Body>

          {/* Table */}
          <Table.Root variant='line'>
            <Table.Header bg="gray.50">
              <Table.Row>
                <Table.ColumnHeader fontWeight="medium" color="gray.700">Course Title</Table.ColumnHeader>
                <Table.ColumnHeader fontWeight="medium" color="gray.700">Status</Table.ColumnHeader>
                <Table.ColumnHeader fontWeight="medium" color="gray.700">Last Edited</Table.ColumnHeader>
                <Table.ColumnHeader fontWeight="medium" color="gray.700" textAlign="right">Actions</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filteredCourses.map((course) => (
                <Table.Row key={course.id} _hover={{ bg: "gray.50" }}>
                  <Table.Cell fontWeight="medium" color="gray.900">{course.title}</Table.Cell>
                  <Table.Cell>
                    <Badge
                      variant={getStatusVariant(course.statusColor)}
                      colorScheme={getStatusColorScheme(course.statusColor)}
                    >
                      {course.status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell color="gray.600">{course.lastEdited}</Table.Cell>
                  <Table.Cell textAlign="right">
                    <Stack direction="row" justify="end" gap={2}>
                      <IconButton
                        variant="ghost"
                        size="sm"
                        aria-label="Edit course"
                      >
                        <Edit size={16} />
                      </IconButton>
                      <MenuRoot>
                        <MenuTrigger>
                          <IconButton variant="ghost" size="sm" aria-label="More actions">
                            <MoreHorizontal size={16} />
                          </IconButton>
                        </MenuTrigger>
                        <MenuContent>
                          <MenuItemCommand>View Details</MenuItemCommand>
                          <MenuItemCommand>Duplicate</MenuItemCommand>
                          <MenuItemCommand>Archive</MenuItemCommand>
                          <MenuItemCommand color="red.600">Delete</MenuItemCommand>
                        </MenuContent>
                      </MenuRoot>
                    </Stack>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Card.Root>
      </Container>
    </Box>
  )
}
