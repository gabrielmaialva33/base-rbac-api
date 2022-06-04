import { inject, injectable } from 'tsyringe'

import { IResource } from 'App/Modules/Accounts/Interfaces/IResource'
import Resource from 'App/Modules/Accounts/Models/Resource'

import DTOs = IResource.DTOs

@injectable()
export class StoreResourceService {
  constructor(
    @inject('ResourcesRepository')
    private resourcesRepository: IResource.Repository
  ) {}

  public async run(data: DTOs.Store): Promise<Resource> {
    return this.resourcesRepository.store(data)
  }
}
