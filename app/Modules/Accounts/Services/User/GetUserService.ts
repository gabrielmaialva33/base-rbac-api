import { injectable, inject } from 'tsyringe'
import { ModelObject } from '@ioc:Adonis/Lucid/Orm'

import { IUser } from 'App/Modules/Accounts/Interfaces/IUser'

import NotFoundException from 'App/Shared/Exceptions/NotFoundException'

@injectable()
export class GetUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUser.Repository
  ) {}

  public async run(userId: string): Promise<ModelObject> {
    const user = await this.usersRepository.findBy('id', userId)
    if (!user) throw new NotFoundException('User not found or not available.')

    return user.toJSON()
  }
}
