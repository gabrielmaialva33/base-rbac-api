import { test } from '@japa/runner'
import { UserFactory } from 'Database/factories'

const LOGIN = {
  uid: 'admin',
  password: 'rbac@2022',
}

test.group('Users:Show', () => {
  test('it should be able to show a user', async ({ client, assert }) => {
    /** login admin user */
    const loginResponse = await client.post('/login').json(LOGIN)
    loginResponse.assertStatus(200)

    const authBody = loginResponse.body()
    assert.properties(authBody, ['type', 'token', 'expires_at'])

    const user = await UserFactory.create()
    const response = await client.get(`/users/${user.id}`).bearerToken(authBody.token)
    response.assertStatus(200)
    response.assertBodyContains({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
    })
  })
})
