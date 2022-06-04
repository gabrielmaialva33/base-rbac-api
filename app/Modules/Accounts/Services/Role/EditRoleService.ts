import { inject, injectable } from 'tsyringe'

import { IRole } from 'App/Modules/Accounts/Interfaces/IRole'
import Role from 'App/Modules/Accounts/Models/Role'

import NotFoundException from 'App/Shared/Exceptions/NotFoundException'
import BadRequestException from 'App/Shared/Exceptions/BadRequestException'

import DTOs = IRole.DTOs

@injectable()
export class EditRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRole.Repository
  ) {}

  public async run(roleId: string, data: DTOs.Edit): Promise<Role> {
    const role = await this.rolesRepository.findBy('id', roleId)
    if (!role) throw new NotFoundException('Role not found or not available.')
    if (!role.deletable) throw new BadRequestException('Can not update role.')

    const { permissions, ...roleDto } = data

    role.merge(roleDto)
    await this.rolesRepository.save(role)

    if (permissions.length > 0) await this.rolesRepository.syncPermissions(role, permissions)

    return role.refresh()
  }
}
