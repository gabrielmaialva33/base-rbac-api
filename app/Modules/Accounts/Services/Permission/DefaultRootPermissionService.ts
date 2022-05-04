import { inject, injectable } from 'tsyringe'

import { IPermission } from 'App/Modules/Accounts/Interfaces/IPermission'
import { IRole } from 'App/Modules/Accounts/Interfaces/IRole'

import { RootRolePermissions } from 'App/Modules/Accounts/Defaults/PermissionsDefault'

@injectable()
export class DefaultRootPermissionService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRole.Repository,
    @inject('PermissionsRepository')
    private permissionsRepository: IPermission.Repository
  ) {}

  public async run(): Promise<void> {
    const rootRole = await this.rolesRepository.findBy('name', 'root')
    if (rootRole) {
      const permissions = await this.permissionsRepository.storeMany(RootRolePermissions)
      const ids = permissions.map(({ id }) => id)
      await this.rolesRepository.attachPermissions(rootRole, ids)
    }
  }
}
