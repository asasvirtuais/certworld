import { createDynamicRoute } from '@asasvirtuais/crud/src/next'
import { crud } from '@/data/airtable'

export const GET = createDynamicRoute(crud)
export const POST = createDynamicRoute(crud)
export const DELETE = createDynamicRoute(crud)
export const PATCH = createDynamicRoute(crud)
