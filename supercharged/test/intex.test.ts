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
        .toBeFetchedAndReturnTimes({ body }, 1)

      const res = await request(path)

      expect(await res.text()).toBe(body)
    })
  })
})
