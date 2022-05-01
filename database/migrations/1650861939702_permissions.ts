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

        table.string('name', 40).notNullable()
        table.string('slug', 80).notNullable()

        table.enu('method', ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE'], {
          useNative: true,
          enumName: 'method_type',
          existingType: false,
        })

        table.string('resource', 40).notNullable()

        table.enu('action', ['ALLOW', 'DENY'], {
          useNative: true,
          enumName: 'action_type',
          existingType: false,
        })

        table.timestamp('created_at', { useTz: true })
        table.timestamp('updated_at', { useTz: true })
      })
    else Logger.info('Permissions migration already running')
  }

  public async down() {
    this.schema.dropTable(this.tableName)
    this.schema.raw('drop type if exists method_type;')
    this.schema.raw('drop type if exists action_type;')
  }
}
