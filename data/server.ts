import { feathers } from '@feathersjs/feathers'
import { CRUD } from '@asasvirtuais/crud'
import { table } from './schema'
import { crud } from './airtable'

export const server = feathers<{
    todos: CRUD<Todo.Readable, Todo.Writable>
}>()
.use('todos', table('todos', crud))
