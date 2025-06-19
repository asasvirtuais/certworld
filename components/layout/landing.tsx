'use client'

import { ArrowRight, Check, Globe, Users, Award } from 'lucide-react'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  Stack,
  Grid,
  Circle,
} from '@chakra-ui/react'
import { Header } from '../ui'
import LandingFooter from '../views/landing-page-footer'

const Hero = () => (
  <Box bg='gradient-to-br' bgGradient='linear(to-br, blue.50, purple.50)' py={20}>
    <Container maxW='7xl' px={{ base: 4, sm: 6, lg: 8 }}>
      <Flex direction={{ base: 'column', lg: 'row' }} align='center' gap={12}>
        <Box flex={1} textAlign={{ base: 'center', lg: 'left' }}>
          <Heading
            size='3xl'
            fontWeight='bold'
            color='gray.900'
            mb={6}
            lineHeight='shorter'
          >
            Discover a World of
            <Text as='span' color='blue.600'>
              {' '}Opportunities
            </Text>
          </Heading>
          <Text fontSize='xl' color='gray.600' mb={8} lineHeight='relaxed'>
            Learn new skills and earn certificates with our bilingual courses. 
            Available in English and Spanish with our innovative EchoLines format.
          </Text>
          <Stack direction={{ base: 'column', sm: 'row' }} gap={4}>
            <Button
              size='lg'
              colorScheme='blue'
              rightIcon={<ArrowRight size={20} />}
              px={8}
              py={6}
            >
              Explore Courses
            </Button>
            <Button
              size='lg'
              variant='outline'
              px={8}
              py={6}
            >
              Learn More
            </Button>
          </Stack>
        </Box>
        <Box flex={1} display={{ base: 'none', lg: 'block' }}>
          <Box
            w={400}
            h={300}
            bg='blue.100'
            borderRadius='2xl'
            display='flex'
            alignItems='center'
            justifyContent='center'
            mx='auto'
          >
            <Text color='blue.600' fontSize='lg' fontWeight='medium'>
              Course Preview
            </Text>
          </Box>
        </Box>
      </Flex>
    </Container>
  </Box>
)

const Features = () => {
  const features = [
    {
      icon: Globe,
      title: 'Bilingual Learning',
      description: 'All courses available in both English and Spanish with our innovative EchoLines format.',
    },
    {
      icon: Award,
      title: 'Completion Certificates',
      description: 'Earn a certificate upon successful completion of each course.',
    },
    {
      icon: Users,
      title: 'Learn Anywhere',
      description: 'Access your courses on any device, anytime. Complete at your own pace.',
    },
  ]

  return (
    <Box py={20} bg='white'>
      <Container maxW='7xl' px={{ base: 4, sm: 6, lg: 8 }}>
        <Box textAlign='center' mb={16}>
          <Heading size='2xl' fontWeight='bold' color='gray.900' mb={4}>
            Why Choose CertWorld?
          </Heading>
          <Text fontSize='lg' color='gray.600' maxW='2xl' mx='auto'>
            Join thousands of learners who have advanced their careers with our comprehensive certification programs.
          </Text>
        </Box>

        <Grid columns={{ base: 1, md: 3 }} gap={8}>
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Box key={index} textAlign='center' p={6}>
                <Circle size={16} bg='blue.100' color='blue.600' mx='auto' mb={6}>
                  <IconComponent size={32} />
                </Circle>
                <Heading size='lg' fontWeight='bold' color='gray.900' mb={4}>
                  {feature.title}
                </Heading>
                <Text color='gray.600' lineHeight='relaxed'>
                  {feature.description}
                </Text>
              </Box>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}

const Stats = () => {
  const stats = [
    { number: '10,000+', label: 'Students Enrolled' },
    { number: '50+', label: 'Courses Available' },
    { number: '15+', label: 'Countries Served' },
    { number: '95%', label: 'Completion Rate' },
  ]

  return (
    <Box py={20} bg='blue.600'>
      <Container maxW='7xl' px={{ base: 4, sm: 6, lg: 8 }}>
        <Grid columns={{ base: 2, lg: 4 }} gap={8}>
          {stats.map((stat, index) => (
            <Box key={index} textAlign='center'>
              <Heading size='2xl' fontWeight='bold' color='white' mb={2}>
                {stat.number}
              </Heading>
              <Text color='blue.100' fontSize='lg'>
                {stat.label}
              </Text>
            </Box>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export function Landing() {
  return (
    <Box minH='100vh'>
      <Header />
      <Hero />
      <Features />
      <Stats />
      <LandingFooter />
    </Box>
  )
}