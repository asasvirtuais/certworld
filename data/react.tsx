'use client'
import { database } from '@asasvirtuais/react'
import { crud } from '@asasvirtuais/feathers'
import { client } from './client'
import { schema } from './schema'

export const { DatabaseProvider, useDatabase, useTable, CreateForm, UpdateForm, SingleProvider, useSingle, FilterForm, useCreateForm, useUpdateForm, useFiltersForm, useTableProvider } = database(schema, crud(client as any))
