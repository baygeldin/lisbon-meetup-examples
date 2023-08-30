import type { Interceptable } from '@miniflare/shared-test-environment/globals'

import worker from 'index'

export const env = getMiniflareBindings()
export const fetchMock = getMiniflareFetchMock()

export const origins: string[] = [
  env.HOMEPAGE_URL,
  env.HELLO_API_URL,
]

export const mockClients = origins.reduce((acc, origin) => {
  const { host } = new URL(origin)

  acc[host] = fetchMock.get(origin)

  return acc
}, <Record<string, Interceptable>>{})

export interface MockRequest {
  url: string
  method?: string
  headers?: Record<string, string>
}

export interface MockResponse {
  status?: number
  body?: string
  headers?: Record<string, string>
}

// Intercepts a matching request and returns a response.
// The test will fail if the request is not intercepted exactly the specified number of times!
// See: https://undici.nodejs.org/#/docs/api/MockAgent
export function mockRequest(req: MockRequest, res: MockResponse, times: number) {
  const { url, method = 'GET' } = req
  const { status = 200, body = '' } = res

  const { host, pathname } = new URL(url)

  mockClients[host]
    .intercept({ method, path: pathname, headers: req.headers })
    .reply(status, body, { headers: res.headers })
    .times(times)
}

export async function request(path: string, headers?: Record<string, string>) {
  const appUrl = (global as any).appUrl
  const ctx = new ExecutionContext()
  const req = new Request(`${appUrl}${path}`, { headers })
  const res = await worker.fetch(req, env, ctx)

  // Wait until the worker has finished processing the request.
  // Useful for cases when the worker returns a response early,
  // but continues to do some work in the background.
  await getMiniflareWaitUntil<void[]>(ctx)

  return res
}
