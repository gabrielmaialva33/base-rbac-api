import { inject, injectable } from 'tsyringe'

import { IRole } from 'App/Modules/Accounts/Interfaces/IRole'
import { IPermission } from 'App/Modules/Accounts/Interfaces/IPermission'
import { IOperation } from 'App/Modules/Accounts/Interfaces/IOperation'

import { PermissionsDefault } from 'App/Modules/Accounts/Defaults/PermissionsDefault'
import { IResource } from 'App/Modules/Accounts/Interfaces/IResource'

@injectable()
export class DefaultRootPermissionService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRole.Repository,
    @inject('PermissionsRepository')
    private permissionsRepository: IPermission.Repository,
    @inject('ResourcesRepository')
    private resourcesRepository: IResource.Repository,
    @inject('OperationsRepository')
    private operationsRepository: IOperation.Repository
  ) {}

  public async run(): Promise<void> {
    for (const permission of PermissionsDefault) {
      const { resourceName, action, methods, roleName } = permission

      const resource = await this.resourcesRepository.findBy('name', resourceName)
      if (resource) {
        const role = await this.rolesRepository.findBy('name', roleName)
        if (role) {
          const permission = await this.permissionsRepository.store({
            resource_id: resource.id,
            action,
          })

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
}
