import { inject, injectable } from 'tsyringe'

import { IRole } from 'App/Modules/Accounts/Interfaces/IRole'
import Role from 'App/Modules/Accounts/Models/Role'

import DTOs = IRole.DTOs

@injectable()
export class StoreRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRole.Repository
  ) {}

  public async run(data: DTOs.Store): Promise<Role> {
    const { permissions, ...roleDto } = data

    const role = await this.rolesRepository.store(roleDto)
    if (permissions.length > 0) await this.rolesRepository.attachPermissions(role, permissions)

    return role
  }
}
