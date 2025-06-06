"use client"

import { ReactNode } from "react"
import { Grid, GridProps } from "@chakra-ui/react"

interface ResponsiveGridProps extends Omit<GridProps, 'templateColumns'> {
  children: ReactNode
  columns?: {
    base?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  minChildWidth?: string
  spacing?: number | string
}

export function ResponsiveGrid({ 
  children, 
  columns = { base: 1, md: 2, lg: 3 },
  minChildWidth,
  spacing = 6,
  ...props 
}: ResponsiveGridProps) {
  const getTemplateColumns = () => {
    if (minChildWidth) {
      return `repeat(auto-fit, minmax(${minChildWidth}, 1fr))`
    }
    
    return {
      base: `repeat(${columns.base || 1}, 1fr)`,
      sm: columns.sm ? `repeat(${columns.sm}, 1fr)` : undefined,
      md: columns.md ? `repeat(${columns.md}, 1fr)` : undefined,
      lg: columns.lg ? `repeat(${columns.lg}, 1fr)` : undefined,
      xl: columns.xl ? `repeat(${columns.xl}, 1fr)` : undefined,
    }
  }

  return (
    <Grid
      templateColumns={getTemplateColumns()}
      gap={spacing}
      {...props}
    >
      {children}
    </Grid>
  )
}