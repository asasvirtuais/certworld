import { Box } from '@chakra-ui/react'
import { redirect } from 'next/navigation'
import auth0 from 'asasvirtuais-auth/auth0.js'

export default async function Home() {

  const session = await auth0.getSession()

  if (!session?.user)
    return redirect('/auth/login?returnTo=/welcome')

  return (
    <Box>
      Use Storybook for the UI
    </Box>
  )
}
