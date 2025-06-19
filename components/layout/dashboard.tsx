'use client'

import { useState } from 'react'
import { Plus, Download, Edit, MoreHorizontal, Menu as MenuIcon } from 'lucide-react'
import {
  Box,
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItemCommand,
  Table,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  NativeSelectRoot,
  NativeSelectField,
  Card,
  Button,
  Portal,
  Menu
} from '@chakra-ui/react'
import { IconButton, SearchInput, StatusBadge, ResponsiveTable } from '../ui'

const courses = [
  {
    id: 1,
    title: 'Advanced Spanish Grammar',
    status: 'Closed to All Learners',
    lastEdited: '4/30/2025',
    statusColor: 'secondary',
  },
  {
    id: 2,
    title: 'Business English for Beginners',
    status: 'Open to All Learners',
    lastEdited: '5/14/2025',
    statusColor: 'success',
  },
  {
    id: 3,
    title: 'English for Medical Professionals',
    status: 'Closed to New Learners',
    lastEdited: '4/27/2025',
    statusColor: 'warning',
  },
  {
    id: 4,
    title: 'Introduction to Spanish',
    status: 'Open to All Learners',
    lastEdited: '5/9/2025',
    statusColor: 'success',
  },
  {
    id: 5,
    title: 'Spanish Vocabulary Builder',
    status: 'Draft',
    lastEdited: '5/16/2025',
    statusColor: 'default',
  },
]

const Header = () => {
  return (
    <Box as='header' bg='white' borderBottom='1px' borderColor='gray.200' px={4} py={3}>
      <Container maxW='7xl'>
        <Flex align='center' justify='space-between'>
          <Stack direction='row' gap={3} align='center'>
            <IconButton
              variant='ghost'
              size='sm'
              aria-label='Menu'
            >
              <MenuIcon size={20} />
            </IconButton>
            <Heading size='lg' color='blue.600'>CertWorld</Heading>
          </Stack>
          <Button variant='outline'>
            <Plus size={16} />
            New
          </Button>
        </Flex>
      </Container>
    </Box>
  )
}

const PageHeader = () => {
  return (
    <Stack direction='column' align='start' gap={8} mb={8}>
      <Box>
        <Heading size='xl' color='gray.900' mb={2}>Course Dashboard – CertWorld</Heading>
        <Text color='gray.600'>Manage all your bilingual courses</Text>
      </Box>
    </Stack>
  )
}

const FiltersAndSearch = ({ searchQuery, setSearchQuery, statusFilter, setStatusFilter, sortBy, setSortBy }: any) => {
  return (
    <Card.Root mb={6}>
      <Card.Body p={4} borderBottom='1px' borderColor='gray.200'>
        <Flex direction={{ base: 'column', sm: 'row' }} gap={4} align={{ base: 'start', sm: 'center' }} justify='space-between'>
          <Flex direction={{ base: 'column', sm: 'row' }} gap={4} align={{ base: 'start', sm: 'center' }} flex={1}>
            <Box maxW='md' flex={1}>
              <SearchInput
                placeholder='Search courses...'
                value={searchQuery}
                onChange={setSearchQuery}
              />
            </Box>
            <NativeSelectRoot w='48'>
              <NativeSelectField value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value='all'>All Statuses</option>
                <option value='Open to All Learners'>Open to All Learners</option>
                <option value='Closed to All Learners'>Closed to All Learners</option>
                <option value='Closed to New Learners'>Closed to New Learners</option>
                <option value='Draft'>Draft</option>
              </NativeSelectField>
            </NativeSelectRoot>
            <NativeSelectRoot w='32'>
              <NativeSelectField value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value='title'>Title</option>
                <option value='status'>Status</option>
                <option value='lastEdited'>Last Edited</option>
              </NativeSelectField>
            </NativeSelectRoot>
          </Flex>
          <Button variant='outline'>
            <Download size={16} />
            Export CSV
          </Button>
        </Flex>
      </Card.Body>
    </Card.Root>
  )
}

const CourseTable = ({ data, onRowClick }: any) => {
  const columns = [
    {
      key: 'title',
      label: 'Course Title',
      mobileLabel: 'Course',
      render: (value: any) => (
        <Text fontWeight='medium' color='gray.900'>{value}</Text>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value : any, row : any) => (
        <StatusBadge
          status={value}
          statusColor={row.statusColor}
        />
      )
    },
    {
      key: 'lastEdited',
      label: 'Last Edited',
      mobileLabel: 'Edited',
      render: (value : any) => (
        <Text color='gray.600'>{value}</Text>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      hideOnMobile: true,
      render: () => (
        <Stack direction='row' justify='end' gap={2}>
          <IconButton
            variant='ghost'
            size='sm'
            aria-label='Edit course'
          >
            <Edit size={16} />
          </IconButton>
          <MenuRoot>
            <MenuTrigger asChild>
              <IconButton variant='ghost' size='sm' aria-label='More actions'>
                <MoreHorizontal size={16} />
              </IconButton>
            </MenuTrigger>
            <Portal>
              <Menu.Positioner>
                <MenuContent>
                  <MenuItemCommand>View Details</MenuItemCommand>
                  <MenuItemCommand>Duplicate</MenuItemCommand>
                  <MenuItemCommand>Archive</MenuItemCommand>
                  <MenuItemCommand color='red.600'>Delete</MenuItemCommand>
                </MenuContent>
              </Menu.Positioner>
            </Portal>
          </MenuRoot>
        </Stack>
      )
    }
  ]

  return (
    <ResponsiveTable
      columns={columns}
      data={data}
      onRowClick={onRowClick}
    />
  )
}

export function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('title')

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <Container maxW='7xl' px={4} py={8}>
      <PageHeader />
      <FiltersAndSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <CourseTable
        data={filteredCourses}
        onRowClick={(course: any) => console.log('Row clicked:', course)}
      />
    </Container>
  )
}