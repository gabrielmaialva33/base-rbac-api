import { test } from '@japa/runner'

const LOGIN = {
  uid: 'admin',
  password: 'rbac@2022',
}

test.group('Roles:List', () => {
  test('it should be able to list roles with pagination', async ({ client, assert }) => {
    /** login admin user */
    const loginResponse = await client.post('/login').json(LOGIN)
    loginResponse.assertStatus(200)

    const authBody = loginResponse.body()
    assert.properties(authBody, ['type', 'token', 'expires_at'])

    /** fetch api to list roles with pagination */
    const rolesResponse = await client.get('/roles').bearerToken(authBody.token)
    rolesResponse.assertStatus(200)

    assert.isObject(rolesResponse.body())

    const { meta, data } = rolesResponse.body()
    assert.isObject(meta)
    assert.isArray(data)

    /* assert pagination keys **/
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

    /* assert data keys **/
    for (const role of data)
      assert.properties(role, [
        'id',
        'slug',
        'description',
        'deletable',
        'is_active',
        'permissions',
      ])
  })
})
