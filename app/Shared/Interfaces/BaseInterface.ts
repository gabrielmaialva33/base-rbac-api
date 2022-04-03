import { TestTypeModel } from 'App/Shared/Models/BaseCustomModel'
import { ModelAttributes } from '@ioc:Adonis/Lucid/Orm'

export interface BaseInterface<Model extends TestTypeModel> {
  create<T extends Model>(
    values: Partial<ModelAttributes<InstanceType<T>>>
  ): Promise<InstanceType<T>>
}
