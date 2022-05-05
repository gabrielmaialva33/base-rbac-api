import BaseInterface from 'App/Shared/Interfaces/BaseInterface'
import Permission from 'App/Modules/Accounts/Models/Permission'

export namespace IPermission {
  export interface Repository extends BaseInterface<typeof Permission>, Helpers {}

  export interface Helpers {
    attachOperations(permission: Permission, ids: Array<string | number>): Promise<void>

    syncOperations(permission: Permission, ids: Array<string | number>): Promise<void>
  }

  export namespace DTOs {
    export interface Store {}

    export interface Edit {}
  }
}
