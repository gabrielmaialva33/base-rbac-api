import Role from 'App/Modules/User/Models/Role'
import { ModelType } from 'App/Shared/Interfaces/BaseInterface'

export const RolesDefaults: Array<ModelType<typeof Role>> = [
  {
    slug: 'Root',
    name: 'root',
    description: 'a root user system',
    is_active: true,
    is_deletable: false,
  },
  {
    slug: 'Admin',
    name: 'admin',
    description: 'a admin user system',
    is_active: true,
    is_deletable: false,
  },
  {
    slug: 'User',
    name: 'user',
    description: 'a common user system',
    is_active: true,
    is_deletable: false,
  },
  {
    slug: 'Guest',
    name: 'guest',
    description: 'a common guest user system',
    is_active: true,
    is_deletable: false,
  },
]
