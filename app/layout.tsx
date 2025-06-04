import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Provider } from '@/components/ui/provider'

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
