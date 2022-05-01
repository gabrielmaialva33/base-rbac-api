import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Logger from '@ioc:Adonis/Core/Logger'

export default class Methods extends BaseSchema {
  protected tableName = 'methods'

  public async up() {
    if (!(await this.schema.hasTable(this.tableName)))
      this.schema.createTable(this.tableName, (table) => {
        table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

        table.string('name', 10).notNullable().unique()

        table.boolean('is_deleted').notNullable().defaultTo(false)
        table.timestamp('created_at', { useTz: true })
        table.timestamp('updated_at', { useTz: true })
        table.timestamp('deleted_at', { useTz: true }).defaultTo(null)
      })
    else Logger.info('Methods migration already running')
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
