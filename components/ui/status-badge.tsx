"use client"

import { Badge } from "@chakra-ui/react"

interface StatusBadgeProps {
  status: string
  statusColor?: "success" | "warning" | "secondary" | "default" | string
}

export function StatusBadge({ status, statusColor = "default" }: StatusBadgeProps) {
  const getVariant = (statusColor: string) => {
    switch (statusColor) {
      case "success":
        return "solid"
      case "warning":
        return "subtle"
      case "secondary":
        return "outline"
      default:
        return "subtle"
    }
  }

  const getColorScheme = (statusColor: string) => {
    switch (statusColor) {
      case "success":
        return "green"
      case "warning":
        return "yellow"
      case "secondary":
        return "gray"
      default:
        return "blue"
    }
  }

  return (
    <Badge
      variant={getVariant(statusColor)}
      colorScheme={getColorScheme(statusColor)}
    >
      {status}
    </Badge>
  )
}