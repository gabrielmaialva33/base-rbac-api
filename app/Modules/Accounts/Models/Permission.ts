import { DateTime } from 'luxon'
import {
  afterFetch,
  afterFind,
  afterPaginate,
  BelongsTo,
  belongsTo,
  column,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Shared/Models/BaseModel'
import Operation from 'App/Modules/Accounts/Models/Operation'
import Resource from 'App/Modules/Accounts/Models/Resource'

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
  public resource_id: string

  @column()
  public action: string

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
   * - define Permission model relationships
   */
  @belongsTo(() => Resource, { localKey: 'id', foreignKey: 'resource_id' })
  public resource: BelongsTo<typeof Resource>

  @manyToMany(() => Operation, {
    localKey: 'id',
    pivotForeignKey: 'permission_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'operation_id',
    pivotTable: 'permissions_operations',
  })
  public operations: ManyToMany<typeof Operation>

  /**
   * ------------------------------------------------------
   * Hooks
   * ------------------------------------------------------
   */
  @afterFind()
  public static async loadRelationOnGet(permission: Permission) {
    await permission.load('resource', (builder) => builder.orderBy('name'))
    await permission.load('operations', (builder) => builder.orderBy('slug'))
  }

  @afterPaginate()
  @afterFetch()
  public static async loadRelationsOnList(permissions: Array<Permission>) {
    for (const permission of permissions) {
      await permission.load('resource', (builder) => builder.orderBy('name'))
      await permission.load('operations', (builder) => builder.orderBy('slug'))
    }
  }

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
