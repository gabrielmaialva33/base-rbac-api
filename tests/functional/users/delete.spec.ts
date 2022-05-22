import { test } from '@japa/runner'

import { UserFactory } from 'Database/factories'
import RolesRepository from 'App/Modules/Accounts/Repositories/RolesRepository'

const roleRepository = new RolesRepository()

const LOGIN = {
  uid: 'admin',
  password: 'rbac@2022',
}

test.group('User:Delete', () => {
  test('it should be able to delete a user', async ({ client, assert }) => {
    /** login admin user */
    const loginResponse = await client.post('/login').json(LOGIN)
    loginResponse.assertStatus(200)

    const authBody = loginResponse.body()
    assert.properties(authBody, ['type', 'token', 'expires_at'])

    /** create many users */
    const user = await UserFactory.create()
    const role = await roleRepository.findBy('name', 'user')
    if (role) user.related('roles').attach([role.id])

    const response = await client.delete(`/users/${user.id}`).bearerToken(authBody.token)
    response.assertStatus(200)
    response.assertBodyContains({
      message: 'User deleted successfully.',
    })
  })
})
