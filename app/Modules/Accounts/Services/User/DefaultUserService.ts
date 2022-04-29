import { inject, injectable } from 'tsyringe'

import { IUser } from 'App/Modules/Accounts/Interfaces/IUser'
import { IRole } from 'App/Modules/Accounts/Interfaces/IRole'
import { UsersDefault } from 'App/Modules/Accounts/Defaults/UsersDefault'

@injectable()
export class DefaultUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUser.Repository,
    @inject('RolesRepository') private rolesRepository: IRole.Repository
  ) {}

  public async run(): Promise<void> {
    for (let i = 0; i < UsersDefault.length; i++) {
      const user = await this.usersRepository.findOrStore(
        {
          username: UsersDefault[i].username,
          email: UsersDefault[i].email,
        },
        {
          first_name: UsersDefault[i].first_name,
          last_name: UsersDefault[i].last_name,
          username: UsersDefault[i].username,
          email: UsersDefault[i].email,
          password: UsersDefault[i].password,
        }
      )
      const role = await this.rolesRepository.pluckBy('id', {
        like: { column: 'name', match: UsersDefault[i].role },
      })

      await user.related('roles').sync(role)
    }
  }
}
