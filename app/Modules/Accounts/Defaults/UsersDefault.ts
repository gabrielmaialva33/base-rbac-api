import { ModelType } from 'App/Shared/Interfaces/BaseInterface'
import User from 'App/Modules/Accounts/Models/User'

type DefaultType = ModelType<typeof User> & { role: string }

export const UsersDefault: Array<DefaultType> = [
  {
    first_name: 'Root',
    last_name: 'User',
    username: 'root',
    email: 'root@rbac.com',
    password: 'rbac@2022',
    role: 'root',
  },
  {
    first_name: 'Admin',
    last_name: 'User',
    username: 'admin',
    email: 'admin@rbac.com',
    password: 'rbac@2022',
    role: 'admin',
  },
  {
    first_name: 'Gabriel',
    last_name: 'Maia',
    username: 'maia',
    email: 'gabriel.maia@rbac.com',
    password: 'rbac@2022',
    role: 'user',
  },
]
