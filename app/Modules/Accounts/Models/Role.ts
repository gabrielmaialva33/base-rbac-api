import { column, scope } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import BaseModel from 'App/Shared/Models/BaseModel'

export default class Role extends BaseModel {
  public static table = 'roles'

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

  @column({ serializeAs: null })
  public name: string

  @column()
  public description: string

  @column({ serializeAs: null })
  public token: string

  @column()
  public deletable: boolean

  @column()
  public is_active: boolean

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
   * - define User model relationships
   */

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
    const fields = ['slug', 'description']
    let sql = ''

    fields.forEach((field, i) => {
      sql = `${sql} ${i !== 0 ? ' or ' : ' '} ${field} like '%${search}%'`
    })

    return query.whereRaw(`(${sql})`)
  })

  /**
   * ------------------------------------------------------
   * Misc
   * ------------------------------------------------------
   */
}