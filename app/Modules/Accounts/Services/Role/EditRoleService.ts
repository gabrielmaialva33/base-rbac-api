import { inject, injectable } from 'tsyringe'

import { IRole } from 'App/Modules/Accounts/Interfaces/IRole'

import NotFoundException from 'App/Shared/Exceptions/NotFoundException'

import DTOs = IRole.DTOs
import BadRequestException from 'App/Shared/Exceptions/BadRequestException'

@injectable()
export class EditRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRole.Repository
  ) {}

  public async run(roleId: string, data: DTOs.Edit) {
    const role = await this.rolesRepository.findBy('id', roleId)
    if (!role) throw new NotFoundException('Role not found or not available.')
    if (!role.deletable) throw new BadRequestException('Can not update role.')

    role.merge(data)
    await this.rolesRepository.save(role)

    return role
  }
}
