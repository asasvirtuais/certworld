'use server'
import { CourseExams } from '@/components/layout/course'
import { Header } from '@/components/ui/header'
import { SingleProvider, FilterForm } from '@/data/react'
import { server } from '@/data/server'
import { Box, Container, Flex, Heading, Stack } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { Breadcrumb } from '@chakra-ui/react'
import Link from 'next/link'

export default async function CourseLayout( { params: promise, crumbs, children, exams } : { params: Promise<{ id: string, lesson ?: string }>, children: ReactNode, exams: ReactNode, crumbs: ReactNode } ) {
  const { id, lesson } = await promise
  const course = await server.service('Courses').find({ table: 'Courses', id })
  return (
    <>
      <Header/>
        <SingleProvider id={id} table='Courses'>
            <Flex h='100vh' bg='gray.50'>
                {exams}
                <Box flex={1} overflowY='auto'>
                    <Container maxW='4xl' p={8}>
                    <Stack>
                      {crumbs}
                      {children}
                    </Stack>
                    </Container>
                </Box>
            </Flex>
        </SingleProvider>
    </>
  )
}