import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Logger from '@ioc:Adonis/Core/Logger'

export default class Permissions extends BaseSchema {
  protected tableName = 'permissions'

  public async up() {
    this.schema.raw('drop type if exists method_type;')
    this.schema.raw('drop type if exists action_type;')

    if (!(await this.schema.hasTable(this.tableName)))
      this.schema.createTable(this.tableName, (table) => {
        table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

        table
          .uuid('resource_id')
          .references('id')
          .inTable('resources')
          .notNullable()
          .onDelete('CASCADE')
          .onUpdate('CASCADE')

        table.enu('action', ['ALLOW', 'DENY'], {
          useNative: true,
          enumName: 'action_type',
          existingType: false,
        })

        table.boolean('deletable').notNullable().defaultTo(true)
        table.boolean('is_deleted').notNullable().defaultTo(false)

        table.timestamp('created_at', { useTz: true })
        table.timestamp('updated_at', { useTz: true })
        table.timestamp('deleted_at', { useTz: true }).defaultTo(null)
      })
    else Logger.info('Permissions migration already running')
  }

  public async down() {
    this.schema.dropTable(this.tableName)
    this.schema.raw('drop type if exists method_type;')
    this.schema.raw('drop type if exists action_type;')
  }
}
