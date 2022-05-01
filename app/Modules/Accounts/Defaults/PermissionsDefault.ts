import { ModelType } from 'App/Shared/Interfaces/BaseInterface'

import Permission from 'App/Modules/Accounts/Models/Permission'

type DefaultType = ModelType<typeof Permission>

export const RootPermissions: Array<DefaultType> = [
  {
    slug: 'Read',
    name: 'read',
    method: 'GET',
    resource: 'roles',
    action: 'ALLOW',
  },
  {
    slug: 'Write',
    name: 'write',
    method: 'POST',
    resource: 'roles',
    action: 'ALLOW',
  },
  {
    slug: 'Edit',
    name: 'edit',
    method: 'PUT',
    resource: 'roles',
    action: 'ALLOW',
  },
  {
    slug: 'Delete',
    name: 'delete',
    method: 'DELETE',
    resource: 'roles',
    action: 'ALLOW',
  },
]

export const PermissionsDefault: Array<DefaultType> = []
