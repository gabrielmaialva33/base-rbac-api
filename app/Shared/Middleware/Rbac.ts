import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import AuthorizationException from 'App/Shared/Exceptions/AuthorizationException'

export default class Rbac {
  public async handle(
    { request, auth }: HttpContextContract,
    next: () => Promise<void>,
    allowedRoles: Array<string>
  ) {
    if (Array.isArray(allowedRoles) === false)
      throw new AuthorizationException('User not authorized.')

    const user = await auth.authenticate()
    await user.load('roles', (builder) => builder.preload('permissions'))

    const roles = user.roles.map((role) => {
      return role
    })

    for (const role of roles) {
      if (!allowedRoles.includes(role.name))
        throw new AuthorizationException('User not authorized.')

      const permission = role.permissions.find((p) => p.method === request.method())
      if (!permission) throw new AuthorizationException('User not authorized.')

      if (permission.action === 'DENY') throw new AuthorizationException('User not authorized.')

      if (!request.url().includes(permission.resource))
        throw new AuthorizationException('User not authorized.')
    }

    return next()
  }
}
