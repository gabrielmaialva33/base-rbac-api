import { test } from '@japa/runner'
import { UserFactory } from 'Database/factories'

test.group('Users:Show', () => {
  test('it should be able to show a user', async ({ client }) => {
    const user = await UserFactory.create()
    const response = await client.get(`/users/${user.id}`)
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
