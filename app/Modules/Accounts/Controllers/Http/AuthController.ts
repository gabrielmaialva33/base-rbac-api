import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { UsersValidator as Validator } from 'App/Modules/Accounts/Validators/Admin/UsersValitator'

import AuthorizationException from 'App/Shared/Exceptions/AuthorizationException'

export default class AuthController {
  public async store({ request, auth, response }: HttpContextContract): Promise<void> {
    const { uid, password } = await request.validate(Validator.Login)

    try {
      const token = await auth
        .use('api')
        .attempt(uid, password, { name: 'rbac-token', expiresIn: '1h' })

      return response.json(token)
    } catch (error) {
      throw new AuthorizationException(
        'Unable to login, please check your credentials or try again later.'
      )
    }
  }
}
