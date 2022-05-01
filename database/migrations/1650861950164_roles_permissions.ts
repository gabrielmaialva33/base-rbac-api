import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Logger from '@ioc:Adonis/Core/Logger'

export default class RolesPermissions extends BaseSchema {
  protected tableName = 'roles_permissions'

  public async up() {
    if (!(await this.schema.hasTable(this.tableName)))
      this.schema.createTable(this.tableName, (table) => {
        table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

        table
          .uuid('role_id')
          .references('id')
          .inTable('roles')
          .notNullable()
          .onDelete('CASCADE')
          .onUpdate('CASCADE')

        table
          .uuid('permission_id')
          .references('id')
          .inTable('permissions')
          .notNullable()
          .onDelete('CASCADE')
          .onUpdate('CASCADE')

        table.timestamp('created_at', { useTz: true }).defaultTo('now()')
        table.timestamp('updated_at', { useTz: true }).defaultTo('now()')
      })
    else Logger.info('RolesPermissions migration already running')
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
