import { Box } from '@chakra-ui/react'
import { CertificateContent } from '@/components/layout/certificate'
import { Header } from '@/components/ui'
import { server } from '@/data/server'

export default async function CertificatePage( { params: promise } : { params: Promise<{ id: string }> } ) {

  const { id } = await promise

  const certificate = await server.service('Certificates').find({ table: 'Certificates', id })

  return (
    <Box minH='100dvh' bg='blue.50'>
      <Header/>
      <CertificateContent certificate={certificate} />
    </Box>
  )
}