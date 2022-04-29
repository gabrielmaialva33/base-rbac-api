import { test } from '@japa/runner'

import { UserFactory } from 'Database/factories'

test.group('User:List', () => {
  test('it should be able to list users with pagination', async ({ client, assert }) => {
    await UserFactory.createMany(10)

    const response = await client.get('/users').qs({
      page: 2,
      per_page: 5,
      search: '',
    })
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