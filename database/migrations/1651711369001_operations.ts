import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Logger from '@ioc:Adonis/Core/Logger'

export default class Operations extends BaseSchema {
  protected tableName = 'operations'

  public async up() {
    if (!(await this.schema.hasTable(this.tableName)))
      this.schema.createTable(this.tableName, (table) => {
        table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

        table.string('slug', 80).notNullable()
        table.string('name', 40).notNullable()

        table.enu('method', ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE'], {
          useNative: true,
          enumName: 'method_type',
          existingType: false,
        })

        table.timestamp('created_at', { useTz: true })
        table.timestamp('updated_at', { useTz: true })
      })
    else Logger.info('Operations migration already running')
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
