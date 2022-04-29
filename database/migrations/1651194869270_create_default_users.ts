import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { container } from 'tsyringe'

import { DefaultUserService } from 'App/Modules/Accounts/Services/User'

export default class CreateDefaultUsers extends BaseSchema {
  public async up() {
    const storeUsers = container.resolve(DefaultUserService)
    await storeUsers.run()
  }

  public async down() {
    this.db.rawQuery('truncate users;').knexQuery
  }
}
