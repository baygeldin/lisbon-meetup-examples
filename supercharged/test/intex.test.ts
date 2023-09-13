import { env, request } from 'test/helpers'

describe('worker', () => {
  beforeAll(() => {
    (global as any).appUrl = env.HOMEPAGE_URL
  })

  describe('when accessing any path', () => {
    it('passes the request through', async () => {
      const path = '/hello'
      const body = 'Hello World!'

      expect({ url: `${env.HOMEPAGE_URL}${path}` })
        .toBeFetchedAndReturn({ body })

      const res = await request(path)

      expect(await res.text()).toBe(body)
    })
  })

  describe('when accessing /geo', () => {
    it('returns geolocation data', async () => {
      const path = '/geo'

      const res = await request(path)

      expect(await res.text()).toContain('Geolocation: Hello World!')
    })
  })

  describe('when accessing /', () => {
    // FIXME: currently this fails due to a bug in `html-rewriter-wasm`:
    // "recursive use of an object detected which would lead to unsafe aliasing in rust".
    xit('returns a translated hello world message', async () => {
      const path = '/'
      const body = '<html><span id="caption"></span></html>'

      // We make two requests in the tests, so we mock subrequests to the homepage twice:
      expect({ url: `${env.HOMEPAGE_URL}${path}` })
        .toBeFetchedAndReturnTimes({ body }, 2)

      // But we only expect the hello API to be called once because we cache the response:
      expect({ url: `${env.HELLO_API_URL}/?cc=GB` })
        .toBeFetchedAndReturn({ body: '{"code":"gb","hello":"Hello"}' })

      const res = await request(path)
      const html = await res.clone().text()

      expect(html).toContain('ｈｅｌｌｏ')

      const anotherRes = await request(path)
      const anotherHtml = await anotherRes.clone().text()

      expect(anotherHtml).toContain('ｈｅｌｌｏ')
    })
  })
})
