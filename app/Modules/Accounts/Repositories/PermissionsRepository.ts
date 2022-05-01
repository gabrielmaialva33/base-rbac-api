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
}
