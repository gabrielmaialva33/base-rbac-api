import { ModelType } from 'App/Shared/Interfaces/BaseInterface'
import Resource from 'App/Modules/Accounts/Models/Resource'

export const ResourcesDefault: Array<ModelType<typeof Resource>> = [
  {
    name: 'operations',
    description: 'operations resource',
    deletable: false,
  },
  {
    name: 'resources',
    description: 'resources resource',
    deletable: false,
  },
  {
    name: 'permissions',
    description: 'permissions resource',
    deletable: false,
  },
  {
    name: 'roles',
    description: 'roles resource',
    deletable: false,
  },
  {
    name: 'users',
    description: 'users resource',
    deletable: false,
  },
]
