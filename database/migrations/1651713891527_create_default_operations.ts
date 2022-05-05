import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { container } from 'tsyringe'

import { DefaultOperationService } from 'App/Modules/Accounts/Services/Operation'

export default class CreateDefaultOperations extends BaseSchema {
  public async up() {
    const storeOperations = container.resolve(DefaultOperationService)
    await storeOperations.run()
  }

  public async down() {
    this.schema.raw('truncate table operations restart identity cascade;')
  }
}
