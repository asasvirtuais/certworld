"use client"

import { Download, Mail } from "lucide-react"
import {
  Box,
  Flex,
  Heading,
  Text,
  Container,
  Circle,
} from "@chakra-ui/react"
import { MobileHeader, Button } from "../ui"

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
      <MobileHeader 
        navLinks={[
          { href: "/courses", label: "Courses" },
          { href: "/dashboard", label: "Dashboard" }
        ]}
      />

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
          <Button 
            onClick={handleDownloadCertificate} 
            variant="primary" 
            size="lg"
            leftIcon={<Download size={16} />}
          >
            Download Certificate
          </Button>
          <Button 
            onClick={handleEmailCertificate} 
            variant="outline" 
            size="lg"
            leftIcon={<Mail size={16} />}
          >
            Email Certificate
          </Button>
        </Flex>
      </Container>
    </Box>
  )
}
