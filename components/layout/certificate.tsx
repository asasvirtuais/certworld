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
  <Card.Root maxW='3xl' mx='auto' mb={8}>
    <Card.Body>
      <Box bg='white' border='2px' borderColor='blue.400' borderRadius='lg' p={12} position='relative'>
        {/* CertWorld Logo Badge */}
        <Box position='absolute' top={6} right={6}>
          <Circle size={16} bg='blue.200' color='blue.600' fontWeight='bold' fontSize='lg'>
            CW
          </Circle>
        </Box>

        <Box textAlign='center'>
          <Heading size='xl' fontWeight='bold' color='gray.900' mb={2}>
            CERTIFICATE OF COMPLETION
          </Heading>
          <Box w={16} h={1} bg='blue.500' mx='auto' mb={8} />

          <Text fontSize='lg' color='gray.700' mb={4}>This certifies that</Text>

          <Heading size='xl' fontWeight='bold' color='gray.900' mb={6}>User Name</Heading>

          <Text fontSize='lg' color='gray.700' mb={6}>has successfully completed</Text>

          <Heading size='lg' fontWeight='bold' color='gray.900' mb={4}>Name</Heading>

          <Text color='gray.500'>Completed on Completion Date</Text>
        </Box>
      </Box>
    </Card.Body>
  </Card.Root>
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