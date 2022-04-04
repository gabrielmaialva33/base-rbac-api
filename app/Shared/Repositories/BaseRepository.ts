import {
  BaseInterface,
  ModelType,
  PaginatorParams,
  PaginatorContract,
} from 'App/Shared/Interfaces/BaseInterface'
import BaseModel from 'App/Shared/Models/BaseModel'

export default class BaseRepository<Model extends typeof BaseModel>
  implements BaseInterface<Model>
{
  constructor(protected model: Model) {}

  /**
   * Repository
   */
  public async list() {}

  public async listWithPagination<T extends Model>(
    params: PaginatorParams<T>
  ): Promise<PaginatorContract<T>> {
    const { page, perPage, clause, order } = params

    const models = this.model.query()

    if (clause?.where) models.where(clause.where)
    if (order) models.orderBy(String(order.column), order.direction)

    return models.paginate(page, perPage)
  }

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
