import { Hono } from 'hono'
import { logger } from 'hono/logger'

import geo from 'handlers/geo'
import hello from 'handlers/hello'

declare global {
  // eslint-disable-next-line
  type Env = {
    KV: KVNamespace
    DEPLOY_TIMESTAMP: string
    HOMEPAGE_URL: string
    HELLO_API_URL: string
  }
}

const app = new Hono<{ Bindings: Env }>()

app.use('*', logger())

app.get('/geo', geo())

app.get('/', hello())

app.get('*', async (ctx) => {
  return await fetch(ctx.req.raw)
})

export default app
