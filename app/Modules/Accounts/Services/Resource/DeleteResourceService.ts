import { inject, injectable } from 'tsyringe'
import { DateTime } from 'luxon'

import { IResource } from 'App/Modules/Accounts/Interfaces/IResource'
import Resource from 'App/Modules/Accounts/Models/Resource'

import NotFoundException from 'App/Shared/Exceptions/NotFoundException'
import BadRequestException from 'App/Shared/Exceptions/BadRequestException'

@injectable()
export class DeleteResourceService {
  constructor(
    @inject('ResourcesRepository')
    private resourcesRepository: IResource.Repository
  ) {}

  public async run(resourceId: string): Promise<Resource> {
    const resource = await this.resourcesRepository.findBy('id', resourceId)
    if (!resource) throw new NotFoundException('Resource not found or not available.')
    if (!resource.deletable) throw new BadRequestException('Resource is not deletable.')

    resource.merge({
      is_deleted: true,
      deleted_at: DateTime.now(),
    })
    await this.resourcesRepository.save(resource)

    return resource
  }
}
