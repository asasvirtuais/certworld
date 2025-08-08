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
  IconButton,
  SimpleGrid,
} from '@chakra-ui/react'
import { Header } from '@/components/ui/header'
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
              px={8}
              py={6}
            >
              Explore Courses
              <ArrowRight size={20} />
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

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
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
        </SimpleGrid>
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

import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from 'next/link'
import CourseGrid from '@/data/course/grid'

interface Testimonial {
  id: number
  name: string
  title: string
  quote: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Maria Rodriguez",
    title: "Software Developer",
    quote:
      "The bilingual format helped me improve my technical vocabulary in both languages while earning a valuable certificate.",
    avatar: "M",
  },
  {
    id: 2,
    name: "James Wilson",
    title: "Business Analyst",
    quote:
      "CertWorld's courses are comprehensive and well-structured. The certificate I earned helped me advance in my career.",
    avatar: "J",
  },
  {
    id: 3,
    name: "Ana Garcia",
    title: "Project Manager",
    quote:
      "I loved being able to learn at my own pace. The bilingual approach made complex concepts much easier to understand.",
    avatar: "A",
  },
  {
    id: 4,
    name: "David Chen",
    title: "Marketing Specialist",
    quote:
      "The quality of instruction and the practical examples made this the best online learning experience I've had.",
    avatar: "D",
  },
]

export function Testimonials() {
  // const [currentIndex, setCurrentIndex] = useState(0)

  // const goToPrevious = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  // }

  // const goToNext = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  // }

  const currentTestimonial = testimonials[0]

  return (
    <Box bg="white" py={16}>
      <Container maxW="4xl" px={{ base: 4, sm: 6, lg: 8 }}>
        <Box textAlign="center" mb={12}>
          <Heading size="2xl" fontWeight="bold" color="gray.900" mb={4}>
            What Our Students Say
          </Heading>
          <Text fontSize="lg" color="gray.500">
            Hear from people who have completed our certificate courses
          </Text>
        </Box>

        <Box textAlign="center" mb={8}>
          <Circle size={20} bg="blue.200" color="blue.600" mx="auto" mb={8}>
            <Text fontSize="2xl" fontWeight="bold">
              {currentTestimonial.avatar}
            </Text>
          </Circle>

          <Text
            fontSize="xl"
            color="gray.700"
            fontStyle="italic"
            lineHeight="relaxed"
            mb={8}
            maxW="3xl"
            mx="auto"
          >
            "{currentTestimonial.quote}"
          </Text>

          <Box>
            <Heading size="lg" fontWeight="bold" color="gray.900" mb={1}>
              {currentTestimonial.name}
            </Heading>
            <Text color="gray.500">{currentTestimonial.title}</Text>
          </Box>
        </Box>

        <Flex justify="center" align="center" gap={4}>
          <IconButton
            variant="ghost"
            // onClick={goToPrevious}
            size="md"
            borderRadius="full"
            _hover={{ bg: "gray.100" }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </IconButton>

          <IconButton
            variant="ghost"
            // onClick={goToNext}
            size="md"
            borderRadius="full"
            _hover={{ bg: "gray.100" }}
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </IconButton>
        </Flex>

        <Flex justify="center" mt={6} gap={2}>
          {testimonials.map((_, index) => (
            <Box
              key={index}
              as="button"
              // onClick={() => setCurrentIndex(index)}
              w={2}
              h={2}
              borderRadius="full"
              // bg={index === currentIndex ? "blue.500" : "gray.300"}
              transition="background-color 0.2s"
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </Flex>
      </Container>
    </Box>
  )
}

const CollectionOfCourses = ( { children } : React.PropsWithChildren ) => {
  return (
    <Box py={20} bg="gray.50">
      <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }}>
        <Box textAlign="center" mb={16}>
          <Heading size="2xl" fontWeight="bold" color="gray.900" mb={4}>
            Collection of Courses
          </Heading>
          <Text fontSize="lg" color="gray.600" maxW="2xl" mx="auto">
            For more information, select a course below
          </Text>
        </Box>

        {children}

        <Box textAlign="center" mt={12}>
          <Button
            size="lg"
            colorScheme="blue"
            px={8}
            py={6}
            asChild
          >
            <Link href='/courses'>
              View All Courses
              <ArrowRight size={20} />
            </Link>
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export function Landing( { courses } : { courses: Course[] } ) {
  return (
    <Box minH='100vh'>
      <Header />
      <Hero />
      <CollectionOfCourses>
        <CourseGrid courses={courses} />
      </CollectionOfCourses>
      <Testimonials/>
      <Features />
      <LandingFooter />
    </Box>
  )
}