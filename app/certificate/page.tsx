import { Box } from '@chakra-ui/react'
import { Certificate } from '../../components/layout/certificate'
import { Header } from '@/components/ui'

export default async function CertificatePage() {
  return (
      <Box minH='100dvh' bg='blue.50'>
        <Header/>
        <Certificate />
      </Box>
  )
}