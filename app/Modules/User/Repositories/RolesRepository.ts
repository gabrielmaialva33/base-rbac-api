import BaseRepository from 'App/Shared/Repositories/BaseRepository'

import { IRole } from 'App/Modules/User/Interfaces/RoleInterface'
import Role from 'App/Modules/User/Models/Role'

export default class RolesRepository
  extends BaseRepository<typeof Role>
  implements IRole.Repository
{
  constructor() {
    super(Role)
  }
}
