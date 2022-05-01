import BaseRepository from 'App/Shared/Repositories/BaseRepository'
import { IUser } from 'App/Modules/Accounts/Interfaces/IUser'
import User from 'App/Modules/Accounts/Models/User'

export default class UsersRepository
  extends BaseRepository<typeof User>
  implements IUser.Repository
{
  constructor() {
    super(User)
  }

  public async attachRoles(user: User, ids: Array<string | number>): Promise<void> {
    return user.related('roles').attach(ids)
  }

  public async syncRoles(user: User, ids: Array<string | number>): Promise<void> {
    return user.related('roles').sync(ids)
  }
}
