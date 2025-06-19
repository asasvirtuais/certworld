"use client"

import { ReactNode } from "react"
import { Card, CardRootProps, useBreakpointValue } from "@chakra-ui/react"

interface ResponsiveCardProps extends CardRootProps {
  children: ReactNode
  mobileFullWidth?: boolean
  responsivePadding?: {
    base?: number | string
    sm?: number | string
    md?: number | string
    lg?: number | string
  }
}

export function ResponsiveCard({ 
  children, 
  mobileFullWidth = true,
  responsivePadding = { base: 4, md: 6 },
  ...props 
}: ResponsiveCardProps) {
  const cardWidth = useBreakpointValue({
    base: mobileFullWidth ? "full" : "auto",
    md: "auto"
  })

  return (
    <Card.Root 
      w={cardWidth}
      {...props}
    >
      <Card.Body p={responsivePadding}>
        {children}
      </Card.Body>
    </Card.Root>
  )
}

interface ResponsiveCardStackProps {
  children: ReactNode
  spacing?: number | string
  direction?: "vertical" | "horizontal"
}

export function ResponsiveCardStack({ 
  children, 
  spacing = 4,
  direction = "vertical" 
}: ResponsiveCardStackProps) {
  const flexDirection = useBreakpointValue({
    base: "column",
    md: direction === "horizontal" ? "row" : "column"
  })

  return (
    <Card.Root>
      <Card.Body 
        display="flex" 
        flexDirection={flexDirection}
        gap={spacing}
      >
        {children}
      </Card.Body>
    </Card.Root>
  )
}