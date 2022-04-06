import {
  BaseInterface,
  ModelType,
  PaginatorParams,
  PaginatorContract,
  Clauses,
  OrderBy,
} from 'App/Shared/Interfaces/BaseInterface'
import BaseModel from 'App/Shared/Models/BaseModel'

export default class BaseRepository<Model extends typeof BaseModel>
  implements BaseInterface<Model>
{
  constructor(protected model: Model) {}

  /**
   * Repository
   */
  public async index<T extends Model>(
    clause?: Clauses<T>,
    order?: OrderBy<T>
  ): Promise<InstanceType<T>[]> {
    const models = this.model.query()

    if (clause?.where) models.where(clause.where)
    if (order) models.orderBy(String(order.column), order.direction)

    return models
  }

  public async indexWithPagination<T extends Model>(
    params: PaginatorParams<T>
  ): Promise<PaginatorContract<T>> {
    const { page, perPage, clause, order } = params

    const models = this.model.query()

    if (clause?.where) models.where(clause.where)
    if (order) models.orderBy(String(order.column), order.direction)

    return models.paginate(page, perPage)
  }

  public async findBy<T extends Model>(
    key: string,
    value: any,
    clause?: Clauses<T>
  ): Promise<null | InstanceType<T>> {
    const model = this.model.query()
    if (clause?.where) model.where(clause.where)

    model.where(key, value)
    return this.model.first()
  }

  public async store<T extends Model>(values: ModelType<T>): Promise<InstanceType<T>> {
    return this.model.create(values)
  }

  public async update<T extends InstanceType<Model>>(model: T): Promise<T> {
    return model.save()
  }

  public async storeMany<T extends Model>(
    values: Array<ModelType<T>>
  ): Promise<Array<InstanceType<T>>> {
    return this.model.createMany(values)
  }

  public async findOrStore<T extends Model>(
    search: ModelType<T>,
    values: ModelType<T>
  ): Promise<InstanceType<T>> {
    return this.model.firstOrCreate(search, values)
  }
}
