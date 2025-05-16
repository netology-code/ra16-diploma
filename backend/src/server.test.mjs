import { describe, it, before, after } from 'node:test'
import assert from 'node:assert'
import { createServer } from './server.mjs'
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const categoriesPath = path.join(__dirname, 'data', 'categories.json')
const productsPath = path.join(__dirname, 'data', 'products.json')

const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'))
const items = JSON.parse(fs.readFileSync(productsPath, 'utf-8'))

const topSaleIds = [66, 65, 73]

describe('API Server', () => {
  let server
  let BASE_URL = 'http://localhost' // `http://localhost:${TEST_PORT}`;

  before(() => {
    server = createServer(0)
    BASE_URL = `${BASE_URL}:${server.address().port}`
  })

  after(() => new Promise(resolve => server.close(resolve)))

  it('should handle CORS headers', async () => {
    const res = await fetch(`${BASE_URL}/api/top-sales`)
    assert.strictEqual(res.headers.get('access-control-allow-origin'), '*')
  })

  it('GET /api/top-sales should return top sales items', async () => {
    const res = await fetch(`${BASE_URL}/api/top-sales`)
    const data = await res.json()

    assert.strictEqual(res.status, 200)
    assert.strictEqual(data.length, 3)
    data.forEach(item => assert(topSaleIds.includes(item.id)))
  })

  it('GET /api/categories should return categories list', async () => {
    const res = await fetch(`${BASE_URL}/api/categories`)
    const data = await res.json()

    assert.strictEqual(res.status, 200)
    assert.strictEqual(data.length, categories.length)
    assert.deepStrictEqual(data, categories)
  })

  it('GET /api/items should filter by category', async () => {
    const categoryId = categories[0].id
    const res = await fetch(`${BASE_URL}/api/items?categoryId=${categoryId}`)
    const data = await res.json()

    assert(data.every(item => item.category === categoryId))
  })

  it('GET /api/items/:id should return item details', async () => {
    const testItem = items[0]
    const res = await fetch(`${BASE_URL}/api/items/${testItem.id}`)
    const data = await res.json()

    assert.strictEqual(res.status, 200)
    assert.strictEqual(data.id, testItem.id)
  })

  it('POST /api/order should validate request body', async () => {
    const testCases = [
      { body: {}, expected: 400 },
      {
        body: { owner: { phone: '123', address: 'test' }, items: [] },
        expected: 204
      },
      {
        body: {
          owner: { phone: '123' },
          items: [{ id: 1, price: 100, count: 1 }]
        },
        expected: 400
      }
    ]

    for (const { body, expected } of testCases) {
      const res = await fetch(`${BASE_URL}/api/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      assert.strictEqual(res.status, expected)
    }
  })

  it('should return 404 for unknown routes', async () => {
    const res = await fetch(`${BASE_URL}/unknown-route`)
    assert.strictEqual(res.status, 404)
  })
})
