import BaseInterface from 'App/Shared/Interfaces/BaseInterface'
import Role from 'App/Modules/Accounts/Models/Role'

export namespace IRole {
  export interface Repository extends BaseInterface<typeof Role>, Helpers {}

  interface Helpers {}

  export namespace DTOs {
    export interface List {
      page: number
      perPage: number
      search: string
    }

    export interface Store {
      slug: string
      description: string
      is_active?: boolean
    }

    export interface Edit {
      slug?: string
      description?: string
      is_active?: boolean
    }
  }
}