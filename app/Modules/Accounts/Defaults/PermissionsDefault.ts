import { ModelType } from 'App/Shared/Interfaces/BaseInterface'

import Permission from 'App/Modules/Accounts/Models/Permission'

type DefaultType = ModelType<typeof Permission> & {
  methods: Array<string>
  roleName: string
}

export const PermissionsDefault: Array<DefaultType> = [
  {
    resource: 'operations',
    action: 'ALLOW',
    methods: ['GET'],
    roleName: 'root',
  },
  {
    resource: 'roles',
    action: 'ALLOW',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    roleName: 'root',
  },
  {
    resource: 'users',
    action: 'ALLOW',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    roleName: 'root',
  },
  {
    resource: 'operations',
    action: 'ALLOW',
    methods: ['GET'],
    roleName: 'admin',
  },
  {
    resource: 'roles',
    action: 'ALLOW',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    roleName: 'admin',
  },
  {
    resource: 'users',
    action: 'ALLOW',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    roleName: 'admin',
  },
]
