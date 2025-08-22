'use server'

import { server } from '@/data/server'
import { authenticate } from '@/lib/auth0'
import { revalidatePath } from 'next/cache'

export async function submitAction(data: FormData) {
    const user = await authenticate()
    const profile = await server.service('Profiles').find({ table: 'Profiles', id: user.id })
    const obj = Object.fromEntries(data.entries())
    const answers : string[] = (profile.Answers ?? []).concat(Object.values(obj) as string[]).filter(v => v)
    await server.service('Profiles').update({ table: 'Profiles', id: user.id, data: { Answers: answers }})
    revalidatePath('/course', 'layout')
}
