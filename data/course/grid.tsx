'use client'

import { FilterForm, SingleProvider, useSingle, useFiltersForm, useTable } from '@/data/react'
import { Card, Flex, Text, GridItem, Heading, SimpleGrid, Stack } from '@chakra-ui/react'
import { MapPin } from 'lucide-react'
import { Fragment, useEffect } from 'react'
import { CourseCard } from '@/components/ui'

export default function CourseGrid( { courses } : { courses: Course[] } ) {
    return (
        <SimpleGrid columns={{base: 1, md: 2, lg: 3}} gap={6}>
            {courses?.map(item => (
                <GridItem key={item.id}>
                    <CourseCard course={item} />
                </GridItem>
            ))}
        </SimpleGrid>
    )
}