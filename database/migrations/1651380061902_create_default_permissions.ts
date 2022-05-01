import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { container } from 'tsyringe'

import { DefaultRootPermissionService } from 'App/Modules/Accounts/Services/Permission'

export default class CreateDefaultPermissions extends BaseSchema {
  public async up() {
    const storeRootPermissions = container.resolve(DefaultRootPermissionService)
    await storeRootPermissions.run()
  }

  public async down() {
    this.schema.raw('truncate table permissions restart identity cascade;')
  }
}
