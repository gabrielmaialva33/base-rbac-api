import { ModelType } from 'App/Shared/Interfaces/BaseInterface'

import Permission from 'App/Modules/Accounts/Models/Permission'

type DefaultType = ModelType<typeof Permission> & {
  roleName: string
  methods: Array<string>
}

export const RootRolePermissions: Array<DefaultType> = [
  {
    resource: 'roles',
    action: 'ALLOW',
    roleName: 'root',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
]

export const PermissionsDefault: Array<DefaultType> = []
