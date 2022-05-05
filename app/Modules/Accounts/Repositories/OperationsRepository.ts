import BaseRepository from 'App/Shared/Repositories/BaseRepository'

import { IOperation } from 'App/Modules/Accounts/Interfaces/IOperation'
import Operation from 'App/Modules/Accounts/Models/Operation'

export default class OperationsRepository
  extends BaseRepository<typeof Operation>
  implements IOperation.Repository
{
  constructor() {
    super(Operation)
  }
}
