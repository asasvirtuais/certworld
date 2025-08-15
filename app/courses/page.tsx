import { CoursesDisplay } from '@/components/layout/courses'
import { Header } from '@/components/ui/header'
import { server } from '@/data/server'
import { authenticate } from '@/lib/auth0'

export const dynamic = 'force-dynamic'

export default async function CorusesPage() {

    const user = await authenticate()
    const profile = await server.service('Profiles').find({ table: 'Profiles', id: user.id })
    const owned = profile['Owned Courses'] ?? []
    const courses = await server.service('Courses').list({ table: 'Courses' })

    const myCourses = courses.filter(course => owned.includes(course.id))
    const otherCourses = courses.filter(course => ! owned.includes(course.id))

    return (
        <>
            <Header />
            <CoursesDisplay myCourses={myCourses} otherCourses={otherCourses} />
        </>
    )
}
