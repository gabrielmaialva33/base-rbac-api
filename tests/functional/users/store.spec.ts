import { test } from '@japa/runner'

import { UserFactory } from 'Database/factories'

test.group('User:Store', () => {
  test('it should be able to store a user', async ({ client }) => {
    const user = await UserFactory.make()

    const response = await client.post('/users').json({
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      password: user.password,
      password_confirmation: user.password,
    })

    response.assertStatus(200)
    response.assertBodyContains({
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
    })
  })
})
