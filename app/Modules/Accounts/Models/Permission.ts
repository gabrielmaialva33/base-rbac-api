import { DateTime } from 'luxon'
import { column } from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Shared/Models/BaseModel'

export default class Permission extends BaseModel {
  public static table = 'permissions'

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
  public slug: string

  @column()
  public method: string

  @column()
  public resource: string

  @column()
  public action: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updated_at: DateTime

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

  /**
   * ------------------------------------------------------
   * Misc
   * ------------------------------------------------------
   */
}
