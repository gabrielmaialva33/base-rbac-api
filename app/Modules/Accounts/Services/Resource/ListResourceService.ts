import { inject, injectable } from 'tsyringe'

import { IResource } from 'App/Modules/Accounts/Interfaces/IResource'
import Resource from 'App/Modules/Accounts/Models/Resource'
import { PaginateContractType } from 'App/Shared/Interfaces/BaseInterface'

import DTOs = IResource.DTOs

@injectable()
export class ListResourceService {
  constructor(
    @inject('ResourcesRepository')
    private resourcesRepository: IResource.Repository
  ) {}

  public async run({
    page = 1,
    perPage = 10,
    search = '',
  }: DTOs.List): Promise<PaginateContractType<typeof Resource>> {
    return this.resourcesRepository.listWithPagination({
      page,
      perPage,
      scopes: (scopes) => {
        scopes.searchQueryScope(search)
      },
    })
  }
}
