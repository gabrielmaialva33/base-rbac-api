import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { container } from 'tsyringe'

import { ListOperationService } from 'App/Modules/Accounts/Services/Operation'

export default class OperationsController {
  public async list({ response }: HttpContextContract): Promise<void> {
    const listOperations = container.resolve(ListOperationService)
    const operations = await listOperations.run()

    return response.json(operations)
  }
}
