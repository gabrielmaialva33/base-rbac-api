import { inject, injectable } from 'tsyringe'

import { IRole } from 'App/Modules/User/Interfaces/RoleInterface'
import Role from 'App/Modules/User/Models/Role'

@injectable()
export class ListRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRole.Repository
  ) {}

  public async run(): Promise<Array<Role>> {
    return this.rolesRepository.index({ where: { is_deleted: false } })
  }
}
