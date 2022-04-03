import { container, delay } from 'tsyringe'

import UsersRepository from 'App/Modules/User/Repositories/UsersRepository'
import { IUser } from 'App/Modules/User/Interfaces/UserInterface'

container.registerSingleton<IUser.Repository>(
  'UsersRepository',
  delay(() => UsersRepository)
)
