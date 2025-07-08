import { Provider } from '@/components/ui/provider'
import DataProvider from '@/data/provider'
import { Theme } from '@chakra-ui/react'
import { CartProvider } from '@/data/cart-context'
import { CartDrawer } from '@/components/ui/cart-drawer'

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html suppressHydrationWarning>
      <body>
        <DataProvider>
          <Provider>
            <CartProvider>
              <Theme appearance='light'>
                {children}
                <CartDrawer />
              </Theme>
            </CartProvider>
          </Provider>
        </DataProvider>
      </body>
    </html>
  )
}
