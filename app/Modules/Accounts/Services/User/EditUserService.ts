import { inject, injectable } from 'tsyringe'
import { ModelObject } from '@ioc:Adonis/Lucid/Orm'

import { IUser } from 'App/Modules/Accounts/Interfaces/IUser'

import NotFoundException from 'App/Shared/Exceptions/NotFoundException'

import DTOs = IUser.DTOs

@injectable()
export class EditUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUser.Repository
  ) {}

  public async run(userId: string, data: DTOs.Edit): Promise<ModelObject> {
    const user = await this.usersRepository.findBy('id', userId)
    if (!user) throw new NotFoundException('User not found or not available.')

    const { roles, ...userDTO } = data

    user.merge(userDTO)
    await this.usersRepository.save(user)

    if (roles) await this.usersRepository.syncRoles(user, roles)

    return user.toJSON()
  }
}
