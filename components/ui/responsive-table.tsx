"use client"

import { ReactNode } from "react"
import {
  Table,
  Box,
  Card,
  Stack,
  Text,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react"

interface Column {
  key: string
  label: string
  render?: (value: any, row: any) => ReactNode
  mobileLabel?: string
  hideOnMobile?: boolean
}

interface ResponsiveTableProps {
  columns: Column[]
  data: any[]
  onRowClick?: (row: any) => void
}

export function ResponsiveTable({ columns, data, onRowClick }: ResponsiveTableProps) {
  const isMobile = useBreakpointValue({ base: true, md: false })

  if (isMobile) {
    return (
      <Stack gap={4}>
        {data.map((row, index) => (
          <Card.Root 
            key={index} 
            p={4} 
            cursor={onRowClick ? "pointer" : "default"}
            _hover={onRowClick ? { bg: "gray.50" } : {}}
            onClick={() => onRowClick?.(row)}
          >
            <Stack gap={3}>
              {columns
                .filter(col => !col.hideOnMobile)
                .map((column) => (
                  <Flex key={column.key} justify="space-between" align="start">
                    <Text fontSize="sm" color="gray.500" fontWeight="medium" minW="100px">
                      {column.mobileLabel || column.label}:
                    </Text>
                    <Box flex={1} textAlign="right">
                      {column.render ? 
                        column.render(row[column.key], row) : 
                        <Text fontSize="sm" color="gray.900">{row[column.key]}</Text>
                      }
                    </Box>
                  </Flex>
                ))}
            </Stack>
          </Card.Root>
        ))}
      </Stack>
    )
  }

  return (
    <Table.Root variant='line'>
      <Table.Header bg="gray.50">
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeader key={column.key} fontWeight="medium" color="gray.700">
              {column.label}
            </Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((row, index) => (
          <Table.Row 
            key={index} 
            _hover={{ bg: "gray.50" }}
            cursor={onRowClick ? "pointer" : "default"}
            onClick={() => onRowClick?.(row)}
          >
            {columns.map((column) => (
              <Table.Cell key={column.key}>
                {column.render ? 
                  column.render(row[column.key], row) : 
                  row[column.key]
                }
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}