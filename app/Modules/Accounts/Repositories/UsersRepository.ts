import BaseRepository from 'App/Shared/Repositories/BaseRepository'
import User from 'App/Modules/Accounts/Models/User'

export default class UsersRepository extends BaseRepository<typeof User> {
  constructor() {
    super(User)
  }
}
