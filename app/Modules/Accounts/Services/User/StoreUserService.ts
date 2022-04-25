import { inject, injectable } from 'tsyringe'

import { IUser } from 'App/Modules/Accounts/Interfaces/IUser'
import { ModelObject } from '@ioc:Adonis/Lucid/Orm'

@injectable()
export class StoreUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUser.Repository
  ) {}

  public async run(data: IUser.DTOs.Store): Promise<ModelObject> {
    return this.usersRepository.store(data).then((user) => user.toJSON())
  }
}
