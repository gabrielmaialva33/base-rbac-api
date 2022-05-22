import { inject, injectable } from 'tsyringe'

import { IUser } from 'App/Modules/Accounts/Interfaces/IUser'

import DTOs = IUser.DTOs

@injectable()
export class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUser.Repository
  ) {}

  public async run({ page = 1, perPage = 10, search = '' }: DTOs.List) {
    return this.usersRepository.listWithPagination({
      page,
      perPage,
      scopes: (scopes) => {
        scopes.searchQueryScope(search)
      },
    })
  }
}
