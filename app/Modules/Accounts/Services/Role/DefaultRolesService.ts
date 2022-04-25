import { inject, injectable } from 'tsyringe'
import crypto from 'crypto'
import Hash from '@ioc:Adonis/Core/Hash'

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
      const hash = crypto.randomBytes(4).toString('hex').toLowerCase()
      const name = `${RolesDefault[i].name}-${hash}`.toLowerCase()
      const token = await Hash.make(hash)

      await this.rolesRepository.findOrStore(
        {
          name,
        },
        { ...RolesDefault[i], token, name }
      )
    }
  }
}
