import { inject, injectable } from 'tsyringe'

import User from 'App/Modules/User/Models/User'
import { IUser } from 'App/Modules/User/Interfaces/UserInterface'

import DTO = IUser.DTO

@injectable()
export class StoreUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUser.Repository
  ) {}

  public async run(data: DTO.Store): Promise<User> {
    return this.usersRepository.store(data)
  }
}
