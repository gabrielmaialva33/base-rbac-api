import { inject, injectable } from 'tsyringe'

import { IRole } from 'App/Modules/User/Interfaces/RoleInterface'
import Role from 'App/Modules/User/Models/Role'

import NotFoundException from 'App/Shared/Exceptions/NotFoundException'
import BadRequestException from 'App/Shared/Exceptions/BadRequestException'

@injectable()
export class UpdateRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRole.Repository
  ) {}

  public async run(roleId: string, roleDTO: IRole.DTO.Update): Promise<Role> {
    const role = await this.rolesRepository.findBy('id', roleId)
    if (!role) throw new NotFoundException('Role not found or not available.')
    if (!role.is_deletable) throw new BadRequestException('Role is not updatable.')

    role.merge(roleDTO)
    await this.rolesRepository.update(role)

    return role
  }
}
