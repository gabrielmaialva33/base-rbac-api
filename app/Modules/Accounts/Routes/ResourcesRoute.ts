import Route from '@ioc:Adonis/Core/Route'

import ResourcesController from 'App/Modules/Accounts/Controllers/Http/ResourcesController'

Route.group(() => {
  Route.get('/', new ResourcesController().list).as('resource.list')
  Route.get('/:id', new ResourcesController().get).as('resource.get')
  Route.post('/', new ResourcesController().store).as('resource.store')
  Route.put('/:id', new ResourcesController().edit).as('resource.edit')
  Route.delete('/:id', new ResourcesController().delete).as('resource.delete')
})
  .prefix('resources')
  .middleware(['auth', 'rbac'])
