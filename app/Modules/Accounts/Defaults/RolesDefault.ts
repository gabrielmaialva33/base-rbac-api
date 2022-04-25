import Role from 'App/Modules/Accounts/Models/Role'
import { ModelType } from 'App/Shared/Interfaces/BaseInterface'

export const RolesDefault: Array<ModelType<typeof Role>> = [
  {
    slug: 'Root',
    name: 'root',
    description: 'a root user system',
    is_active: true,
    deletable: false,
  },
  {
    slug: 'Admin',
    name: 'admin',
    description: 'a admin user system',
    is_active: true,
    deletable: false,
  },
  {
    slug: 'User',
    name: 'user',
    description: 'a common user system',
    is_active: true,
    deletable: false,
  },
  {
    slug: 'Guest',
    name: 'guest',
    description: 'a common guest user system',
    is_active: true,
    deletable: false,
  },
]
