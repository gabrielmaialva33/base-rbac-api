import { inject, injectable } from 'tsyringe'
import crypto from 'crypto'
import Hash from '@ioc:Adonis/Core/Hash'
import { IRole } from 'App/Modules/Accounts/Interfaces/IRole'

import DTOs = IRole.DTOs

@injectable()
export class StoreRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRole.Repository
  ) {}

  public async run(data: DTOs.Store) {
    const hash = crypto.randomBytes(4).toString('hex').toLowerCase()
    const name = `${data.slug}-${hash}`.toLowerCase()
    const token = await Hash.make(hash)

    return this.rolesRepository.store({ ...data, name, token })
  }
}
