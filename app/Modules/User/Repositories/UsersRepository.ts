import User from 'App/Modules/User/Models/User'
import { IUser } from 'App/Modules/User/Interfaces/UserInterface'
import BaseRepository from 'App/Shared/Repositories/BaseRepository'

export default class UsersRepository
  extends BaseRepository<typeof User>
  implements IUser.Repository
{
  constructor() {
    super(User)
  }
}
