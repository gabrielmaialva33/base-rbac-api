import { ModelType } from 'App/Shared/Interfaces/BaseInterface'
import Operation from 'App/Modules/Accounts/Models/Operation'

export const OperationsDefault: Array<ModelType<typeof Operation>> = [
  {
    slug: 'Read',
    name: 'read',
    method: 'GET',
  },
  {
    slug: 'Write',
    name: 'write',
    method: 'POST',
  },
  {
    slug: 'Update',
    name: 'update',
    method: 'PUT',
  },
  {
    slug: 'Edit',
    name: 'edit',
    method: 'PATCH',
  },
  {
    slug: 'Delete',
    name: 'delete',
    method: 'DELETE',
  },
]
