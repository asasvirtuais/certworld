"use client"

import { Download, Mail, Globe } from "lucide-react"
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItemCommand,
  Circle,
} from "@chakra-ui/react"
import Link from "next/link"

export function Certificate() {
  const handleDownloadCertificate = () => {
    // In a real app, this would trigger a PDF download
    console.log("Downloading certificate...")
  }

  const handleEmailCertificate = () => {
    // In a real app, this would open an email dialog or send the certificate
    console.log("Emailing certificate...")
  }

  return (
    <Box minH="100vh" bg="white">
      {/* Header */}
      <Box as="header" borderBottom="1px" borderColor="gray.200">
        <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }}>
          <Flex align="center" justify="space-between" h={16}>
            <Flex align="center">
              <Link href="/">
                <Heading size="lg" color="blue.500" fontWeight="bold">
                  CertWorld
                </Heading>
              </Link>
            </Flex>
            <Stack direction="row" gap={8} align="center" display={{ base: "none", md: "flex" }}>
              <Stack direction="row" gap={8} as="nav">
                <Link href="/courses">
                  <Text color="gray.500" _hover={{ color: "gray.700" }} px={3} py={2} fontSize="sm" fontWeight="medium">
                    Courses
                  </Text>
                </Link>
                <Link href="/dashboard">
                  <Text color="gray.500" _hover={{ color: "gray.700" }} px={3} py={2} fontSize="sm" fontWeight="medium">
                    Dashboard
                  </Text>
                </Link>
              </Stack>
              <Stack direction="row" gap={4} align="center">
                <Button variant="outline" fontSize="sm" fontWeight="medium">
                  Login
                </Button>
                <Button bg="blue.500" _hover={{ bg: "blue.600" }} color="white" fontSize="sm" fontWeight="medium">
                  Sign Up
                </Button>
                <MenuRoot>
                  <MenuTrigger>
                    <Button variant="ghost" size="sm">
                      <Globe size={20} />
                      <Text ml={2} fontSize="sm">EN</Text>
                    </Button>
                  </MenuTrigger>
                  <MenuContent>
                    <MenuItemCommand cursor="pointer">EN</MenuItemCommand>
                    <MenuItemCommand cursor="pointer">ES</MenuItemCommand>
                  </MenuContent>
                </MenuRoot>
              </Stack>
            </Stack>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="4xl" px={{ base: 4, sm: 6, lg: 8 }} py={12} as="main">
        <Box textAlign="center" mb={12}>
          <Heading size="xl" fontWeight="bold" color="gray.900" mb={4}>
            Congratulations! You've completed this course
          </Heading>
          <Text fontSize="lg" color="gray.500">
            You've successfully completed the Food Safety Certification course. Your certificate is ready.
          </Text>
        </Box>

        {/* Certificate */}
        <Box maxW="3xl" mx="auto" mb={8}>
          <Box bg="white" border="2px" borderColor="blue.400" borderRadius="lg" p={12} position="relative">
            {/* CertWorld Logo Badge */}
            <Box position="absolute" top={6} right={6}>
              <Circle size={16} bg="blue.200" color="blue.600" fontWeight="bold" fontSize="lg">
                CW
              </Circle>
            </Box>

            <Box textAlign="center">
              <Heading size="lg" fontWeight="bold" color="gray.900" mb={2}>
                CERTIFICATE OF COMPLETION
              </Heading>
              <Box w={16} h={1} bg="blue.500" mx="auto" mb={8} />

              <Text fontSize="lg" color="gray.700" mb={4}>This certifies that</Text>

              <Heading size="xl" fontWeight="bold" color="gray.900" mb={6}>Demo User</Heading>

              <Text fontSize="lg" color="gray.700" mb={6}>has successfully completed</Text>

              <Heading size="lg" fontWeight="bold" color="gray.900" mb={4}>Food Safety Certification</Heading>

              <Text color="gray.500">Completed on 5/4/2025</Text>
            </Box>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Flex direction={{ base: "column", sm: "row" }} gap={4} justify="center" align="center">
          <Button onClick={handleDownloadCertificate} bg="blue.500" _hover={{ bg: "blue.600" }} color="white" px={6} py={3}>
            <Download size={16} style={{ marginRight: '8px' }} />
            Download Certificate
          </Button>
          <Button onClick={handleEmailCertificate} variant="outline" px={6} py={3}>
            <Mail size={16} style={{ marginRight: '8px' }} />
            Email Certificate
          </Button>
        </Flex>
      </Container>
    </Box>
  )
}
