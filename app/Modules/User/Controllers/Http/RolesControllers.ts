import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RolesControllers {
  public async index({}: HttpContextContract): Promise<void> {}

  public async show({}: HttpContextContract): Promise<void> {}

  public async store({}: HttpContextContract): Promise<void> {}

  public async update({}: HttpContextContract): Promise<void> {}

  public async destroy({}: HttpContextContract): Promise<void> {}
}
