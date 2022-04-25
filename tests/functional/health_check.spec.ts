import { test } from '@japa/runner'

test('display app healthy check', async ({ client }) => {
  const response = await client.get('/health')

  response.assertStatus(200)
  response.assertBodyContains({ healthy: true })
})
