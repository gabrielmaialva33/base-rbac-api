import { inject, injectable } from 'tsyringe'

import { IPermission } from 'App/Modules/Accounts/Interfaces/IPermission'

import DTOs = IPermission.DTOs

@injectable()
export class ListPermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermission.Repository
  ) {}

  public async run({ page = 1, perPage = 10, search = '' }: DTOs.List) {
    return this.permissionsRepository.listWithPagination({
      page,
      perPage,
      scopes: (scopes) => scopes.searchQueryScope(search),
    })
  }
}
