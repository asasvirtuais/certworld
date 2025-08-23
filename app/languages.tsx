'use client'
import { createContextFromHook } from '@asasvirtuais/react'
import { useState } from 'react'

export function useLanguageProvider() {
    const [language, setLanguage] = useState<'en' | 'es'>('en')

    return {
        language,
        setLanguage
    }
}

const [LanguageProvider, useLanguage] = createContextFromHook(useLanguageProvider)

export {
    LanguageProvider,
    useLanguage
}

export function useLanguages( content : {
    en: string,
    es: string,
} ) {
    const language = useLanguage().language
    return content[language]
}
