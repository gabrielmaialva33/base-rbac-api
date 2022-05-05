import { inject, injectable } from 'tsyringe'

import { IOperation } from 'App/Modules/Accounts/Interfaces/IOperation'
import Operation from 'App/Modules/Accounts/Models/Operation'

@injectable()
export class ListOperationService {
  constructor(
    @inject('OperationsRepository')
    private operationsRepository: IOperation.Repository
  ) {}

  public async run(): Promise<Array<Operation>> {
    return this.operationsRepository.list({
      order: {
        column: 'slug',
      },
    })
  }
}
