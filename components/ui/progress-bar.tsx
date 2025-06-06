"use client"

import { Progress, Flex, Text } from "@chakra-ui/react"

interface ProgressBarProps {
  value: number
  showPercentage?: boolean
  label?: string
  height?: number
}

export function ProgressBar({ 
  value, 
  showPercentage = true, 
  label = "Progress",
  height = 2 
}: ProgressBarProps) {
  return (
    <>
      {showPercentage && (
        <Flex justify="space-between" align="center" mb={2}>
          <Text fontSize="sm" color="gray.500">{label}</Text>
          <Text fontSize="sm" fontWeight="medium" color="gray.700">{value}%</Text>
        </Flex>
      )}
      <Progress.Root value={value} h={height}>
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
    </>
  )
}