import BaseRepository from 'App/Shared/Repositories/BaseRepository'

import { IRole } from 'App/Modules/Accounts/Interfaces/IRole'
import Role from 'App/Modules/Accounts/Models/Role'

export default class RolesRepository
  extends BaseRepository<typeof Role>
  implements IRole.Repository
{
  constructor() {
    super(Role)
  }

  public async attachPermissions(role: Role, ids: Array<string | number>): Promise<void> {
    return role.related('permissions').attach(ids)
  }

  public async syncPermissions(role: Role, ids: Array<string | number>): Promise<void> {
    return role.related('permissions').sync(ids)
  }
}
