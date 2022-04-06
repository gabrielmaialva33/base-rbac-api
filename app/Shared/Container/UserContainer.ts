import { container, delay } from 'tsyringe'

/**
 * ------------------------------------------------------
 *  User module container
 * ------------------------------------------------------
 * - registration of all user module repositories
 */
import UsersRepository from 'App/Modules/User/Repositories/UsersRepository'
import { IUser } from 'App/Modules/User/Interfaces/UserInterface'

import { IRole } from 'App/Modules/User/Interfaces/RoleInterface'
import RolesRepository from 'App/Modules/User/Repositories/RolesRepository'

/**
 * User Repository
 */
container.registerSingleton<IUser.Repository>(
  'UsersRepository',
  delay(() => UsersRepository)
)

/**
 * Role Repository
 */
container.registerSingleton<IRole.Repository>(
  'RolesRepository',
  delay(() => RolesRepository)
)
