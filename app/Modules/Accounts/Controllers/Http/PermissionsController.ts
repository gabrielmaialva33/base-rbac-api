import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { container } from 'tsyringe'

import {
  ListPermissionService,
  GetPermissionService,
  DeletePermissionService,
} from 'App/Modules/Accounts/Services/Permission'

export default class PermissionsController {
  public async list({ request, response }: HttpContextContract): Promise<void> {
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 10)
    const search = request.input('search', '')

    const listPermissions = container.resolve(ListPermissionService)
    const permissions = await listPermissions.run({ page, perPage, search })

    return response.json(permissions)
  }

  public async get({ params, response }: HttpContextContract): Promise<void> {
    const { id: permissionId } = params

    const getPermission = container.resolve(GetPermissionService)
    const permission = await getPermission.run(permissionId)

    return response.json(permission)
  }

  public async store({}: HttpContextContract): Promise<void> {}

  public async edit({}: HttpContextContract): Promise<void> {}

  public async delete({ params, response }: HttpContextContract): Promise<void> {
    const { id: permissionId } = params

    const deletePermission = container.resolve(DeletePermissionService)
    await deletePermission.run(permissionId)

    return response.json({ message: 'Permission deleted successfully.' })
  }
}
