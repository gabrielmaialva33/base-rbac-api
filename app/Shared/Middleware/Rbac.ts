import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import AuthorizationException from 'App/Shared/Exceptions/AuthorizationException'

export default class Rbac {
  public async handle({ request, auth }: HttpContextContract, next: () => Promise<void>) {
    const user = await auth.authenticate()

    await user.load('roles', (builder) =>
      builder.preload('permissions', (builder) => {
        builder.preload('resource')
        builder.preload('operations')
      })
    )

    const [[permission]] = user.roles.map((role) =>
      role.permissions.filter((permission) => request.url().includes(permission.resource.name))
    )

    if (!permission) throw new AuthorizationException('User not authorized.')
    if (permission.action === 'DENY') throw new AuthorizationException('User not authorized.')

    const operation = permission.operations.find(
      (operation) => operation.method === request.method()
    )
    if (!operation) throw new AuthorizationException('User not authorized.')

    return next()
  }
}
