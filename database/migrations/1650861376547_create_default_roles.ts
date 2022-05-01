import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { container } from 'tsyringe'

import DefaultRolesService from 'App/Modules/Accounts/Services/Role/DefaultRolesService'

export default class CreateDefaultRoles extends BaseSchema {
  public async up() {
    const storeRoles = container.resolve(DefaultRolesService)
    await storeRoles.run()
  }

  public async down() {
    this.schema.raw('truncate table roles restart identity cascade;')
  }
}
