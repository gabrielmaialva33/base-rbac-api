import { BaseInterface, ModelTypes } from 'App/Shared/Interfaces/BaseInterface'
import { BaseTypeModel } from 'App/Shared/Models/BaseCustomModel'

export default class BaseRepository<Model extends BaseTypeModel> implements BaseInterface<Model> {
  constructor(protected model: Model) {}

  public async store<T extends Model>(values: ModelTypes<T>): Promise<InstanceType<T>> {
    return this.model.create(values)
  }
}
