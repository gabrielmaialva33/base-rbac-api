import IBaseRepository, {
  ListParams,
  ModelClause,
  ModelType,
  OrderBy,
  PaginateContractType,
  PaginateParams,
} from 'App/Shared/Interfaces/BaseInterface'
import BaseModel from 'App/Shared/Models/BaseModel'
import { ModelAttributes } from '@ioc:Adonis/Lucid/Orm'

export default class BaseRepository<Model extends typeof BaseModel>
  implements IBaseRepository<Model>
{
  constructor(protected orm: Model) {}

  /**
   * Repository
   */
  public async list<T extends Model>({
    clauses,
    order,
  }: ListParams<T>): Promise<Array<InstanceType<T>>> {
    const models = this.orm.query()

    if (clauses)
      Object.entries(clauses).find(([key, value]) => {
        if (key === 'where') models.where(value)
        if (key === 'like') {
          const { column, match } = value
          console.log({ column, match })
          if (column && match) models.where(column, 'LIKE', `%${match}%`)
        }
      })

    if (order) {
      const { column, direction } = order
      if (column) models.orderBy(String(column), direction ? direction : 'asc')
    }

    return models
  }

  public async store<T extends Model>(
    values: Partial<ModelAttributes<InstanceType<T>>>
  ): Promise<InstanceType<T>> {
    return this.orm.create(values)
  }

  public async save<T extends InstanceType<typeof BaseModel>>(model: T): Promise<T> {
    return model.save()
  }

  /**
   * Helpers
   */
  public async listWithPagination<T extends Model>(
    params: PaginateParams<T>
  ): Promise<PaginateContractType<T>> {
    const { page, perPage, search, clauses, order } = params

    const models = this.orm.query()

    /** search query */
    if (search) {
      models.apply((scope) => {
        scope['searchQueryScope'](search)
      })
    }

    if (clauses)
      Object.entries(clauses).find(([key, value]) => {
        if (key === 'where') models.where(value)
        if (key === 'like') {
          const { column, match } = value
          if (column && match) models.where(column, 'LIKE', `%${match}%`)
        }
      })

    if (order) {
      const { column, direction } = order
      if (column) models.orderBy(String(column), direction ? direction : 'asc')
    }

    return models.paginate(page, perPage)
  }

  public async findBy<T extends Model>(
    key: string,
    value: any,
    clauses?: ModelClause<T>,
    order?: OrderBy<Model>
  ): Promise<InstanceType<T> | null> {
    const model = this.orm.query()
    model.where(key, value)

    if (clauses)
      Object.entries(clauses).find(([key, value]) => {
        if (key === 'where') model.where(value)
        if (key === 'like') {
          const { column, match } = value
          if (column && match) model.where(column, 'LIKE', `%${match}%`)
        }
      })

    if (order) {
      const { column, direction } = order
      if (column) model.orderBy(String(column), direction ? direction : 'asc')
    }

    return model.first()
  }

  public async findOrStore<T extends Model>(
    searchPayload: ModelType<T>,
    savePayload: ModelType<T>
  ): Promise<InstanceType<T>> {
    return this.orm.firstOrCreate(searchPayload, savePayload)
  }

  /**
   * Get plucked values with given params
   * @param {string} column to plucked values by key
   * @param {ModelClause<this>} clauses to filter by where not query
   * @returns a resolved any array promise
   */
  public async pluckBy<T extends Model>(column: string, clauses?: ModelClause<T>): Promise<any[]> {
    const models = this.orm.query().select([column])

    if (clauses)
      Object.entries(clauses).find(([key, value]) => {
        if (key === 'where') models.where(value)
        if (key === 'like') {
          const { column, match } = value
          if (column && match) models.where(column, 'LIKE', `%${match}%`)
        }
      })

    return (await models).map((item) => item[column])
  }
}
