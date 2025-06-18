import { WelcomeLayout, WelcomeContent } from '@/components/layout/welcome'
import { MobileHeader } from '@/components/ui'
import { getUser } from 'asasvirtuais-auth/auth0.js'
import { redirect } from 'next/navigation'

export default async function WelcomePage() {

    const user = await getUser()

    if ( ! user )
        return redirect('/auth/login')

    return (
        <WelcomeLayout>
            <MobileHeader/>
            <WelcomeContent name={user.given_name as string}/>
        </WelcomeLayout>
    )
}
