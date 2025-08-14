import { server } from '@/data/server'
import { Box, Button, Heading, Stack } from '@chakra-ui/react'
import { RadioGroup } from '@chakra-ui/react'

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
        <Stack>
            <Heading>{exam.Name} Exam</Heading>
            <Stack>
                {questions.map(question => (
                    <Stack key={question.id}>
                        <Box>{question.Name}</Box>
                        <Stack>
                            <Answers question={question} />
                        </Stack>
                    </Stack>
                ))}
            </Stack>
            <Button alignSelf='flex-end'>Submit Exam</Button>
        </Stack>
    )
}