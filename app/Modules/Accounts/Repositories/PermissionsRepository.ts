import BaseRepository from 'App/Shared/Repositories/BaseRepository'

import { IPermission } from 'App/Modules/Accounts/Interfaces/IPermission'
import Permission from 'App/Modules/Accounts/Models/Permission'

export default class PermissionsRepository
  extends BaseRepository<typeof Permission>
  implements IPermission.Repository
{
  constructor() {
    super(Permission)
  }

  public async attachOperations(
    permission: Permission,
    ids: Array<string | number>
  ): Promise<void> {
    return permission.related('operations').attach(ids)
  }

  public async syncOperations(permission: Permission, ids: Array<string | number>): Promise<void> {
    return permission.related('operations').sync(ids)
  }
}
