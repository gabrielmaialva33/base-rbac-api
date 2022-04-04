import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { container } from 'tsyringe'
import CreateDefaultRolesService from 'App/Modules/User/Services/Role/CreateDefaultRolesService'

export default class CreateDefaultRoles extends BaseSchema {
  public async up() {
    const createRoles = container.resolve(CreateDefaultRolesService)
    await createRoles.run()
  }

  public async down() {
    this.db.rawQuery('truncate roles;').knexQuery
  }
}
