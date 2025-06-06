"use client"

import { ReactNode, useState } from "react"
import { Menu, X } from "lucide-react"
import {
  Box,
  Flex,
  Drawer,
  useBreakpointValue,
} from "@chakra-ui/react"
import { IconButton } from "./icon-button"

interface ResponsiveSidebarProps {
  children: ReactNode
  width?: string | number
  isOpen?: boolean
  onToggle?: () => void
}

export function ResponsiveSidebar({ 
  children, 
  width = "80", 
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle 
}: ResponsiveSidebarProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const isMobile = useBreakpointValue({ base: true, lg: false })
  
  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen
  const onToggle = controlledOnToggle || (() => setInternalIsOpen(!internalIsOpen))

  if (isMobile) {
    return (
      <>
        {/* Mobile menu button */}
        <Box position="fixed" top={4} left={4} zIndex={1000}>
          <IconButton
            aria-label="Open menu"
            variant="solid"
            onClick={onToggle}
          >
            <Menu size={20} />
          </IconButton>
        </Box>

        {/* Mobile drawer */}
        <Drawer.Root open={isOpen} onOpenChange={({ open }) => !open && onToggle()}>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Flex justify="end">
                  <IconButton
                    aria-label="Close menu"
                    variant="ghost"
                    onClick={onToggle}
                  >
                    <X size={20} />
                  </IconButton>
                </Flex>
              </Drawer.Header>
              <Drawer.Body p={0}>
                {children}
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer.Root>
      </>
    )
  }

  // Desktop sidebar
  return (
    <Box 
      w={width} 
      bg="white" 
      borderRight="1px" 
      borderColor="gray.200" 
      overflowY="auto"
      position="sticky"
      top={0}
      height="100vh"
    >
      {children}
    </Box>
  )
}

interface SidebarContentProps {
  children: ReactNode
  showMobileButton?: boolean
  onMobileToggle?: () => void
}

export function SidebarContent({ 
  children, 
  showMobileButton = false, 
  onMobileToggle 
}: SidebarContentProps) {
  return (
    <Box h="full">
      {showMobileButton && (
        <Box p={4} borderBottom="1px" borderColor="gray.200">
          <IconButton
            aria-label="Open menu"
            variant="ghost"
            onClick={onMobileToggle}
          >
            <Menu size={20} />
          </IconButton>
        </Box>
      )}
      {children}
    </Box>
  )
}