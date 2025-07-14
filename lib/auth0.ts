import { server } from '@/data/server'
import { Auth0Client } from '@auth0/nextjs-auth0/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import stripe from './stripe'

declare module '@auth0/nextjs-auth0/server' {
  interface User {
    id: string
  }
}

// Inicialização do cliente Auth0
export const auth0 = new Auth0Client({
    signInReturnToPath: '/welcome',
    async onCallback(error, context, session) {
      const user = session?.user
      if ( ! user )
        throw new Error('User not found')
      const sub = user?.sub as string
      let profile
      const found = await server.service('Profiles').list({
          table: 'Profiles',
          query: { 'OAuth ID': sub },
      })
      if (found.length === 0) {
        const customer = await stripe.customers.create({
          name: user.name as string,
          email: user.email as string,
        })
        profile = await server.service('Profiles').create({
          table: 'Profiles',
          data: {
              Name: user.name as string,
              Email: user.email as string,
              'OAuth ID': sub,
              Role: 'Learner',
              'Customer ID': customer.id,
          }
        })
      } else {
        profile = found[0]
      }
      if (! profile)
          throw new Error('Failed to create profile')
      return NextResponse.redirect(new URL('/welcome', process.env.APP_BASE_URL))
    },
})

export default auth0
