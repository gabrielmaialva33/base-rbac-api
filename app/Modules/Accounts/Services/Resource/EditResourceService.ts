import { inject, injectable } from 'tsyringe'

import { IResource } from 'App/Modules/Accounts/Interfaces/IResource'
import Resource from 'App/Modules/Accounts/Models/Resource'

import NotFoundException from 'App/Shared/Exceptions/NotFoundException'
import BadRequestException from 'App/Shared/Exceptions/BadRequestException'

import DTOs = IResource.DTOs

@injectable()
export class EditResourceService {
  constructor(
    @inject('ResourcesRepository')
    private resourcesRepository: IResource.Repository
  ) {}

  public async run(resourceId: string, data: DTOs.Edit): Promise<Resource> {
    const resource = await this.resourcesRepository.findBy('id', resourceId)
    if (!resource) throw new NotFoundException('Resource not found or not available.')
    if (!resource.deletable) throw new BadRequestException('Can not update resource.')

    resource.merge(data)
    await this.resourcesRepository.save(resource)

    return resource.refresh()
  }
}
