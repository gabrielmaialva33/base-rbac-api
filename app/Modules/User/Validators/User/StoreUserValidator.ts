import { rules, schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    first_name: schema.string({ escape: true, trim: true }, [
      rules.minLength(2),
      rules.maxLength(80),
    ]),
    last_name: schema.string({ escape: true, trim: true }, [
      rules.minLength(2),
      rules.maxLength(80),
    ]),
    username: schema.string({ escape: true, trim: true }, [
      rules.minLength(4),
      rules.maxLength(50),
    ]),
    email: schema.string({ escape: true, trim: true }, [rules.email()]),
    password: schema.string({ escape: true, trim: true }, [rules.confirmed()]),
  })

  public messages = {}
}
