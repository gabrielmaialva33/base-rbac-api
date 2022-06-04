import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { container } from 'tsyringe'

import { DefaultResourceService } from 'App/Modules/Accounts/Services/Resource'

export default class extends BaseSchema {
  public async up() {
    const storeResources = container.resolve(DefaultResourceService)
    await storeResources.run()
  }

  public async down() {
    this.schema.raw('truncate table resources restart identity cascade;')
  }
}
