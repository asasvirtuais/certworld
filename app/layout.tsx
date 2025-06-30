import { Provider } from '@/components/ui/provider'
import DataProvider from '@/data/provider'
import { Theme } from '@chakra-ui/react'

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html suppressHydrationWarning>
      <body>
        <DataProvider>
          <Provider>
            <Theme appearance='light'>
              {children}
            </Theme>
          </Provider>
        </DataProvider>
      </body>
    </html>
  )
}
