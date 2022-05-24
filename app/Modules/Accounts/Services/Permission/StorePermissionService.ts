import { inject, injectable } from 'tsyringe'

import { IPermission } from 'App/Modules/Accounts/Interfaces/IPermission'
import Permission from 'App/Modules/Accounts/Models/Permission'

import DTOs = IPermission.DTOs

@injectable()
export class StorePermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermission.Repository
  ) {}

  public async run(data: DTOs.Store): Promise<Permission> {
    const { resource, action, operations } = data

    const permission = await this.permissionsRepository.store({ resource, action })
    await this.permissionsRepository.attachOperations(permission, operations)

    if (operations) await this.permissionsRepository.attachOperations(permission, operations)

    return permission
  }
}
