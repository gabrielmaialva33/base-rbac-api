import { inject, injectable } from 'tsyringe'

import { IOperation } from 'App/Modules/Accounts/Interfaces/IOperation'
import { OperationsDefault } from 'App/Modules/Accounts/Defaults/OperationsDefault'

@injectable()
export class DefaultOperationService {
  constructor(
    @inject('OperationsRepository')
    private operationsRepository: IOperation.Repository
  ) {}

  public async run(): Promise<void> {
    for (let i = 0; i < OperationsDefault.length; i++)
      await this.operationsRepository.findOrStore(
        { name: OperationsDefault[i].name },
        OperationsDefault[i]
      )
  }
}
