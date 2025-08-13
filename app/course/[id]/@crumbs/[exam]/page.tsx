import { server } from '@/data/server'
import { Breadcrumb } from '@chakra-ui/react'
import Link from 'next/link'

export default async function Exams( { params: promise } : { params: Promise<{ id: string, lesson: string, exam: string }> } ) {
    const { id, exam: examId } = await promise
    const course = await server.service('Courses').find({ table: 'Courses', id })
    const exam = await server.service('Exams').find({ table: 'Exams', id: examId })

    return (
        <Breadcrumb.Root>
            <Breadcrumb.List>
                <Breadcrumb.Item>
                    <Breadcrumb.Link asChild>
                        <Link href={`/course/${course.id}`}>{course.Name}</Link>
                    </Breadcrumb.Link>
                </Breadcrumb.Item>
                {exam && <Breadcrumb.Separator />}
                {exam && (
                    <Breadcrumb.Item>
                        {exam.Name}
                    </Breadcrumb.Item>
                )}
            </Breadcrumb.List>
        </Breadcrumb.Root>
    )
}