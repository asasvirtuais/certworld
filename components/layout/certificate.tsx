'use client'

import { Download, Mail } from 'lucide-react'
import {
  Box,
  Flex,
  Heading,
  Text,
  Container,
  Circle,
  Card,
  Button,
} from '@chakra-ui/react'
import { FilterForm, useFiltersForm } from '@/data/react'
import Image from 'next/image'

const CertificateHeader = () => (
  <Box textAlign='center' mb={12}>
    <Heading size='xl' fontWeight='bold' color='gray.900' mb={4}>
      Congratulations! You've completed this course
    </Heading>
    <Text fontSize='lg' color='gray.500'>
      You've successfully completed the Food Safety Certification course.
      <br/>
      Your certificate is ready.
    </Text>
  </Box>
)

const CertificateCard = ({ certificate }: { certificate: Certificate }) => (
  <Box maxW='3xl' mx='auto' mb={8}>
      <Image src={`/certificate/${certificate.id}/certificate.png`} alt='' width={800} height={500} />
  </Box>
)

export function CertificateContent( { certificate } : { certificate: Certificate } ) {

  return (
    <Container maxW='4xl' px={{ base: 4, sm: 6, lg: 8 }} py={12} as='main'>
      <CertificateHeader />
      <CertificateCard certificate={certificate} />
      <Flex direction={{ base: 'column', sm: 'row' }} gap={4} justify='center' align='center'>
        <Button 
          colorPalette='blue'
          size='lg'
        >
          <Download size={16} />
          Download Certificate
        </Button>
        <Button 
          variant='outline' 
          size='lg'
        >
          <Mail size={16} />
          Email Certificate
        </Button>
      </Flex>
    </Container>
  )
}