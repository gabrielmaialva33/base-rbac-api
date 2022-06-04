import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { container } from 'tsyringe'

import {
  DeleteRoleService,
  EditRoleService,
  GetRoleService,
  ListRoleService,
  StoreRoleService,
} from 'App/Modules/Accounts/Services/Role'

import { RolesValidator as Validator } from 'App/Modules/Accounts/Validators/RolesValidator'

export default class RolesController {
  public async list({ request, response }: HttpContextContract): Promise<void> {
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 10)
    const search = request.input('search', '')

    const listRoles = container.resolve(ListRoleService)
    const roles = await listRoles.run({ page, perPage, search })

    return response.json(roles)
  }

  public async get({ request, params, response }: HttpContextContract): Promise<void> {
    const { id: roleId } = params

    await request.validate(Validator.UUID(roleId))

    const getRole = container.resolve(GetRoleService)
    const role = await getRole.run(roleId)

    return response.json(role)
  }

  public async store({ request, response }: HttpContextContract): Promise<void> {
    const roleDTO = await request.validate(Validator.StoreRole)

    const storeRole = container.resolve(StoreRoleService)
    const role = await storeRole.run(roleDTO)

    return response.json(role)
  }

  public async edit({ request, params, response }: HttpContextContract): Promise<void> {
    const { id: roleId } = params
    await request.validate(Validator.UUID(roleId))

    const roleDTO = await request.validate(Validator.EditRole)

    const editRole = container.resolve(EditRoleService)
    const role = await editRole.run(roleId, roleDTO)

    return response.json(role)
  }

  public async delete({ request, params, response }: HttpContextContract): Promise<void> {
    const { id: roleId } = params
    await request.validate(Validator.UUID(roleId))

    const deleteRole = container.resolve(DeleteRoleService)
    await deleteRole.run(roleId)

    return response.json({ message: 'Role deleted successfully.' })
  }
}
