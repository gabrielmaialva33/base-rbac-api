import { inject, injectable } from 'tsyringe'
import { DateTime } from 'luxon'

import { IRole } from 'App/Modules/User/Interfaces/RoleInterface'

import NotFoundException from 'App/Shared/Exceptions/NotFoundException'
import BadRequestException from 'App/Shared/Exceptions/BadRequestException'

@injectable()
export class DeleteRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRole.Repository
  ) {}

  public async run(roleId: string): Promise<void> {
    const role = await this.rolesRepository.findBy('id', roleId)
    if (!role) throw new NotFoundException('Role not found or not available.')
    if (!role.is_deletable) throw new BadRequestException('Role is not deletable.')

    role.merge({
      is_active: false,
      is_deleted: true,
      deleted_at: DateTime.now(),
    })

    await this.rolesRepository.update(role)
  }
}
