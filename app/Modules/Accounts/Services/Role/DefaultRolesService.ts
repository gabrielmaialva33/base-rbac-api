import { inject, injectable } from 'tsyringe'

import { IRole } from 'App/Modules/Accounts/Interfaces/IRole'
import { RolesDefault } from 'App/Modules/Accounts/Defaults/RolesDefault'

@injectable()
export default class DefaultRolesService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRole.Repository
  ) {}

  public async run(): Promise<void> {
    for (let i = 0; i < RolesDefault.length; i++) {
      await this.rolesRepository.findOrStore({ name: RolesDefault[i].name }, RolesDefault[i])
    }
  }
}
