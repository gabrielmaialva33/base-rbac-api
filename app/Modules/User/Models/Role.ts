import { column, scope } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import BaseModel from 'App/Shared/Models/BaseModel'

export default class Role extends BaseModel {
  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   * - column typing struct
   */
  @column({ isPrimary: true })
  public id: string

  @column()
  public slug: string

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public is_active: boolean

  @column()
  public is_deletable: boolean

  @column({ serializeAs: null })
  public is_deleted: boolean

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updated_at: DateTime

  @column.dateTime({ serializeAs: null })
  public deleted_at: DateTime

  /**
   * ------------------------------------------------------
   * Relationships
   * ------------------------------------------------------
   * - define Role model relationships
   */

  /**
   * ------------------------------------------------------
   * Hooks
   * ------------------------------------------------------
   */
  public static searchQueryScope = scope((query, search) => {
    const fields = ['slug', 'description']
    let sql = ''

    fields.forEach((field, i) => {
      sql = `${sql} ${i !== 0 ? ' or ' : ' '} ${field} ilike '%${search}%'`
    })

    return query.whereRaw(`(${sql})`)
  })

  /**
   * ------------------------------------------------------
   * Query Scopes
   * ------------------------------------------------------
   */
}
