import BaseRepository from 'App/Shared/Repositories/BaseRepository'

import { IResource } from 'App/Modules/Accounts/Interfaces/IResource'
import Resource from 'App/Modules/Accounts/Models/Resource'

export default class ResourcesRepository
  extends BaseRepository<typeof Resource>
  implements IResource.Repository
{
  constructor() {
    super(Resource)
  }
}
