import { inject, injectable } from 'tsyringe'

import { IRole } from 'App/Modules/User/Interfaces/RoleInterface'
import Role from 'App/Modules/User/Models/Role'

@injectable()
export class CreateRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRole.Repository
  ) {}

  public async run(data: IRole.DTO.Store): Promise<Role> {
    return this.rolesRepository.store<typeof Role>(data)
  }
}
