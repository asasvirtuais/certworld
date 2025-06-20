import { Menu } from 'lucide-react'
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Drawer,
  CloseButton,
  Portal,
  HStack,
  Button,
} from '@chakra-ui/react'
import Link from 'next/link'
import { IconButton } from './icon-button'
import { LanguageMenu } from './language-menu'
import { Container } from './container'
import { getUser } from 'asasvirtuais-auth/auth0.js'

const Title = () => (
  <Link href='/'>
    <Heading size='lg' color='blue.500' fontWeight='bold'>CertWorld</Heading>
  </Link>
)

export const LinksMenu = () => {

  return (
    <Stack direction='row' gap={4} align='center'>
      <Button variant='outline' size='sm' asChild>
        <Link href='/auth/login?returnTo=/welcome'>
          Login
        </Link>
      </Button>
      <Button colorPalette='blue' size='sm' asChild>
        <Link href='/auth/login?returnTo=/welcome'>
          Sign Up
        </Link>
      </Button>
    </Stack>
  )
}

  const DesktopNav = () => (
    <Stack direction='row' gap={8} as='nav'>
      {[{ href: '/courses', label: 'Courses' }, { href: '/welcome', label: 'My Learning' }].map((link) => (
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

export const MobileDrawer = () => (
  <Drawer.Root>
    <Drawer.Backdrop />
    <Drawer.Trigger color='black' display={{md: 'none'}} asChild>
      <IconButton
        aria-label='Open menu'
        variant='ghost'
      >
        <Menu size={20} />
      </IconButton>
    </Drawer.Trigger>
    <Portal>
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.CloseTrigger asChild><CloseButton/></Drawer.CloseTrigger>
          <Drawer.Header>
            <Flex justify='space-between' align='center'>
              <Heading size='md' color='blue.500' fontWeight='bold'>
                CertWorld
              </Heading>
            </Flex>
          </Drawer.Header>
          <Drawer.Body>
            <HStack gap={6} align='stretch'>
              <LinksMenu/>
              <LanguageMenu />
            </HStack>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Portal>
  </Drawer.Root>
)

export async function Header() {

  const user = await getUser()

  return (
    <Box as='header' bg='white' borderBottom='1px' borderColor='gray.200'>
      <Container>
        <Flex align='center' justify='space-between' h={16}>

          <Flex align='center'>
            <Title/>
          </Flex>

          <Stack direction='row' gap={8} align='center' display={{ base: 'none', md: 'flex' }}>
            <DesktopNav />
            {! user && <LinksMenu />}
            <LanguageMenu />
          </Stack>

          <MobileDrawer/>
        </Flex>
      </Container>
    </Box>
  )
}