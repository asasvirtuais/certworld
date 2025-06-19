import { Box } from '@chakra-ui/react'
import { Dashboard } from '@/components/layout/dashboard'
import { Header } from '@/components/ui'

export default async function DashboardPage() {
  return (
    <Box minH='100vh' bg='gray.50'>
      <Header />
      <Dashboard />
    </Box>
  )
}