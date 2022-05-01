import { inject, injectable } from 'tsyringe'

import { IRole } from 'App/Modules/Accounts/Interfaces/IRole'

import DTOs = IRole.DTOs

@injectable()
export class StoreRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRole.Repository
  ) {}

  public async run(data: DTOs.Store) {
    return this.rolesRepository.store(data)
  }
}
