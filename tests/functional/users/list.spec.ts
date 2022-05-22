import { test } from '@japa/runner'

import { UserFactory } from 'Database/factories'
import RolesRepository from 'App/Modules/Accounts/Repositories/RolesRepository'

const roleRepository = new RolesRepository()

const LOGIN = {
  uid: 'admin',
  password: 'rbac@2022',
}

test.group('User:List', () => {
  test('it should be able to list users with pagination', async ({ client, assert }) => {
    /** login admin user */
    const loginResponse = await client.post('/login').json(LOGIN)
    loginResponse.assertStatus(200)

    const authBody = loginResponse.body()
    assert.properties(authBody, ['type', 'token', 'expires_at'])

    /** create many users */
    const users = await UserFactory.createMany(10)
    const role = await roleRepository.findBy('name', 'user')
    if (role) for (const user of users) user.related('roles').attach([role.id])

    assert.isObject(role)

    const response = await client
      .get('/users')
      .qs({
        page: 2,
        per_page: 5,
        search: '',
      })
      .bearerToken(authBody.token)
    response.assertStatus(200)

    const { meta, data } = response.body()
    assert.properties(meta, [
      'total',
      'per_page',
      'current_page',
      'last_page',
      'first_page',
      'first_page_url',
      'last_page_url',
      'next_page_url',
      'previous_page_url',
    ])
    assert.isArray(data)
    for (let i = 0; i < data.length; i++)
      assert.properties(data[i], [
        'id',
        'first_name',
        'last_name',
        'username',
        'email',
        'remember_me_token',
        'is_online',
        'full_name',
      ])
  })
})
