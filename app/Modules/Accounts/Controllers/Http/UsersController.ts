import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { container } from 'tsyringe'

import {
  ListUserService,
  StoreUserService,
  GetUserService,
  EditUserService,
  DeleteUserService,
} from 'App/Modules/Accounts/Services/User'

import { UsersValidator as Validator } from 'App/Modules/Accounts/Validators/UsersValitator'

export default class UsersController {
  public async list({ request, response }: HttpContextContract): Promise<void> {
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 10)
    const search = request.input('search', '')

    const listUsers = container.resolve(ListUserService)
    const users = await listUsers.run({ page, perPage, search })

    return response.json(users)
  }

  public async get({ request, params, response }: HttpContextContract): Promise<void> {
    const { id: userId } = params
    await request.validate(Validator.UUID(userId))

    const getUser = container.resolve(GetUserService)
    const user = await getUser.run(userId)

    return response.json(user)
  }

  public async store({ request, response }: HttpContextContract): Promise<void> {
    const userDTO = await request.validate(Validator.StoreUser)

    const storeUser = container.resolve(StoreUserService)
    const user = await storeUser.run(userDTO)

    return response.json(user)
  }

  public async edit({ request, params, response }: HttpContextContract): Promise<void> {
    const { id: userId } = params
    await request.validate(Validator.UUID(userId))

    const userDTO = await request.validate(Validator.EditUser)

    const editUser = container.resolve(EditUserService)
    const user = await editUser.run(userId, userDTO)

    return response.json(user)
  }

  public async delete({ request, params, response }: HttpContextContract): Promise<void> {
    const { id: userId } = params
    await request.validate(Validator.UUID(userId))

    const deleteUser = container.resolve(DeleteUserService)
    await deleteUser.run(userId)

    return response.json({ message: 'User deleted successfully.' })
  }
}
