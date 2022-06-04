import { DateTime } from 'luxon'
import { column, HasMany, hasMany, scope } from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Shared/Models/BaseModel'
import Permission from 'App/Modules/Accounts/Models/Permission'

export default class Resource extends BaseModel {
  public static table = 'resources'

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   * - column typing struct
   */
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public deletable: boolean

  @column({ serializeAs: null })
  public is_deleted: boolean

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updated_at: DateTime

  @column.dateTime({ autoUpdate: true, serializeAs: null })
  public deleted_at: DateTime

  /**
   * ------------------------------------------------------
   * Relationships
   * ------------------------------------------------------
   * - define Resource model relationships
   */
  @hasMany(() => Permission, { localKey: 'id', foreignKey: 'resource_id' })
  public permissions: HasMany<typeof Permission>

  /**
   * ------------------------------------------------------
   * Hooks
   * ------------------------------------------------------
   */

  /**
   * ------------------------------------------------------
   * Query Scopes
   * ------------------------------------------------------
   */
  public static searchQueryScope = scope((query, search) => {
    const fields = ['name']
    let sql = ''

    fields.forEach(
      (field, i) => (sql = `${sql} ${i !== 0 ? ' or ' : ' '} ${field} like '%${search}%'`)
    )

    return query.whereRaw(`(${sql})`)
  })

  /**
   * ------------------------------------------------------
   * Misc
   * ------------------------------------------------------
   */
}
