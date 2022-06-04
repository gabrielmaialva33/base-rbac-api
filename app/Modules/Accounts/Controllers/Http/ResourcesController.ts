import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { container } from 'tsyringe'

import {
  DeleteResourceService,
  EditResourceService,
  GetResourceService,
  ListResourceService,
  StoreResourceService,
} from 'App/Modules/Accounts/Services/Resource'
import { ResourcesValidator } from 'App/Modules/Accounts/Validators/ResourcesValidator'

export default class ResourcesController {
  public async list({ request, response }: HttpContextContract): Promise<void> {
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 10)
    const search = request.input('search', '')

    const listResources = container.resolve(ListResourceService)
    const resources = await listResources.run({ page, perPage, search })

    return response.json(resources)
  }

  public async get({ params, response }: HttpContextContract): Promise<void> {
    const { id: resourceId } = params

    const getResources = container.resolve(GetResourceService)
    const resource = await getResources.run(resourceId)

    return response.json(resource)
  }

  public async store({ request, response }: HttpContextContract): Promise<void> {
    const resourceDto = await request.validate(ResourcesValidator.StoreResource)

    const storeResource = container.resolve(StoreResourceService)
    const resource = await storeResource.run(resourceDto)

    return response.json(resource)
  }

  public async edit({ request, params, response }: HttpContextContract): Promise<void> {
    const { id: resourceId } = params
    const resourceDto = await request.validate(ResourcesValidator.EditResource)

    const editResource = container.resolve(EditResourceService)
    const resource = await editResource.run(resourceId, resourceDto)

    return response.json(resource)
  }

  public async delete({ params, response }: HttpContextContract): Promise<void> {
    const { id: resourceId } = params

    const deleteResources = container.resolve(DeleteResourceService)
    await deleteResources.run(resourceId)

    return response.json({ message: 'Resource deleted successfully.' })
  }
}
