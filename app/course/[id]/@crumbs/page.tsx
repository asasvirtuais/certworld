import { CourseExams, CourseSection } from '@/components/layout/course'
import { server } from '@/data/server'
import { Box, Breadcrumb, Text } from '@chakra-ui/react'
import Link from 'next/link'

export default async function Exams( { params: promise } : { params: Promise<{ id: string }> } ) {
    const { id } = await promise
    const course = await server.service('Courses').find({ table: 'Courses', id })

    return (
        <Breadcrumb.Root>
            <Breadcrumb.List>
                <Breadcrumb.Item>
                    <Breadcrumb.Link asChild>
                        <Link href={`/course/${course.id}`}>{course.Name}</Link>
                    </Breadcrumb.Link>
                </Breadcrumb.Item>
            </Breadcrumb.List>
        </Breadcrumb.Root>
    )
}