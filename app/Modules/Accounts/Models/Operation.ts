import { column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import BaseModel from 'App/Shared/Models/BaseModel'

export default class Operation extends BaseModel {
  public static table = 'operations'

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   * - column typing struct
   */
  @column({ isPrimary: true })
  public id: string

  @column({ serializeAs: null })
  public name: string

  @column()
  public slug: string

  @column()
  public method: string

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
