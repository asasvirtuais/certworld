"use client"

import { IconButton as ChakraIconButton } from "@chakra-ui/react"
import { ReactNode } from "react"

interface IconButtonProps {
  children: ReactNode
  variant?: "ghost" | "outline" | "solid"
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  disabled?: boolean
  "aria-label": string
}

export function IconButton({ 
  children, 
  variant = "ghost", 
  size = "sm", 
  onClick, 
  disabled, 
  "aria-label": ariaLabel,
  ...props 
}: IconButtonProps) {
  return (
    <ChakraIconButton
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </ChakraIconButton>
  )
}