import type { Handler } from 'hono'

import fullwidth from 'fullwidth'
import { transliterate } from 'transliteration'
import { decode } from 'html-entities'

interface HelloResponse {
  code: string
  hello: string
}

export default function chat (): Handler {
  return async (ctx) => {
    const env: Env = ctx.env

    const rewriter = new HTMLRewriter().on('span#caption', {
      async element (element) {
        // eslint-disable-next-line
        const code = (ctx.req.raw.cf?.country || 'GB') as string

        const kv = ctx.env.KV
        const kvKey = `${code}-hello`

        // eslint-disable-next-line
        let hello = (await kv.get(kvKey) as string) || ''

        if (hello === '') {
          const url = new URL(`${env.HELLO_API_URL}/?cc=${code}`)

          const res = await fetch(url)
          const data: HelloResponse = await res.json()

          hello = decode(data.hello).toLowerCase()

          // Cache the response to KV in the background:
          ctx.executionCtx.waitUntil(kv.put(kvKey, hello))
        }

        const caption = fullwidth(`${transliterate(hello)} world`)

        element.setInnerContent(caption)
      }
    })

    const res = await fetch(ctx.req.raw, {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8'
      }
    })

    return rewriter.transform(res)
  }
}
