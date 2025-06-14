'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Drawer,
  VStack,
  useBreakpointValue,
  CloseButton,
} from '@chakra-ui/react'
import Link from 'next/link'
import { Button } from './button'
import { IconButton } from './icon-button'
import { LanguageMenu } from './language-menu'

interface NavLink {
  href: string
  label: string
}

interface MobileHeaderProps {
  navLinks?: NavLink[]
  showAuth?: boolean
  currentLanguage?: 'EN' | 'ES'
  onLanguageChange?: (language: 'EN' | 'ES') => void
}


const Title = () => (
  <Link href='/'>
    <Heading size='lg' color='blue.500' fontWeight='bold'>
      CertWorld
    </Heading>
  </Link>
)

export const LinksMenu = () => {

  return (
    <Stack direction='row' gap={4} align='center'>
      <Button variant='outline' size='sm'>
        Login
      </Button>
      <Button variant='primary' size='sm'>
        Sign Up
      </Button>
      <LanguageMenu 
        // currentLanguage={currentLanguage}
        // onLanguageChange={onLanguageChange}
      />
    </Stack>
  )
}

  const DesktopNav = () => (
    <Stack direction='row' gap={8} as='nav'>
      {[{ href: '#A', label: 'Link A' }, { href: '#B', label: 'Link B' }].map((link) => (
        <Link key={link.href} href={link.href}>
          <Text 
            color='gray.500' 
            _hover={{ color: 'gray.700' }} 
            px={3} 
            py={2} 
            fontSize='sm' 
            fontWeight='medium'
          >
            {link.label}
          </Text>
        </Link>
      ))}
    </Stack>
  )

export const MobileMenu = () => {

  return (
    <IconButton
      display={{ base: 'flex', md: 'none' }}
      aria-label='Open menu'
      variant='ghost'
    >
      <Menu size={20} />
    </IconButton>
  )
}

export function MobileHeader({ 
  navLinks = [], 
  showAuth = true,
  currentLanguage = 'EN',
  onLanguageChange
}: MobileHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useBreakpointValue({ base: true, md: false })

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <Box as='header' borderBottom='1px' borderColor='gray.200'>
      <Container maxW='full' px='0px'>
        <Flex align='center' justify='space-between' h={16}>
          {/* Logo */}
          <Flex align='center'>
            <Title/>
          </Flex>

          {/* Desktop Navigation */}
          <Stack direction='row' gap={8} align='center' display={{ base: 'none', md: 'flex' }}>
            <DesktopNav />
            <LinksMenu />
          </Stack>

          {/* Mobile Menu Button */}
          <MobileMenu/>
        </Flex>
      </Container>

      {/* Mobile Menu Drawer */}
      {isMobile && (
        <Drawer.Root open={isMenuOpen} onOpenChange={({ open }) => !open && setIsMenuOpen(false)}>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.CloseTrigger><CloseButton/></Drawer.CloseTrigger>
              <Drawer.Header>
                <Flex justify='space-between' align='center'>
                  <Heading size='md' color='blue.500' fontWeight='bold'>
                    CertWorld
                  </Heading>
                </Flex>
              </Drawer.Header>
              <Drawer.Body>
                <VStack gap={6} align='stretch'>
                  {/* Navigation Links */}
                  <VStack gap={4} align='stretch'>
                    {navLinks.map((link) => (
                      <Link key={link.href} href={link.href} onClick={toggleMenu}>
                        <Text 
                          color='gray.700' 
                          fontSize='lg' 
                          fontWeight='medium'
                          py={2}
                          _hover={{ color: 'blue.500' }}
                        >
                          {link.label}
                        </Text>
                      </Link>
                    ))}
                  </VStack>

                  {/* Auth Buttons */}
                  {showAuth && (
                    <VStack gap={4} align='stretch' pt={4} borderTop='1px' borderColor='gray.200'>
                      <Button variant='outline' width='full'>
                        Login
                      </Button>
                      <Button variant='primary' width='full'>
                        Sign Up
                      </Button>
                    </VStack>
                  )}

                  {/* Language Menu */}
                  <Box pt={4} borderTop='1px' borderColor='gray.200'>
                    <LanguageMenu 
                      currentLanguage={currentLanguage}
                      onLanguageChange={onLanguageChange}
                    />
                  </Box>
                </VStack>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer.Root>
      )}
    </Box>
  )
}