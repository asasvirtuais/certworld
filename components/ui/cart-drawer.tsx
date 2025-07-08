'use client'

import { Trash2, ShoppingCart } from 'lucide-react'
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Drawer,
  Portal,
  CloseButton,
  Button,
  IconButton,
  VStack,
  HStack,
  Separator,
} from '@chakra-ui/react'
import { useCart } from '@/data/cart-context'
import { useRouter } from 'next/navigation'

function CartItem({ item }: { item: Course & { quantity: number } }) {
  const { removeItem } = useCart()

  return (
    <Box p={4} border='1px' borderColor='gray.200' borderRadius='md'>
      <Flex justify='space-between' align='start'>
        <Stack flex={1} gap={2}>
          <Heading size='sm' color='gray.900'>{item.Name}</Heading>
          <Text fontSize='sm' color='gray.600'>{item.Duration / 60} minutes • {item.Languages.join(' / ')}</Text>
          <Text fontSize='sm' color='gray.500'>{item.Location}</Text>
        </Stack>
        <IconButton
          aria-label='Remove from cart'
          variant='ghost'
          size='sm'
          onClick={() => removeItem(item.id)}
        >
          <Trash2 size={16} />
        </IconButton>
      </Flex>
      <Text fontSize='lg' fontWeight='semibold' color='gray.900' mt={2}>
        {item.Price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
      </Text>
    </Box>
  )
}

export function CartDrawer() {
  const { items, isOpen, toggleDrawer, getTotalPrice, clearCart, getItemCount } = useCart()
  const router = useRouter()

  const handleCheckout = async () => {
    try {
      // Create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items })
      })
      
      const { url } = await response.json()
      
      if (url) {
        // Redirect to Stripe Checkout
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout error:', error)
    }
  }

  return (
    <Drawer.Root open={isOpen} onOpenChange={toggleDrawer} placement='end' size='md'>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content bg='white'>
            <Drawer.CloseTrigger asChild>
              <CloseButton />
            </Drawer.CloseTrigger>
            
            <Drawer.Header borderBottom='1px' borderColor='gray.200' pb={4}>
              <Flex align='center' gap={3}>
                <ShoppingCart size={24} />
                <Heading size='lg'>Shopping Cart</Heading>
                {items.length > 0 && (
                  <Text color='gray.500' fontSize='sm'>({getItemCount()} items)</Text>
                )}
              </Flex>
            </Drawer.Header>

            <Drawer.Body pt={4}>
              {items.length === 0 ? (
                <VStack gap={4} py={8} textAlign='center'>
                  <Text color='gray.500' fontSize='lg'>Your cart is empty</Text>
                  <Button onClick={toggleDrawer} colorPalette='blue'>
                    Continue Shopping
                  </Button>
                </VStack>
              ) : (
                <Stack gap={4}>
                  {items.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </Stack>
              )}
            </Drawer.Body>

            {items.length > 0 && (
              <Drawer.Footer flexDir='column' gap={4} borderTop='1px' borderColor='gray.200' pt={4}>
                <Flex justify='space-between' w='full' fontSize='lg'>
                  <Text fontWeight='semibold'>Total</Text>
                  <Text fontWeight='bold' color='gray.900'>
                    {getTotalPrice().toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </Text>
                </Flex>
                
                <Stack w='full' gap={2}>
                  <Button 
                    w='full' 
                    colorPalette='blue' 
                    size='lg'
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                  <Button 
                    w='full' 
                    variant='ghost' 
                    size='sm'
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </Stack>
              </Drawer.Footer>
            )}
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}