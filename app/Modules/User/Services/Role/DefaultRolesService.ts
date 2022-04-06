import { inject, injectable } from 'tsyringe'

import { IRole } from 'App/Modules/User/Interfaces/RoleInterface'
import { RolesDefaults } from 'App/Modules/User/Defaults/RolesDefault'

@injectable()
export default class DefaultRolesService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRole.Repository
  ) {}

  public async run(): Promise<void> {
    for (let i = 0; i < RolesDefaults.length; i++) {
      await this.rolesRepository.findOrStore(
        {
          name: RolesDefaults[i].name,
        },
        RolesDefaults[i]
      )
    }
  }
}
