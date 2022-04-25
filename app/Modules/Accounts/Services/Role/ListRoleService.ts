import { inject, injectable } from 'tsyringe'

import { IRole } from 'App/Modules/Accounts/Interfaces/IRole'

@injectable()
export class ListRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRole.Repository
  ) {}

  public async run() {
    return this.rolesRepository.list({
      order: {
        column: 'slug',
      },
    })
  }
}
