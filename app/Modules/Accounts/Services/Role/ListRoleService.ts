import { inject, injectable } from 'tsyringe'

import { IRole } from 'App/Modules/Accounts/Interfaces/IRole'

import DTOs = IRole.DTOs

@injectable()
export class ListRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRole.Repository
  ) {}

  public async run({ page = 1, perPage = 10, search = '' }: DTOs.List) {
    return this.rolesRepository.listWithPagination({
      page,
      perPage,
      order: {
        column: 'slug',
      },
      scope: (scope) => {
        scope.searchQueryScope(search)
      },
    })
  }
}
