import { inject, injectable } from 'tsyringe'

import { IResource } from 'App/Modules/Accounts/Interfaces/IResource'
import Resource from 'App/Modules/Accounts/Models/Resource'

import NotFoundException from 'App/Shared/Exceptions/NotFoundException'

@injectable()
export class GetResourceService {
  constructor(
    @inject('ResourcesRepository')
    private resourcesRepository: IResource.Repository
  ) {}

  public async run(resourceId: string): Promise<Resource> {
    const resource = await this.resourcesRepository.findBy('id', resourceId)
    if (!resource) throw new NotFoundException('Resource not found or not available.')

    return resource
  }
}
