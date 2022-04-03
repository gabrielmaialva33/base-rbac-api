import { BaseModel as BaseAdonisModel } from '@ioc:Adonis/Lucid/Orm'

export class BaseModel extends BaseAdonisModel {}

export type BaseTypeModel = typeof BaseModel
