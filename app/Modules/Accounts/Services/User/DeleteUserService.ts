import { injectable, inject } from 'tsyringe'
import { DateTime } from 'luxon'

import { IUser } from 'App/Modules/Accounts/Interfaces/IUser'

import NotFoundException from 'App/Shared/Exceptions/NotFoundException'

@injectable()
export class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUser.Repository
  ) {}

  public async run(userId): Promise<void> {
    const user = await this.usersRepository.findBy('id', userId)
    if (!user) throw new NotFoundException('User not found or not available.')

    user.merge({
      email: `deleted:${user.email}`,
      username: `deleted:${user.username}`,
      is_deleted: true,
      deleted_at: DateTime.now(),
    })
    await this.usersRepository.save(user)
  }
}
