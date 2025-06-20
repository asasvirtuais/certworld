import { WelcomeLayout, WelcomeContent } from '@/components/layout/welcome'
import { Header } from '@/components/ui/header'
import { getUser } from 'asasvirtuais-auth/auth0.js'
import { redirect } from 'next/navigation'

export default async function WelcomePage() {

    const user = await getUser()

    if ( ! user )
        return redirect('/auth/login?returnTo=/welcome')

    return (
        <WelcomeLayout>
            <Header/>
            <WelcomeContent name={user.given_name as string}/>
        </WelcomeLayout>
    )
}
