import BaseInterface from 'App/Shared/Interfaces/BaseInterface'
import Resource from 'App/Modules/Accounts/Models/Resource'

export namespace IResource {
  export interface Repository extends BaseInterface<typeof Resource>, Helpers {}

  export interface Helpers {}

  export namespace DTOs {
    export type List = {
      page: number
      perPage: number
      search: string
    }

    export type Store = {
      name: string
      description: string
    }

    export type Edit = {
      name?: string
      description?: string
    }
  }
}
