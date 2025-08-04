'use client'
import { database } from '@asasvirtuais/crud/react'
import { fetcher } from '@asasvirtuais/crud'
import { schema } from './schema'

export const { DatabaseProvider, useDatabase, useTable, CreateForm, UpdateForm, SingleProvider, useSingle, FilterForm, useCreateForm, useUpdateForm, useFiltersForm, useTableProvider } = database(schema, fetcher({ baseUrl: '/api/v1' }))