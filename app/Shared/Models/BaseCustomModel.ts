import { BaseModel } from '@ioc:Adonis/Lucid/Orm'

export type TestTypeModel = typeof BaseCustomModel

export class BaseCustomModel extends BaseModel {}
