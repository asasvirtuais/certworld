'use client'

import { HStack, Icon } from '@chakra-ui/react'
import { SegmentGroup } from '@chakra-ui/react'
import { Globe } from 'lucide-react'

export function LanguageMenu() {
  return (
    <HStack>
      <Icon color='gray.600'>
        <Globe/>
      </Icon>
      <SegmentGroup.Root defaultValue='EN' colorPalette='blue'>
        <SegmentGroup.Indicator />
        <SegmentGroup.Items items={['EN', 'ES']} />
      </SegmentGroup.Root>
    </HStack>
  )
}