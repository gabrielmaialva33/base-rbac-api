import BaseInterface from 'App/Shared/Interfaces/BaseInterface'
import Permission from 'App/Modules/Accounts/Models/Permission'

export namespace IPermission {
  export interface Repository extends BaseInterface<typeof Permission>, Helpers {}

  export interface Helpers {
    attachOperations(permission: Permission, ids: Array<string>): Promise<void>

    syncOperations(permission: Permission, ids: Array<string>): Promise<void>
  }

  export enum ActionType {
    allow = 'ALLOW',
    deny = 'DENY',
  }

  export namespace DTOs {
    export type List = {
      page: number
      perPage: number
      search: string
    }

    export type Store = {
      resource: string
      action: ActionType
      operations: Array<string>
    }

    export type Edit = {
      resource?: string
      action?: ActionType
      operations?: Array<string>
    }
  }
}
