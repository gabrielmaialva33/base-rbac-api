import { DateTime } from 'luxon'
import {
  beforeSave,
  column,
  ManyToMany,
  manyToMany,
  ModelQueryBuilderContract,
  scope,
} from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Shared/Models/BaseModel'
import Permission from 'App/Modules/Accounts/Models/Permission'

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
  @manyToMany(() => Permission, {
    localKey: 'id',
    pivotForeignKey: 'role_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'permission_id',
    pivotTable: 'roles_permissions',
  })
  public permissions: ManyToMany<typeof Permission>

  /**
   * ------------------------------------------------------
   * Hooks
   * ------------------------------------------------------
   */
  @beforeSave()
  public static lowerName(role: Role): void {
    if (role.$dirty.slug) role.name = role.slug.toLowerCase()
  }

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

  public static onlyAdminContext = scope((query: ModelQueryBuilderContract<typeof Role>) => {
    query.andWhereNot('name', 'root')
  })

  public static loadPermissions = scope((query: ModelQueryBuilderContract<typeof Role>) => {
    query.preload('permissions')
  })

  public static loadPermissionsAndOperations = scope(
    (query: ModelQueryBuilderContract<typeof Role>) => {
      query.preload('permissions', (builder) => builder.preload('operations'))
    }
  )

  /**
   * ------------------------------------------------------
   * Misc
   * ------------------------------------------------------
   */
}
