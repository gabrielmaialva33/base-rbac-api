import Route from '@ioc:Adonis/Core/Route'

import AuthController from 'App/Modules/Accounts/Controllers/Http/User/ AuthController'

Route.group(() => {
  Route.post('/login', new AuthController().store).as('auth.store')
})
