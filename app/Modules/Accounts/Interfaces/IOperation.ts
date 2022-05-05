import BaseInterface from 'App/Shared/Interfaces/BaseInterface'
import Operation from 'App/Modules/Accounts/Models/Operation'

export namespace IOperation {
  export interface Repository extends BaseInterface<typeof Operation>, Helpers {}

  export interface Helpers {}
}
