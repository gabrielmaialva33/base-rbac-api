import { ModelAttributes } from '@ioc:Adonis/Lucid/Orm'
import BaseModel from 'App/Shared/Models/BaseModel'

/**
 * ------------------------------------------------------
 *  Base Interface
 * ------------------------------------------------------
 * - to be implemented in a base repository class and interfaces
 */
export interface BaseInterface<Model extends typeof BaseModel> {
  /**
   * Create model and return its instance back
   */
  store<T extends Model>(values: ModelType<T>): Promise<InstanceType<T>>
  /**
   * Create many of model instances
   */
  storeMany<T extends Model>(values: Array<ModelType<T>>): Promise<Array<InstanceType<T>>>
  /**
   * Returns the first row or save it to the database
   */
  firstOrStore<T extends Model>(
    search: ModelType<T>,
    values: ModelType<T>
  ): Promise<InstanceType<T>>
}

/**
 * ------------------------------------------------------
 *  Types
 * ------------------------------------------------------
 */
export type ModelType<T extends typeof BaseModel> = Partial<ModelAttributes<InstanceType<T>>>

/**
 * ------------------------------------------------------
 *  Interfaces
 * ------------------------------------------------------
 */
