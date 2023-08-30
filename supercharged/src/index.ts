import { Hono } from 'hono'
import { logger } from 'hono/logger'

import geo from 'handlers/geo'
import hello from 'handlers/hello'

declare global {
  type Env = {
    HOMEPAGE_URL: string
    DEPLOY_TIMESTAMP: string
    KV: KVNamespace
  }
}

const app = new Hono<{ Bindings: Env }>()

app.use('*', logger())

app.get('/geo', geo())

app.get('/', hello())

app.get('*', (ctx) => {
  return fetch(ctx.req.raw)
})

export default app
