import { ModelType } from 'App/Shared/Interfaces/BaseInterface'

import Permission from 'App/Modules/Accounts/Models/Permission'

type DefaultType = ModelType<typeof Permission> & {
  roleName: string
  methods: Array<string>
}

export const PermissionsDefault: Array<DefaultType> = [
  {
    resource: 'roles',
    action: 'ALLOW',
    roleName: 'root',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  },
  {
    resource: 'operations',
    action: 'ALLOW',
    roleName: 'root',
    methods: ['GET'],
  },
]
