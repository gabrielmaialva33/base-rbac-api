import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Logger from '@ioc:Adonis/Core/Logger'

export default class PermissionsOperations extends BaseSchema {
  protected tableName = 'permissions_operations'

  public async up() {
    if (!(await this.schema.hasTable(this.tableName)))
      this.schema.createTable(this.tableName, (table) => {
        table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

        table
          .uuid('permission_id')
          .references('id')
          .inTable('permissions')
          .notNullable()
          .onDelete('CASCADE')
          .onUpdate('CASCADE')

        table
          .uuid('operation_id')
          .references('id')
          .inTable('operations')
          .notNullable()
          .onDelete('CASCADE')
          .onUpdate('CASCADE')

        table.timestamp('created_at', { useTz: true }).defaultTo('now()')
        table.timestamp('updated_at', { useTz: true }).defaultTo('now()')
      })
    else Logger.info('PermissionsOperations migration already running')
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
