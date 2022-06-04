import { ModelType } from 'App/Shared/Interfaces/BaseInterface'

import Permission from 'App/Modules/Accounts/Models/Permission'

type DefaultType = ModelType<typeof Permission> & {
  resourceName: string
  methods: Array<string>
  roleName: string
}

export const PermissionsDefault: Array<DefaultType> = [
  {
    resourceName: 'operations',
    action: 'ALLOW',
    methods: ['GET'],
    roleName: 'root',
  },
  {
    resourceName: 'resources',
    action: 'ALLOW',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    roleName: 'root',
  },
  {
    resourceName: 'permissions',
    action: 'ALLOW',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    roleName: 'root',
  },
  {
    resourceName: 'roles',
    action: 'ALLOW',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    roleName: 'root',
  },
  {
    resourceName: 'users',
    action: 'ALLOW',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    roleName: 'root',
  },
  {
    resourceName: 'roles',
    action: 'ALLOW',
    methods: ['GET'],
    roleName: 'admin',
  },
  {
    resourceName: 'users',
    action: 'ALLOW',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    roleName: 'admin',
  },
  {
    resourceName: 'users',
    action: 'ALLOW',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    roleName: 'user',
  },
]
