import { test } from '@japa/runner'

import { UserFactory } from 'Database/factories'
import RolesRepository from 'App/Modules/Accounts/Repositories/RolesRepository'

const roleRepository = new RolesRepository()
const LOGIN = {
  uid: 'admin',
  password: 'rbac@2022',
}

test.group('User:Store', () => {
  test('it should be able to store a user', async ({ client, assert }) => {
    /** login admin user */
    const loginResponse = await client.post('/login').json(LOGIN)
    loginResponse.assertStatus(200)

    const authBody = loginResponse.body()
    assert.properties(authBody, ['type', 'token', 'expires_at'])

    const user = await UserFactory.make()
    const role = await roleRepository.findBy('name', 'user')

    assert.isObject(role)

    const response = await client
      .post('/users')
      .json({
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
        password: user.password,
        password_confirmation: user.password,
        roles: [role!.id],
      })
      .bearerToken(authBody.token)

    response.assertStatus(200)
    response.assertBodyContains({
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
    })
  })
})
