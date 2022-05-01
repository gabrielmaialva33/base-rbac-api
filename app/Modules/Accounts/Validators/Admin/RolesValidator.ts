import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

export namespace RolesValidator {
  export class StoreRole {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
      slug: schema.string({ escape: true, trim: true }, [rules.minLength(4), rules.maxLength(80)]),
      description: schema.string({ escape: true, trim: true }, [
        rules.minLength(4),
        rules.maxLength(255),
      ]),
      is_active: schema.boolean.optional([]),
    })

    public messages = {}
  }

  export class EditRole {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
      slug: schema.string.optional({ escape: true, trim: true }, [
        rules.minLength(4),
        rules.maxLength(80),
      ]),
      description: schema.string.optional({ escape: true, trim: true }, [
        rules.minLength(4),
        rules.maxLength(255),
      ]),
      is_active: schema.boolean.optional([]),
    })

    public messages = {}
  }

  export function UUID(id: string) {
    return {
      schema: UUIDSchema,
      data: { id },
      messages: {},
    }
  }
}

/**
 * Validate Schemas
 */
export const UUIDSchema = schema.create({
  id: schema.string.optional({ trim: true, escape: true }, [
    rules.uuid({ version: '4' }),
    rules.exists({ table: 'roles', column: 'id', whereNot: { is_deleted: true } }),
    rules.regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i),
  ]),
})
