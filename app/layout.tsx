import { Provider } from '@/components/ui/provider'
import DataProvider from '@/data/provider'
import { Theme } from '@chakra-ui/react'
import { CartProvider } from '@/data/cart-context'
import { CartDrawer } from '@/components/ui/cart-drawer'
import { server } from '@/data/server'

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const courses = await server.service('Courses').list({ table: 'Courses' })
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>
          <DataProvider courses={courses}>
            <CartProvider>
              <Theme appearance='light'>
                {children}
                <CartDrawer />
              </Theme>
            </CartProvider>
          </DataProvider>
        </Provider>
      </body>
    </html>
  )
}
