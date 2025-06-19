'use client'
import Link from "next/link"
import {
  Box,
  Container,
  Heading,
  Text,
  Circle,
  SimpleGrid,
  Stack,
  Separator
} from "@chakra-ui/react"

const features = [
  {
    number: "1",
    title: "Bilingual Learning",
    description: "All courses available in both English and Spanish with our innovative EchoLines format.",
  },
  {
    number: "2",
    title: "Completion Certificates",
    description: "Earn a certificate upon successful completion of each course.",
  },
  {
    number: "3",
    title: "Learn Anywhere",
    description: "Access your courses on any device, anytime. Complete at your own pace.",
  },
]

const footerLinks = {
  platform: [
    { name: "Courses", href: "/courses" },
    { name: "Dashboard", href: "/dashboard" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Contact Us", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
}

export default function LandingFooter() {
  return (
    <Box bg="white">
      {/* Why Choose CertWorld Section */}
      <Box bg="purple.50" py={16}>
        <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }}>
          <Heading size="2xl" fontWeight="bold" textAlign="center" color="gray.900" mb={12}>
            Why Choose CertWorld?
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
            {features.map((feature) => (
              <Box key={feature.number} bg="white" borderRadius="lg" p={8} textAlign="center" shadow="sm">
                <Circle size={16} bg="blue.200" color="blue.600" mx="auto" mb={6}>
                  <Text fontSize="2xl" fontWeight="bold">
                    {feature.number}
                  </Text>
                </Circle>
                <Heading size="lg" fontWeight="bold" color="gray.900" mb={4}>
                  {feature.title}
                </Heading>
                <Text color="gray.500" lineHeight="relaxed">
                  {feature.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Footer */}
      <Box as="footer" bg="white" py={12}>
        <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }}>
          <SimpleGrid columns={{ base: 1, md: 4 }} gap={8}>
            {/* Brand Section */}
            <Box gridColumn={{ md: "span 1" }}>
              <Link href="/" style={{ display: "block", marginBottom: "16px" }}>
                <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                  CertWorld
                </Text>
              </Link>
              <Text color="gray.500">Discovery a world of opportunities</Text>
            </Box>

            {/* Platform Links */}
            <Box>
              <Heading size="sm" fontWeight="semibold" color="gray.900" textTransform="uppercase" letterSpacing="wider" mb={4}>
                PLATFORM
              </Heading>
              <Stack gap={3}>
                {footerLinks.platform.map((link) => (
                  <Box key={link.name}>
                    <Link href={link.href}>
                      <Text color="gray.500" _hover={{ color: "gray.700" }} transition="colors">
                        {link.name}
                      </Text>
                    </Link>
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* Support Links */}
            <Box>
              <Heading size="sm" fontWeight="semibold" color="gray.900" textTransform="uppercase" letterSpacing="wider" mb={4}>
                SUPPORT
              </Heading>
              <Stack gap={3}>
                {footerLinks.support.map((link) => (
                  <Box key={link.name}>
                    <Link href={link.href}>
                      <Text color="gray.500" _hover={{ color: "gray.700" }} transition="colors">
                        {link.name}
                      </Text>
                    </Link>
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* Legal Links */}
            <Box>
              <Heading size="sm" fontWeight="semibold" color="gray.900" textTransform="uppercase" letterSpacing="wider" mb={4}>
                LEGAL
              </Heading>
              <Stack gap={3}>
                {footerLinks.legal.map((link) => (
                  <Box key={link.name}>
                    <Link href={link.href}>
                      <Text color="gray.500" _hover={{ color: "gray.700" }} transition="colors">
                        {link.name}
                      </Text>
                    </Link>
                  </Box>
                ))}
              </Stack>
            </Box>
          </SimpleGrid>

          {/* Copyright */}
          <Box mt={12} pt={8}>
            <Separator borderColor="gray.200" mb={8} />
            <Text textAlign="center" color="gray.500">
              © 2025 CertWorld. All rights reserved.
            </Text>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
