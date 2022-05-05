import Route from '@ioc:Adonis/Core/Route'

import OperationsController from 'App/Modules/Accounts/Controllers/Http/OperationsController'

Route.group(() => {
  Route.get('/', new OperationsController().list).as('operation.list')
})
  .prefix('operations')
  .middleware(['auth', 'rbac'])
