'use client'

import { Plus, Download, Edit, MoreHorizontal, Menu as MenuIcon } from 'lucide-react'
import {
  Box,
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItemCommand,
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
import { useEffect } from 'react'

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

const FiltersAndSearch = () => {
  // For now, we'll use a simple implementation that integrates with FilterForm
  // The actual filtering will be handled by the FilterForm's query parameters
  
  const handleSearchChange = (value: string) => {
    // This will be handled by the FilterForm query system
    console.log('Search:', value)
  }
  
  const handleStatusFilter = (value: string) => {
    console.log('Status filter:', value)
  }
  
  const handleSortChange = (value: string) => {
    console.log('Sort by:', value)
  }

  return (
    <Card.Root mb={6}>
      <Card.Body p={4} borderBottom='1px' borderColor='gray.200'>
        <Flex direction={{ base: 'column', sm: 'row' }} gap={4} align={{ base: 'start', sm: 'center' }} justify='space-between'>
          <Flex direction={{ base: 'column', sm: 'row' }} gap={4} align={{ base: 'start', sm: 'center' }} flex={1}>
            <Box maxW='md' flex={1}>
              <SearchInput
                placeholder='Search courses...'
                value=''
                onChange={handleSearchChange}
              />
            </Box>
            <NativeSelectRoot w='48'>
              <NativeSelectField 
                value='all' 
                onChange={(e) => handleStatusFilter(e.target.value)}
              >
                <option value='all'>All Statuses</option>
                <option value='Published'>Published</option>
                <option value='Draft'>Draft</option>
                <option value='Review'>Review</option>
                <option value='Archived'>Archived</option>
              </NativeSelectField>
            </NativeSelectRoot>
            <NativeSelectRoot w='32'>
              <NativeSelectField 
                value='Name' 
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value='Name'>Title</option>
                <option value='Status'>Status</option>
                <option value='Updated At'>Last Edited</option>
                <option value='Category'>Category</option>
                <option value='Price'>Price</option>
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

interface CourseTableProps {
  data: Course[]
  onRowClick?: (row: Record<string, any>) => void
}

const CourseTable = ({ data, onRowClick }: CourseTableProps) => {
  const columns = [
    {
      key: 'Name',
      label: 'Course Title',
      mobileLabel: 'Course',
      render: (value: string) => (
        <Text fontWeight='medium' color='gray.900'>{value}</Text>
      )
    },
    {
      key: 'Category',
      label: 'Category',
      hideOnMobile: true,
      render: (value: string) => (
        <Text color='gray.600'>{value}</Text>
      )
    },
    {
      key: 'Status',
      label: 'Status',
      render: (value: string) => (
        <StatusBadge
          status={value || 'Draft'}
          statusColor="default"
        />
      )
    },
    {
      key: 'Languages',
      label: 'Languages',
      hideOnMobile: true,
      render: (value: string[]) => (
        <Text color='gray.600'>{value?.join(', ') || 'English'}</Text>
      )
    },
    {
      key: 'Price',
      label: 'Price',
      hideOnMobile: true,
      render: (value: number) => (
        <Text color='gray.900' fontWeight='medium'>
          ${value?.toFixed(2) || '0.00'}
        </Text>
      )
    },
    {
      key: 'Updated At',
      label: 'Last Edited',
      mobileLabel: 'Edited',
      render: (value: string) => (
        <Text color='gray.600'>
          {value ? new Date(value).toLocaleDateString() : 'Never'}
        </Text>
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
      data={data || []}
      onRowClick={onRowClick}
    />
  )
}

function DashboardContent() {
  const { result: courses, loading, error, submit } = useFiltersForm('Courses')

  useEffect(() => {
    submit({})
  }, [])

  if (loading) {
    return (
      <Box minH='100vh' bg='gray.50'>
        <Header />
        <Container maxW='7xl' px={4} py={8}>
          <PageHeader />
          <Card.Root>
            <Card.Body p={4}>
              <Text>Loading courses...</Text>
            </Card.Body>
          </Card.Root>
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
    <Box minH='100vh' bg='gray.50'>
      <Header />
      <Container maxW='7xl' px={4} py={8}>
        <PageHeader />
        <FiltersAndSearch />
        <Card.Root>
          <Card.Body p={0}>
            <CourseTable
              data={courses || []}
              onRowClick={(row) => console.log('Row clicked:', row)}
            />
          </Card.Body>
        </Card.Root>
      </Container>
    </Box>
  )
}

export function Dashboard() {
  return (
    <FilterForm table="Courses">
      <DashboardContent />
    </FilterForm>
  )
}