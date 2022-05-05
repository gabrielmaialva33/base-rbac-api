import { inject, injectable } from 'tsyringe'

import { IRole } from 'App/Modules/Accounts/Interfaces/IRole'
import { IPermission } from 'App/Modules/Accounts/Interfaces/IPermission'
import { IOperation } from 'App/Modules/Accounts/Interfaces/IOperation'

import { RootRolePermissions } from 'App/Modules/Accounts/Defaults/PermissionsDefault'

@injectable()
export class DefaultRootPermissionService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRole.Repository,
    @inject('PermissionsRepository')
    private permissionsRepository: IPermission.Repository,
    @inject('OperationsRepository')
    private operationsRepository: IOperation.Repository
  ) {}

  public async run(): Promise<void> {
    for (let i = 0; i < RootRolePermissions.length; i++) {
      const { resource, action, methods, roleName } = RootRolePermissions[i]
      const role = await this.rolesRepository.findBy('name', roleName)
      if (role) {
        const permission = await this.permissionsRepository.store({ resource, action })

        for (let method of methods) {
          const operation = await this.operationsRepository.findBy('method', method)
          if (operation)
            await this.permissionsRepository.attachOperations(permission, [operation.id])
        }

        await this.rolesRepository.attachPermissions(role, [permission.id])
      }
    }
  }
}
