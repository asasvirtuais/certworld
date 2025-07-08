'use client'

import { ShoppingCart } from 'lucide-react'
import { Button, Badge } from '@chakra-ui/react'
import { useCart } from '@/data/cart-context'

export function CartButton() {
  const { toggleDrawer, getItemCount } = useCart()
  const itemCount = getItemCount()

  return (
    <Button
      variant='ghost'
      onClick={toggleDrawer}
      position='relative'
    >
      <ShoppingCart size={20} />
      {itemCount > 0 && (
        <Badge
          colorPalette='red'
          position='absolute'
          top='-1'
          right='-1'
          borderRadius='full'
          minW='5'
          h='5'
          display='flex'
          alignItems='center'
          justifyContent='center'
          fontSize='xs'
        >
          {itemCount}
        </Badge>
      )}
    </Button>
  )
}