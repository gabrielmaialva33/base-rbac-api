import User from 'App/Modules/User/Models/User'
import { BaseInterface } from 'App/Shared/Interfaces/BaseInterface'

export declare namespace IUser {
  export interface Repository extends BaseInterface<typeof User> {}

  export namespace DTO {
    export interface Store {}

    export interface Update {}
  }
}
