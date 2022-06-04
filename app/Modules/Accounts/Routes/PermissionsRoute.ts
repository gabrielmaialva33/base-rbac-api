import Route from '@ioc:Adonis/Core/Route'

import PermissionsController from 'App/Modules/Accounts/Controllers/Http/PermissionsController'

Route.group(() => {
  Route.get('/', new PermissionsController().list).as('permission.list')
  Route.get('/:id', new PermissionsController().get).as('permission.get')
  Route.post('/', new PermissionsController().store).as('permission.store')
  Route.put('/:id', new PermissionsController().edit).as('permission.edit')
  Route.delete('/:id', new PermissionsController().delete).as('permission.delete')
})
  .prefix('permissions')
  .middleware(['auth', 'rbac'])
