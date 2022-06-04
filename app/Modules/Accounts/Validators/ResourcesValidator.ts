import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export namespace ResourcesValidator {
  export class StoreResource {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
      name: schema.string({ escape: true, trim: true }, [rules.minLength(4), rules.maxLength(40)]),
      description: schema.string({ escape: true, trim: true }, []),
    })

    public messages = {}
  }

  export class EditResource {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
      name: schema.string.optional({ escape: true, trim: true }, [
        rules.minLength(4),
        rules.maxLength(40),
      ]),
      description: schema.string.optional({ escape: true, trim: true }, []),
    })

    public messages = {}
  }
}
