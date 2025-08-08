import { server } from '@/data/server'
import { Landing } from '@/components/layout/landing'

export default async function Home() {
  const courses = await server.service('Courses').list({ table: 'Courses', query: {
    // @ts-expect-error
    Featured: 1
  } })

  return <Landing courses={courses} />
}
