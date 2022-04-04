import Role from 'App/Modules/User/Models/Role'
import { BaseInterface } from 'App/Shared/Interfaces/BaseInterface'

export namespace IRole {
  export interface Repository extends BaseInterface<typeof Role> {}

  export namespace DTO {
    export interface Store {
      slug: string
      name: string
      description: string
      is_active: boolean
    }

    export interface Update {
      slug?: string
      name?: string
      description?: string
      is_active?: boolean
    }
  }
}
