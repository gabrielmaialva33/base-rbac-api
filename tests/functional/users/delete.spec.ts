import { test } from '@japa/runner'
import { UserFactory } from 'Database/factories'

test.group('User:Delete', () => {
  test('it should be able to delete a user', async ({ client }) => {
    const user = await UserFactory.create()

    const response = await client.delete(`/users/${user.id}`)
    response.assertStatus(200)
    response.assertBodyContains({
      message: 'User deleted successfully.',
    })
  })
})
