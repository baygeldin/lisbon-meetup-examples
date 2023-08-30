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
})
