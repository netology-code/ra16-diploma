import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'
const { randomInt } = await import('node:crypto')
import { setTimeout } from 'node:timers/promises'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const categoriesPath = path.join(__dirname, 'data', 'categories.json')
const productsPath = path.join(__dirname, 'data', 'products.json')

const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'))
const items = JSON.parse(fs.readFileSync(productsPath, 'utf-8'))

const topSaleIds = [66, 65, 73]
const moreCount = 6

const itemBasicMapper = item => ({
  id: item.id,
  category: item.category,
  title: item.title,
  price: item.price,
  images: item.images
})

const config = {
  delay: process.env.APP_DELAY === 'true',
  error: process.env.APP_ERROR === 'true'
}

const parseRequestBody = req => {
  return new Promise(resolve => {
    let body = []
    req
      .on('data', chunk => {
        body.push(chunk)
      })
      .on('end', () => {
        body = Buffer.concat(body).toString()
        resolve(JSON.parse(body))
      })
  })
}

const setCorsHeaders = res => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

const handleOptionsRequest = (req, res) => {
  setCorsHeaders(res)
  res.writeHead(200)
  res.end()
}

const sendResponse = (res, statusCode, data = null) => {
  setCorsHeaders(res)
  res.writeHead(statusCode, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(data))
}

const createServer = (port = 7070) => {
  const server = http.createServer(async (req, res) => {
    if (req.method === 'OPTIONS') {
      return handleOptionsRequest(req, res)
    }

    if (config.delay) {
      await setTimeout(randomInt(100, 60_000))
    }

    if (config.error && Math.random() > 0.8) {
      sendResponse(res, 500, 'Internal server error')
    }

    const parsedUrl = url.parse(req.url, true)
    const pathname = parsedUrl.pathname
    const query = parsedUrl.query

    try {
      // Маршруты
      if (pathname === '/api/top-sales' && req.method === 'GET') {
        const topSales = items
          .filter(o => topSaleIds.includes(o.id))
          .map(itemBasicMapper)
        return sendResponse(res, 200, topSales)
      }

      if (pathname === '/api/categories' && req.method === 'GET') {
        return sendResponse(res, 200, categories)
      }

      if (pathname === '/api/items' && req.method === 'GET') {
        const categoryId = Number(query.categoryId || 0)
        const offset = Number(query.offset || 0)
        const q = (query.q || '').trim().toLowerCase()

        const filtered = items
          .filter(o => categoryId === 0 || o.category === categoryId)
          .filter(
            o =>
              o.title.toLowerCase().includes(q) || o.color.toLowerCase() === q
          )
          .slice(offset, offset + moreCount)
          .map(itemBasicMapper)

        return sendResponse(res, 200, filtered)
      }

      if (pathname.match(/^\/api\/items\/\d+$/) && req.method === 'GET') {
        const id = Number(pathname.split('/')[3])
        const item = items.find(o => o.id === id)
        return item
          ? sendResponse(res, 200, item)
          : sendResponse(res, 404, 'Not found')
      }

      if (pathname === '/api/order' && req.method === 'POST') {
        const body = await parseRequestBody(req)

        const { owner = {}, items: orderItems = [] } = body
        const { phone, address } = owner

        if (typeof phone !== 'string' || typeof address !== 'string') {
          return sendResponse(res, 400, 'Invalid owner data')
        }

        if (
          !Array.isArray(orderItems) ||
          !orderItems.every(
            item =>
              typeof item.id === 'number' &&
              typeof item.price === 'number' &&
              typeof item.count === 'number'
          )
        ) {
          return sendResponse(res, 400, 'Invalid items format')
        }

        return sendResponse(res, 204)
      }

      sendResponse(res, 404, 'Not found')
    } catch (error) {
      sendResponse(res, 500, 'Internal server error')
    }
  })

  server.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })

  return server
}

export { createServer }
