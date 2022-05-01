import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import AuthorizationException from 'App/Shared/Exceptions/AuthorizationException'

export default class Rbac {
  public async handle(
    { request, auth }: HttpContextContract,
    next: () => Promise<void>,
    allowedRoles: Array<string>
  ) {
    console.log(request.method())
    console.log(request.ctx?.route?.pattern)
    console.log(request.ctx?.route?.name)

    if (Array.isArray(allowedRoles) === false)
      throw new AuthorizationException('User not authorized.')

    const user = await auth.authenticate()
    await user.load('roles')

    const roles = user.roles.map((role) => {
      return role.name
    })

    for (const roleName of allowedRoles) if (roles.includes(roleName)) return next()

    throw new AuthorizationException('User not authorized.')
  }
}
