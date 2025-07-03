'use client'

import { useState, useMemo } from 'react'
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
import { FilterForm, useFiltersForm } from '@/data/react'

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

const FiltersAndSearch = ({ searchQuery, setSearchQuery, statusFilter, setStatusFilter, sortBy, setSortBy, statuses }: any) => {
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
                {statuses.map((status: string) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </NativeSelectField>
            </NativeSelectRoot>
            <NativeSelectRoot w='32'>
              <NativeSelectField value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value='Name'>Title</option>
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
      key: 'Name',
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

function DashboardContent() {
  const { result: courses, loading, error } = useFiltersForm<'Courses'>()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('Name')

  const statuses = useMemo(() => {
    if (!courses) return []
    return Array.from(new Set(courses.map(c => c.status).filter(Boolean)))
  }, [courses])

  const filteredCourses = useMemo(() => {
    if (!courses) return []
    return courses
      .filter((course) => {
        const matchesSearch = course.Name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === 'all' || course.status === statusFilter
        return matchesSearch && matchesStatus
      })
      .sort((a, b) => {
        if (sortBy === 'Name') return a.Name.localeCompare(b.Name)
        if (sortBy === 'status') return (a.status || '').localeCompare(b.status || '')
        if (sortBy === 'lastEdited') {
          const dateA = a.lastEdited ? new Date(a.lastEdited).getTime() : 0
          const dateB = b.lastEdited ? new Date(b.lastEdited).getTime() : 0
          return dateB - dateA
        }
        return 0
      })
  }, [courses, searchQuery, statusFilter, sortBy])

  if (loading) {
    return (
      <Box minH='100vh' bg='gray.50'>
        <Header />
        <Container maxW='7xl' px={4} py={8}>
          <PageHeader />
          <Text>Loading courses...</Text>
        </Container>
      </Box>
    )
  }

  if (error) {
    return (
      <Box minH='100vh' bg='gray.50'>
        <Header />
        <Container maxW='7xl' px={4} py={8}>
          <PageHeader />
          <Card.Root>
            <Card.Body p={4}>
              <Text color='red.600'>Error loading courses: {error.message}</Text>
              <Text mt={2} fontSize='sm' color='gray.600'>
                This is expected if Airtable isn't configured yet. Check the console for setup instructions.
              </Text>
            </Card.Body>
          </Card.Root>
        </Container>
      </Box>
    )
  }

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
        statuses={statuses}
      />
      <CourseTable
        data={filteredCourses}
        onRowClick={(course: any) => console.log('Row clicked:', course)}
      />
    </Container>
  )
}

export function Dashboard() {
  return (
    <FilterForm table="Courses">
      <DashboardContent />
    </FilterForm>
  )
}