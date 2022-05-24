import { inject, injectable } from 'tsyringe'

import { IPermission } from 'App/Modules/Accounts/Interfaces/IPermission'
import Permission from 'App/Modules/Accounts/Models/Permission'
import NotFoundException from 'App/Shared/Exceptions/NotFoundException'

@injectable()
export class GetPermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermission.Repository
  ) {}

  public async run(permissionId: string): Promise<Permission> {
    const permission = await this.permissionsRepository.findBy('id', permissionId)
    if (!permission) throw new NotFoundException('Permission not found or not available.')

    return permission
  }
}
