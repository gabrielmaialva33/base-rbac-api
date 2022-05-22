import { inject, injectable } from 'tsyringe'
import HttpContext from '@ioc:Adonis/Core/HttpContext'

import { IRole } from 'App/Modules/Accounts/Interfaces/IRole'

import DTOs = IRole.DTOs
import NotFoundException from 'App/Shared/Exceptions/NotFoundException'

@injectable()
export class ListRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRole.Repository
  ) {}

  public async run({ page = 1, perPage = 10, search = '' }: DTOs.List) {
    const request = HttpContext.get()!
    const user = request.auth.user
    if (!user) throw new NotFoundException('User not found or not available.')

    return this.rolesRepository.listWithPagination({
      page,
      perPage,
      scopes: (scopes) => {
        scopes.onlyAdminContext()
        scopes.searchQueryScope(search)
        scopes.loadPermissions()
      },
      orders: [
        {
          column: 'slug',
          direction: 'asc',
        },
      ],
    })
  }
}
