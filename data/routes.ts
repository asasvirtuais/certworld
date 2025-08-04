import { routes, createDynamicRoute } from '@asasvirtuais/crud/next'
import { crud } from './airtable'

export const {
    find,
    list,
    create,
    update,
    remove,
} = routes(crud)

export const route = createDynamicRoute(crud)
