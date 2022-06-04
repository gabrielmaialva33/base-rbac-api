import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

import { IPermission } from 'App/Modules/Accounts/Interfaces/IPermission'

export namespace PermissionsValidator {
  import ActionType = IPermission.ActionType

  export class StorePermission {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
      resource_id: schema.string({ escape: true, trim: true }, [
        rules.exists({ table: 'resources', column: 'id', whereNot: { is_deleted: true } }),
      ]),
      action: schema.enum(Object.values(ActionType), []),
      operations: schema
        .array([rules.minLength(1)])
        .members(
          schema.string({ trim: true, escape: true }, [
            rules.exists({ table: 'operations', column: 'id' }),
          ])
        ),
    })

    public messages = {}
  }

  export class EditPermission {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
      resource_id: schema.string.optional({ escape: true, trim: true }, [
        rules.exists({ table: 'resources', column: 'id', whereNot: { is_deleted: true } }),
      ]),
      action: schema.enum(Object.values(ActionType), []),
      operations: schema.array
        .optional([rules.minLength(1)])
        .members(
          schema.string({ trim: true, escape: true }, [
            rules.exists({ table: 'operations', column: 'id' }),
          ])
        ),
    })

    public messages = {}
  }
}
