import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export namespace UsersValidator {
  export class StoreUser {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
      first_name: schema.string({ escape: true, trim: true }, [
        rules.minLength(4),
        rules.maxLength(80),
      ]),
      last_name: schema.string({ escape: true, trim: true }, [
        rules.minLength(4),
        rules.maxLength(80),
      ]),
      username: schema.string({ escape: true, trim: true }, [
        rules.requiredIfNotExists('email'),
        rules.unique({ table: 'users', column: 'username', whereNot: { is_deleted: true } }),
      ]),
      email: schema.string({ escape: true, trim: true }, [
        rules.email(),
        rules.requiredIfNotExists('username'),
        rules.unique({ table: 'users', column: 'email', whereNot: { is_deleted: true } }),
      ]),
      password: schema.string({ escape: true, trim: true }, [rules.confirmed()]),
    })

    public messages = {}
  }

  export class EditUser {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
      first_name: schema.string.optional({ escape: true, trim: true }, [
        rules.minLength(4),
        rules.maxLength(80),
      ]),
      last_name: schema.string.optional({ escape: true, trim: true }, [
        rules.minLength(4),
        rules.maxLength(80),
      ]),
      username: schema.string.optional({ escape: true, trim: true }, [
        rules.requiredIfNotExists('email'),
        rules.unique({ table: 'users', column: 'username', whereNot: { is_deleted: true } }),
      ]),
      email: schema.string.optional({ escape: true, trim: true }, [
        rules.email(),
        rules.requiredIfNotExists('username'),
        rules.unique({ table: 'users', column: 'email', whereNot: { is_deleted: true } }),
      ]),
      password: schema.string.optional({ escape: true, trim: true }, [rules.confirmed()]),
    })

    public messages = {}
  }

  export class Login {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
      uid: schema.string({ trim: true }, []),
      password: schema.string({ trim: true }),
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
    rules.exists({ table: 'users', column: 'id', whereNot: { is_deleted: true } }),
    rules.regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i),
  ]),
})
