import { LucidRow, ModelAttributes, ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import { SimplePaginatorContract } from '@ioc:Adonis/Lucid/Database'

import BaseModel from 'App/Shared/Models/BaseModel'

/**
 * ------------------------------------------------------
 * Base Repository Interface
 * ------------------------------------------------------
 * - This a base interface methods for model repositories
 */
export default interface BaseInterface<Model extends typeof BaseModel> extends Helpers<Model> {
  /**
   * Fetch all rows with clauses
   */
  list<T extends Model>(params: ListParams<T>): Promise<Array<InstanceType<T>>>

  /**
   * Create model and return its instance back
   */
  store<T extends Model>(
    values: Partial<ModelAttributes<InstanceType<T>>>
  ): Promise<InstanceType<T>>

  /**
   * Create many of model instances
   */
  storeMany<T extends Model>(values: Array<ModelType<T>>): Promise<Array<InstanceType<T>>>

  /**
   * Save or update model instance
   */
  save<T extends InstanceType<typeof BaseModel>>(model: T): Promise<T>
}

/**
 * ------------------------------------------------------
 * Helpers Interface
 * ------------------------------------------------------
 * - This a base helpers methods for model repositories
 */
interface Helpers<Model extends typeof BaseModel> {
  /**
   * Fetch all rows with clauses and pagination
   */
  listWithPagination<T extends Model>(params: PaginateParams<T>): Promise<PaginateContractType<T>>

  /**
   * Find one using a key-value pair
   */
  findBy<T extends Model>(
    key: string,
    value: any,
    closers?: ModelClause<T>,
    order?: OrderBy<Model>
  ): Promise<InstanceType<T> | null>

  /**
   * Returns the first row or save it to the database
   */
  findOrStore<T extends Model>(
    searchPayload: ModelType<T>,
    savePayload: ModelType<T>
  ): Promise<InstanceType<T>>

  /**
   * Get plucked values with given params
   * and return a resolved any array promise
   */
  pluckBy<T extends Model>(column: string, closers?: ModelClause<T>): Promise<any[]>
}

/**
 * Types
 */
export type ModelType<Model extends typeof BaseModel> = Partial<
  ModelAttributes<InstanceType<Model>>
>

export type ModelKeysType<Model extends typeof BaseModel> = keyof ModelType<Model>

export type PaginateContractType<Model extends typeof BaseModel> =
  | ModelPaginatorContract<LucidRow & InstanceType<Model>>
  | SimplePaginatorContract<InstanceType<Model>>

/**
 * Interfaces
 */
export interface ListParams<Model extends typeof BaseModel> {
  clauses?: ModelClause<Model>
  order?: OrderBy<Model>
}

export interface PaginateParams<Model extends typeof BaseModel> {
  page: number
  perPage: number
  search?: string
  clauses?: ModelClause<Model>
  order?: OrderBy<Model>
}

export interface ModelClause<Model extends typeof BaseModel> {
  where?: ModelType<Model>
  like?: { column: ModelKeysType<Model>; match: string }
}

export interface OrderBy<Model extends typeof BaseModel> {
  column: ModelKeysType<Model>
  direction?: 'asc' | 'desc'
}
