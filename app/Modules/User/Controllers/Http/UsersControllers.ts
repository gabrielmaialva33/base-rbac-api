import { container } from 'tsyringe'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { StoreUserService } from 'App/Modules/User/Services/User'

export default class UsersControllers {
  public async store({ request, response }: HttpContextContract): Promise<void> {
    const data = request.all()

    const storeService = container.resolve(StoreUserService)
    const user = await storeService.run(data)

    return response.json(user)
  }
}
