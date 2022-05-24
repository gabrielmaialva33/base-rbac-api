import { inject, injectable } from 'tsyringe'
import { DateTime } from 'luxon'

import { IPermission } from 'App/Modules/Accounts/Interfaces/IPermission'

import NotFoundException from 'App/Shared/Exceptions/NotFoundException'

@injectable()
export class DeletePermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermission.Repository
  ) {}

  public async run(permissionId: string): Promise<void> {
    const permission = await this.permissionsRepository.findBy('id', permissionId)
    if (!permission) throw new NotFoundException('Permission not found or not available.')

    permission.merge({
      is_deleted: true,
      deleted_at: DateTime.now(),
    })
    await this.permissionsRepository.save(permission)
  }
}
