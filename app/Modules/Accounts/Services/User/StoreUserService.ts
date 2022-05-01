import { inject, injectable } from 'tsyringe'

import { IUser } from 'App/Modules/Accounts/Interfaces/IUser'
import { ModelObject } from '@ioc:Adonis/Lucid/Orm'

import BadRequestException from 'App/Shared/Exceptions/BadRequestException'

import DTOs = IUser.DTOs

@injectable()
export class StoreUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUser.Repository
  ) {}

  public async run(data: DTOs.Store): Promise<ModelObject> {
    const { roles, ...userDTO } = data
    if (!roles.length) throw new BadRequestException('User cannot be added without a role')

    const user = await this.usersRepository.store(userDTO)
    await this.usersRepository.attachRoles(user, roles)

    return user.toJSON()
  }
}
