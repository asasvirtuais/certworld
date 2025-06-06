"use client"

import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
} from "@chakra-ui/react"
import Link from "next/link"
import { Button } from "./button"
import { LanguageMenu } from "./language-menu"

interface NavLink {
  href: string
  label: string
}

interface HeaderProps {
  navLinks?: NavLink[]
  showAuth?: boolean
  currentLanguage?: "EN" | "ES"
  onLanguageChange?: (language: "EN" | "ES") => void
}

export function Header({ 
  navLinks = [], 
  showAuth = true,
  currentLanguage = "EN",
  onLanguageChange
}: HeaderProps) {
  return (
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
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Text 
                    color="gray.500" 
                    _hover={{ color: "gray.700" }} 
                    px={3} 
                    py={2} 
                    fontSize="sm" 
                    fontWeight="medium"
                  >
                    {link.label}
                  </Text>
                </Link>
              ))}
            </Stack>
            <Stack direction="row" gap={4} align="center">
              {showAuth && (
                <>
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </>
              )}
              <LanguageMenu 
                currentLanguage={currentLanguage}
                onLanguageChange={onLanguageChange}
              />
            </Stack>
          </Stack>
        </Flex>
      </Container>
    </Box>
  )
}