import { ModelType } from 'App/Shared/Interfaces/BaseInterface'

import Permission from 'App/Modules/Accounts/Models/Permission'

type DefaultType = ModelType<typeof Permission> & {
  methods: Array<string>
  roleName: string
}

export const PermissionsDefault: Array<DefaultType> = [
  {
    resource: 'roles',
    action: 'ALLOW',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    roleName: 'root',
  },
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
    roleName: 'admin',
  },
  {
    resource: 'operations',
    action: 'ALLOW',
    methods: ['GET'],
    roleName: 'admin',
  },
]
