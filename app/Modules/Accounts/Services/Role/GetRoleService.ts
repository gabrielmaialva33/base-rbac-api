import { inject, injectable } from 'tsyringe'

import { IRole } from 'App/Modules/Accounts/Interfaces/IRole'
import Role from 'App/Modules/Accounts/Models/Role'

import NotFoundException from 'App/Shared/Exceptions/NotFoundException'

@injectable()
export class GetRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRole.Repository
  ) {}

  public async run(roleId): Promise<Role> {
    const role = await this.rolesRepository.findBy('id', roleId, {
      scopes: (scopes) => {
        scopes.loadPermissionsAndOperations()
      },
    })
    if (!role) throw new NotFoundException('Role not found or not available.')

    return role
  }
}
