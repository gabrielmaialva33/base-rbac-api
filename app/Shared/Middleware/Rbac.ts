import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import AuthorizationException from 'App/Shared/Exceptions/AuthorizationException'

export default class Rbac {
  public async handle({ request, auth }: HttpContextContract, next: () => Promise<void>) {
    const user = await auth.authenticate()

    await user.load('roles', (builder) =>
      builder.preload('permissions', (builder) => builder.preload('operations'))
    )
    const roles = user.roles.map((role) => role)

    for (const role of roles) {
      const permission = role.permissions.find((p) =>
        p.operations.find((o) => o.method === request.method())
      )
      if (!permission) throw new AuthorizationException('User not authorized.')

      if (permission.action === 'DENY') throw new AuthorizationException('User not authorized.')

      if (!request.url().includes(permission.resource))
        throw new AuthorizationException('User not authorized.')
    }

    return next()
  }
}
