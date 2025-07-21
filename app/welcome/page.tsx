import { WelcomeLayout, WelcomeContent, WelcomeNav, WelcomeHeader, WelcomeCourses } from '@/components/layout/welcome'
import { Header } from '@/components/ui/header'
import { server } from '@/data/server'
import { getUser } from 'asasvirtuais-auth/auth0.js'
import { redirect } from 'next/navigation'

export default async function WelcomePage() {

    const user = await getUser()

    if ( ! user )
        return redirect('/auth/login?returnTo=/welcome')

    console.log(user)
    const profile = await server.service('Profiles').find({ table: 'Profiles', id: user.id })

    const courses = await Promise.all(
        (profile['Owned Courses'] || []).map(id => server.service('Courses').find({table: 'Courses',id}))
    )

    return (
        <WelcomeLayout>
            <Header/>
            <WelcomeContent>
                <WelcomeHeader name={user.name || 'User'}/>
                <WelcomeNav/>
                <WelcomeCourses courses={courses}/>
            </WelcomeContent>
        </WelcomeLayout>
    )
}
