import { inject, injectable } from 'tsyringe'

import { IResource } from 'App/Modules/Accounts/Interfaces/IResource'
import { ResourcesDefault } from 'App/Modules/Accounts/Defaults/ResourcesDefault'

@injectable()
export class DefaultResourceService {
  constructor(
    @inject('ResourcesRepository')
    private resourcesRepository: IResource.Repository
  ) {}

  public async run(): Promise<void> {
    for (const resource of ResourcesDefault)
      await this.resourcesRepository.findOrStore({ name: resource.name }, resource)
  }
}
