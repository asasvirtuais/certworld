'use client'

import { useLanguage } from '@/app/languages'
import { HStack, Icon } from '@chakra-ui/react'
import { SegmentGroup } from '@chakra-ui/react'
import { Globe } from 'lucide-react'

export function LanguageMenu() {
  const { setLanguage } = useLanguage()

  return (
    <HStack>
      <Icon color='gray.600'>
        <Globe/>
      </Icon>
      <SegmentGroup.Root onValueChange={({value}) => setLanguage(value?.toLowerCase() as 'en' | 'es')} defaultValue='EN' colorPalette='blue'>
        <SegmentGroup.Indicator bg='white' />
        <SegmentGroup.Items items={['EN', 'ES']} />
      </SegmentGroup.Root>
    </HStack>
  )
}