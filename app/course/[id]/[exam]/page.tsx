import { server } from '@/data/server'
import { Breadcrumb } from '@chakra-ui/react'
import Link from 'next/link'

export default async function Exam( { params: promise } : { params: Promise<{ id: string, exam: string }> } ) {
    const { id, exam: examId } = await promise
    // const course = await server.service('Courses').find({ table: 'Courses', id })
    // const exam = await server.service('Exams').find({ table: 'Exams', id: examId })

    return null
}