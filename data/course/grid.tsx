'use client'

import { FilterForm, SingleProvider, useSingle } from '@/data/react'
import { useForm } from '@asasvirtuais/react'
import { Card, Flex, Text, GridItem, Heading, SimpleGrid, Stack } from '@chakra-ui/react'
import { MapPin } from 'lucide-react'
import { Fragment, useEffect } from 'react'
import CourseDrawer from './drawer'

export function CourseGridCard() {
    const { single: {
        Name,
        Category,
        Languages,
        Duration,
        Location
    } } = useSingle<'Courses'>()

    return (
        <Card.Root overflow="hidden" _hover={{ shadow: "lg" }} transition="shadow">
            <Card.Header bg="blue.100" p={6}>
                <Heading size="md" fontWeight="medium" color="blue.600" textAlign="center">
                {Category}
                </Heading>
            </Card.Header>
            <Card.Body p={6}>
                <Heading size="md" fontWeight="semibold" color="gray.900" mb={3}>
                    {Name}
                </Heading>
                <Stack gap={2} mb={4}>
                    <Flex justify="space-between" fontSize="sm" color="gray.600">
                        <Text>{Languages}</Text>
                        <Text>{Duration / 60} minutes</Text>
                    </Flex>
                    <Flex align="center" fontSize="sm" color="gray.500">
                        <MapPin size={16} style={{ marginRight: '4px' }} />
                        <Text>{Location}</Text>
                    </Flex>
                </Stack>
                <CourseDrawer {...{}} />
            </Card.Body>
        </Card.Root>
    )
}

export function CourseGridItems() {
    const { submit, result } = useForm<{}, Course[]>()

    console.log(result)

    useEffect(() => {
        submit()
    }, [])

    return (
        <Fragment>
            {result?.map(item => (
                <GridItem key={item.id}>
                    <SingleProvider table='Courses' id={item.id}>
                        <CourseGridCard />
                    </SingleProvider>
                </GridItem>
            ))}
        </Fragment>
    )
}

export default function CourseGrid() {
    return (
        <SimpleGrid columns={{base: 1, md: 2, lg: 3}} gap={6}>
            <FilterForm table='Courses'>
                <CourseGridItems />
            </FilterForm>
        </SimpleGrid>
    )
}