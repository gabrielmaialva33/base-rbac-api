import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Modules/Accounts/Models/User'
import Role from 'App/Modules/Accounts/Models/Role'

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    first_name: faker.name.firstName('male'),
    last_name: faker.name.lastName('female'),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
})
  .relation('roles', () => Role)
  .build()
