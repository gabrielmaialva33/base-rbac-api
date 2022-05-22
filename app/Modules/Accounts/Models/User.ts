import { DateTime } from 'luxon'
import { column, beforeSave, scope, computed, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'

import BaseModel from 'App/Shared/Models/BaseModel'
import Role from 'App/Modules/Accounts/Models/Role'

export default class User extends BaseModel {
  public static table = 'users'

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   * - column typing struct
   */
  @column({ isPrimary: true })
  public id: string

  @column()
  public first_name: string

  @column()
  public last_name: string

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public remember_me_token?: string

  @column()
  public is_online: boolean

  @column({ serializeAs: null })
  public is_blocked: boolean

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
  @manyToMany(() => Role, {
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'role_id',
    pivotTable: 'users_roles',
  })
  public roles: ManyToMany<typeof Role>

  /**
   * ------------------------------------------------------
   * Hooks
   * ------------------------------------------------------
   */
  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) user.password = await Hash.make(user.password)
  }

  /**
   * ------------------------------------------------------
   * Query Scopes
   * ------------------------------------------------------
   */
  public static searchQueryScope = scope((query, search) => {
    const fields = ['first_name', 'last_name', 'username', 'email']
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
  @computed()
  public get full_name() {
    return `${this.first_name} ${this.last_name}`
  }

  public isRoot(): boolean {
    return !!this.roles.find((role) => role.name === 'root')
  }
}
