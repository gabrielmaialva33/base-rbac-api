import { BaseInterface } from 'App/Shared/Interfaces/BaseInterface'
import { TestTypeModel } from 'App/Shared/Models/BaseCustomModel'
import { ModelAttributes } from '@ioc:Adonis/Lucid/Orm'

export default class BaseRepository<Model extends TestTypeModel> implements BaseInterface<Model> {
  constructor(protected model: Model) {}

  public async create<T extends Model>(
    values: Partial<ModelAttributes<InstanceType<T>>>
  ): Promise<InstanceType<T>> {
    return this.model.create(values)
  }
}
