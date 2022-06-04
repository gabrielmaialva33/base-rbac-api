import { inject, injectable } from 'tsyringe'

import Permission from 'App/Modules/Accounts/Models/Permission'
import { IPermission } from 'App/Modules/Accounts/Interfaces/IPermission'

import DTOs = IPermission.DTOs
import NotFoundException from 'App/Shared/Exceptions/NotFoundException'

@injectable()
export class EditPermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermission.Repository
  ) {}

  public async run(permissionId: string, data: DTOs.Edit): Promise<Permission> {
    const permission = await this.permissionsRepository.findBy('id', permissionId)
    if (!permission) throw new NotFoundException('Permission not found or not available.')

    const { operations, ...permissionDto } = data

    permission.merge(permissionDto)
    await this.permissionsRepository.save(permission)

    if (operations) await this.permissionsRepository.syncOperations(permission, operations)

    return permission.refresh()
  }
}
