import { Check } from 'lucide-react'
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Stack,
  Circle,
} from '@chakra-ui/react'
import Link from 'next/link'
import stripe from '@/lib/stripe'
import { authenticate } from '@/lib/auth0'
import { server } from '@/data/server'

export const dynamic = 'force-dynamic'

export default async function SuccessPage( { searchParams: promise }: { searchParams: Promise<{ session_id: string }> } ) {

  const { session_id } = await promise

  const session = await stripe.checkout.sessions.retrieve(session_id)

  const purchasedCourses : string[] = session.metadata?.course_ids?.split(',') ?? []

  const user = await authenticate()

  const profile = await server.service('Profiles').find({id: user.id, table: 'Profiles'})

  const set = new Set([...profile['Owned Courses'], ...purchasedCourses])
  const array = Array.from(set)

  await server.service('Profiles').update({ table: 'Profiles', id: user.id, data: { 'Owned Courses': array } })

  return (
    <Container maxW='2xl' py={16}>
      <Stack gap={8} textAlign='center'>
        <Circle size={20} bg='green.500' color='white' mx='auto'>
          <Check size={40} />
        </Circle>
        
        <Stack gap={4}>
          <Heading size='2xl' color='gray.900'>
            Payment Successful!
          </Heading>
          <Text fontSize='lg' color='gray.600'>
            Thank you for your purchase. You now have access to your courses.
          </Text>
        </Stack>

        <Stack direction={{ base: 'column', sm: 'row' }} gap={4} justify='center'>
          <Button size='lg' colorPalette='blue' asChild>
            <Link href='/welcome'>
              Go to My Learning
            </Link>
          </Button>
          <Button size='lg' variant='outline' asChild>
            <Link href='/courses'>
              Browse More Courses
            </Link>
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
}