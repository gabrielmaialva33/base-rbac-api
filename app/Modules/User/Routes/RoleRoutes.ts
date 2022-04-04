import Route from '@ioc:Adonis/Core/Route'
import RolesControllers from 'App/Modules/User/Controllers/Http/RolesControllers'

Route.group(() => {
  Route.get('/index', new RolesControllers().index).as('role.index')
  Route.get('/show', new RolesControllers().show).as('role.show')
  Route.get('/store', new RolesControllers().store).as('role.store')
  Route.get('/update', new RolesControllers().update).as('role.update')
  Route.get('/destroy', new RolesControllers().destroy).as('role.destroy')
}).prefix('roles')
