import Route from '@ioc:Adonis/Core/Route'
import UsersControllers from 'App/Modules/User/Controllers/Http/UsersControllers'

Route.group(() => {
  Route.post('/store', new UsersControllers().store).as('user.store')
}).prefix('users')
