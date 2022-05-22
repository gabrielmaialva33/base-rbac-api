import Factory from '@ioc:Adonis/Lucid/Factory'
import Role from 'App/Modules/Accounts/Models/Role'

export const RoleFactory = Factory.define(Role, ({ faker }) => {
  return {
    slug: faker.name.jobTitle(),
    description: '',
    deletable: true,
    is_active: true,
  }
}).build()
