import { ModelAttributes } from '@ioc:Adonis/Lucid/Orm'
import { BaseTypeModel } from 'App/Shared/Models/BaseCustomModel'

/**
 * ------------------------------------------------------
 *  Base Interface
 * ------------------------------------------------------
 * - to be implemented in a base class
 */
export interface BaseInterface<Model extends BaseTypeModel> {
  /**
   * Create model and return its instance back
   */
  store<T extends Model>(values: ModelTypes<T>): Promise<InstanceType<T>>
}

/**
 * ------------------------------------------------------
 *  Base Types
 * ------------------------------------------------------
 */
export type ModelTypes<T extends BaseTypeModel> = Partial<ModelAttributes<InstanceType<T>>>
