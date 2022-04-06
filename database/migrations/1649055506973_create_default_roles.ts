import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { container } from 'tsyringe'
import DefaultRolesService from 'App/Modules/User/Services/Role/DefaultRolesService'

export default class CreateDefaultRoles extends BaseSchema {
  public async up() {
    const createRoles = container.resolve(DefaultRolesService)
    await createRoles.run()
  }

  public async down() {
    this.db.rawQuery('truncate roles;').knexQuery
  }
}
