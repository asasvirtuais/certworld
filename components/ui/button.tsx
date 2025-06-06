"use client"

import { Button as ChakraButton } from "@chakra-ui/react"
import { ReactNode } from "react"

interface ButtonProps {
  children: ReactNode
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  width?: string | "full"
}

export function Button({ 
  children, 
  variant = "primary", 
  size = "md", 
  leftIcon, 
  rightIcon, 
  onClick, 
  disabled, 
  type = "button",
  width,
  ...props 
}: ButtonProps) {
  const getVariantProps = () => {
    switch (variant) {
      case "primary":
        return {
          bg: "blue.500",
          _hover: { bg: "blue.600" },
          color: "white",
        }
      case "secondary":
        return {
          colorScheme: "gray",
          variant: "solid",
        }
      case "outline":
        return {
          variant: "outline",
        }
      case "ghost":
        return {
          variant: "ghost",
        }
      default:
        return {}
    }
  }

  const getSizeProps = () => {
    switch (size) {
      case "sm":
        return {
          fontSize: "sm",
          fontWeight: "medium",
          size: "sm",
        }
      case "lg":
        return {
          px: 8,
          py: 3,
        }
      default:
        return {
          fontSize: "sm",
          fontWeight: "medium",
        }
    }
  }

  return (
    <ChakraButton
      onClick={onClick}
      disabled={disabled}
      type={type}
      w={width}
      {...getVariantProps()}
      {...getSizeProps()}
      {...props}
    >
      {leftIcon && <span style={{ marginRight: '8px' }}>{leftIcon}</span>}
      {children}
      {rightIcon && <span style={{ marginLeft: '8px' }}>{rightIcon}</span>}
    </ChakraButton>
  )
}