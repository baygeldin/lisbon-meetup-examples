import { Hono } from 'hono'
import { logger } from 'hono/logger'

import { Env } from 'types'

const app = new Hono<{ Bindings: Env }>()

app.use('*', logger())

app.get('*', (ctx) => {
  return fetch(ctx.req.raw)
})

export default app
