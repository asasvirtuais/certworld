'use client'

import { PropsWithChildren } from 'react'
import { DatabaseProvider, useTableProvider } from './react'

export default function DataProvider({children, ...props}: PropsWithChildren<{courses?: Course[]}>) {

    const courses      = useTableProvider({ table: 'Courses',         asAbove: Object.fromEntries(props.courses?.map(c => [c.id, c]) ?? []) })
    const certificates = useTableProvider({ table: 'Certificates',    asAbove: {} })
    const exams        = useTableProvider({ table: 'Exams',           asAbove: {} })
    const results      = useTableProvider({ table: 'Exam Results',    asAbove: {} })
    const lessons      = useTableProvider({ table: 'Lessons',         asAbove: {} })
    const progress     = useTableProvider({ table: 'Lesson Progress', asAbove: {} })
    const profile      = useTableProvider({ table: 'Profiles',        asAbove: {} })
    const questions    = useTableProvider({ table: 'Questions',       asAbove: {} })

    return (
        <DatabaseProvider
            {...{
                Certificates:      certificates,
                Courses:           courses,
                Exams:             exams,
                'Exam Results':    results,
                Lessons:           lessons,
                'Lesson Progress': progress,
                Profiles:          profile,
                Questions:         questions,
            }}
        >{children}</DatabaseProvider>
    )
}