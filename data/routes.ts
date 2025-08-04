import { routes, createDynamicRoute } from '@asasvirtuais/crud/next.js'
import { crud } from './airtable'

export const {
    find,
    list,
    create,
    update,
    remove,
} = routes(crud)

export const route = createDynamicRoute(crud)
