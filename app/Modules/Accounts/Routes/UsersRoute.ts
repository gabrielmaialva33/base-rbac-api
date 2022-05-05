import Route from '@ioc:Adonis/Core/Route'

import AuthController from 'App/Modules/Accounts/Controllers/Http/AuthController'
import UsersController from 'App/Modules/Accounts/Controllers/Http/UsersController'

Route.group(() => {
  Route.get('/', new UsersController().list).as('user.list')
  Route.get('/:id', new UsersController().show).as('user.show')
  Route.post('/', new UsersController().store).as('user.store')
  Route.put('/:id', new UsersController().edit).as('user.edit')
  Route.delete('/:id', new UsersController().delete).as('user.delete')
})
  .prefix('users')
  .middleware(['auth', 'rbac:root,admin'])

Route.group(() => {
  Route.post('/login', new AuthController().store).as('auth.store')
})
