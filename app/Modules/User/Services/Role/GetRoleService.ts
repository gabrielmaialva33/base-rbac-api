import { inject, injectable } from 'tsyringe'

import { IRole } from 'App/Modules/User/Interfaces/RoleInterface'
import Role from 'App/Modules/User/Models/Role'

import NotFoundException from 'App/Shared/Exceptions/NotFoundException'

@injectable()
export class GetRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRole.Repository
  ) {}

  public async run(roleId: string): Promise<Role> {
    const role = await this.rolesRepository.findBy<typeof Role>('id', roleId)
    if (!role) throw new NotFoundException('Role not found or not available.')

    return role
  }
}
