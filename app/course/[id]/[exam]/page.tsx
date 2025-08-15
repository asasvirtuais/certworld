import { useTable } from '@/data/react'
import { server } from '@/data/server'
import { Box, Button, Field, Heading, Stack } from '@chakra-ui/react'
import { RadioGroup } from '@chakra-ui/react'
import { useCallback } from 'react'
import { submitAction } from './submitAction'

const Answers = async ( { question } : { question: Question } ) => {

    const answers = await server.service('Answers').list({ table: 'Answers', query: { 'Question ID': question.id } })

    return (
        <Stack asChild>
            <RadioGroup.Root name={question.id}>
                {answers.map(answer => (
                    <RadioGroup.Item key={answer.id} value={answer.id}>
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText>{answer.Name}</RadioGroup.ItemText>
                    </RadioGroup.Item>
                ))}
            </RadioGroup.Root>
        </Stack>
    )
}

export default async function Exam( { params: promise } : { params: Promise<{ id: string, exam: string }> } ) {
    const { id, exam: examId } = await promise
    const exam = await server.service('Exams').find({ table: 'Exams', id: examId })
    const questions = await server.service('Questions').list({ table: 'Questions', query: { 'Exam ID': exam.id } })

    return (
        <Stack asChild>
            <form action={submitAction}>
                <Heading>{exam.Name} Exam</Heading>
                <Stack>
                    {questions.map(question => (
                        <Stack key={question.id} asChild>
                            <Field.Root required>
                                    <Box>
                                        {question.Name}
                                        <Field.RequiredIndicator/>
                                    </Box>
                                    <Stack>
                                        <Answers question={question} />
                                    </Stack>
                            </Field.Root>
                        </Stack>
                    ))}
                </Stack>
                <Button type='submit' alignSelf='flex-end'>Submit Exam</Button>
            </form>
        </Stack>
    )
}