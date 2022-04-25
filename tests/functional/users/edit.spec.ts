import { test } from '@japa/runner'

import { UserFactory } from 'Database/factories'

test.group('User:Edit', () => {
  test('it should be able to edit a user', async ({ client }) => {
    const oldUser = await UserFactory.create()
    const newUser = await UserFactory.make()

    const response = await client.put(`/users/${oldUser.id}`).json({
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      username: newUser.username,
      email: newUser.email,
      password: '123456',
      password_confirmation: '123456',
    })
    response.assertStatus(200)
    response.assertBodyContains({
      id: oldUser.id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      username: newUser.username,
      email: newUser.email,
    })
  })
})
