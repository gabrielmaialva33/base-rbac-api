import { BaseInterface, ModelType } from 'App/Shared/Interfaces/BaseInterface'
import BaseModel from 'App/Shared/Models/BaseModel'

export default class BaseRepository<Model extends typeof BaseModel>
  implements BaseInterface<Model>
{
  constructor(protected model: Model) {}

  public async store<T extends Model>(values: ModelType<T>): Promise<InstanceType<T>> {
    return this.model.create(values)
  }

  public async storeMany<T extends Model>(
    values: Array<ModelType<T>>
  ): Promise<Array<InstanceType<T>>> {
    return this.model.createMany(values)
  }

  public async firstOrStore<T extends Model>(
    search: ModelType<T>,
    values: ModelType<T>
  ): Promise<InstanceType<T>> {
    return this.model.firstOrCreate(search, values)
  }
}
