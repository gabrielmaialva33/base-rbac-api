import { inject, injectable } from 'tsyringe'

import { IRole } from 'App/Modules/Accounts/Interfaces/IRole'
import NotFoundException from 'App/Shared/Exceptions/NotFoundException'

@injectable()
export class GetRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRole.Repository
  ) {}

  public async run(roleId) {
    const role = await this.rolesRepository.findBy('id', roleId)
    if (!role) throw new NotFoundException('Role not found or not available.')

    await role.load('permissions')

    return role
  }
}
