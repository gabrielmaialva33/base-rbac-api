import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { container } from 'tsyringe'

import {
  ListPermissionService,
  GetPermissionService,
  DeletePermissionService,
  StorePermissionService,
  EditPermissionService,
} from 'App/Modules/Accounts/Services/Permission'
import { PermissionsValidator } from 'App/Modules/Accounts/Validators/PermissionsValidator'

export default class PermissionsController {
  public async list({ request, response }: HttpContextContract): Promise<void> {
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 10)

    const listPermissions = container.resolve(ListPermissionService)
    const permissions = await listPermissions.run({ page, perPage })

    return response.json(permissions)
  }

  public async get({ params, response }: HttpContextContract): Promise<void> {
    const { id: permissionId } = params

    const getPermission = container.resolve(GetPermissionService)
    const permission = await getPermission.run(permissionId)

    return response.json(permission)
  }

  public async store({ request, response }: HttpContextContract): Promise<void> {
    const permissionDto = await request.validate(PermissionsValidator.StorePermission)

    const storePermission = container.resolve(StorePermissionService)
    const permissions = await storePermission.run(permissionDto)

    return response.json(permissions)
  }

  public async edit({ request, params, response }: HttpContextContract): Promise<void> {
    const { id: permissionId } = params
    const permissionDto = await request.validate(PermissionsValidator.EditPermission)

    const editPermission = container.resolve(EditPermissionService)
    const permission = await editPermission.run(permissionId, permissionDto)

    return response.json(permission)
  }

  public async delete({ params, response }: HttpContextContract): Promise<void> {
    const { id: permissionId } = params

    const deletePermission = container.resolve(DeletePermissionService)
    await deletePermission.run(permissionId)

    return response.json({ message: 'Permission deleted successfully.' })
  }
}
