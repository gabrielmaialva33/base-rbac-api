import { container } from 'tsyringe'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { StoreUserService } from 'App/Modules/User/Services/User'
import StoreUserValidator from 'App/Modules/User/Validators/StoreUserValidator'

export default class UsersControllers {
  public async store({ request, response }: HttpContextContract): Promise<void> {
    const data = await request.validate(StoreUserValidator)

    const storeService = container.resolve(StoreUserService)
    const user = await storeService.run(data)

    return response.json(user)
  }
}
