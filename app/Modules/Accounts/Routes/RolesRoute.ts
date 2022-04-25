import Route from '@ioc:Adonis/Core/Route'
import RolesController from 'App/Modules/Accounts/Controllers/Http/RolesController'

Route.group(() => {
  Route.get('/', new RolesController().list).as('roles.list')
  Route.get('/:id', new RolesController().show).as('roles.show')
  Route.post('/', new RolesController().store).as('roles.store')
  Route.put('/:id', new RolesController().edit).as('roles.edit')
  Route.delete('/:id', new RolesController().delete).as('roles.delete')
}).prefix('roles')
