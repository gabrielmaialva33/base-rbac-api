import { LucidRow, ModelAttributes, ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import { SimplePaginatorContract } from '@ioc:Adonis/Lucid/Database'

import BaseModel from 'App/Shared/Models/BaseModel'

/**
 * ------------------------------------------------------
 *  Base Interface
 * ------------------------------------------------------
 * - to be implemented in a base repository class and interfaces
 */
export interface BaseInterface<Model extends typeof BaseModel> {
  /**
   * Fetch all rows with pagination
   */
  index<T extends Model>(clause?: Clauses<T>, order?: OrderBy<T>): Promise<Array<InstanceType<T>>>
  /**
   * Fetch rows with pagination
   */
  indexWithPagination<T extends Model>(params: PaginatorParams<T>): Promise<PaginatorContract<T>>
  /**
   * Find one using a key-value pair and clauses
   */
  findBy<T extends Model>(
    key: string,
    value: any,
    clause?: Clauses<T>
  ): Promise<null | InstanceType<T>>
  /**
   * Create model and return its instance back
   */
  store<T extends Model>(values: ModelType<T>): Promise<InstanceType<T>>
  /**
   * Update model and return its instance back
   */
  update<T extends InstanceType<Model>>(model: T): Promise<T>
  /**
   * Create many of model instances
   */
  storeMany<T extends Model>(values: Array<ModelType<T>>): Promise<Array<InstanceType<T>>>
  /**
   * Returns the first row or save it to the database
   */
  findOrStore<T extends Model>(search: ModelType<T>, values: ModelType<T>): Promise<InstanceType<T>>
}

/**
 * ------------------------------------------------------
 *  Types
 * ------------------------------------------------------
 */
export type ModelType<T extends typeof BaseModel> = Partial<ModelAttributes<InstanceType<T>>>

export type PaginatorContract<T extends typeof BaseModel> =
  | ModelPaginatorContract<LucidRow & InstanceType<T>>
  | SimplePaginatorContract<InstanceType<T>>
/**
 * ------------------------------------------------------
 *  Interfaces
 * ------------------------------------------------------
 */
export interface PaginatorParams<T extends typeof BaseModel> {
  page: number
  perPage: number
  clause?: Clauses<T>
  order?: OrderBy<T>
}

export interface Clauses<T extends typeof BaseModel> {
  where: ModelType<T>
}

export interface OrderBy<T extends typeof BaseModel> {
  column: ModelType<T>
  direction?: 'asc' | 'desc'
}
