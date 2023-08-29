import type { MockRequest, MockResponse } from 'test/helpers'

import { fetchMock, mockRequest } from 'test/helpers'

// Fail all network requests that aren't mocked:
fetchMock.disableNetConnect()

afterEach(() => {
  // Fails if there are mocked requests set up during the test that weren't used:
  fetchMock.assertNoPendingInterceptors()
})

// This is just a syntax sugar to make tests more readable.
// The actual assertion happens in the `afterEach` above.
expect.extend({
  toBeFetched(received: MockRequest): jest.CustomMatcherResult {
    mockRequest(received, {}, 1)

    return {
      pass: true,
      message: () => '',
    }
  },
  toBeFetchedAndReturn(received: MockRequest, response: MockResponse): jest.CustomMatcherResult {
    mockRequest(received, response, 1)

    return {
      pass: true,
      message: () => '',
    }
  },
  toBeFetchedTimes(received: MockRequest, times: number): jest.CustomMatcherResult {
    mockRequest(received, {}, times)

    return {
      pass: true,
      message: () => '',
    }
  },
  toBeFetchedAndReturnTimes(received: MockRequest, response: MockResponse, times: number): jest.CustomMatcherResult {
    mockRequest(received, response, times)

    return {
      pass: true,
      message: () => '',
    }
  },
})

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeFetched(): CustomMatcherResult
      toBeFetchedAndReturn(response: MockResponse): CustomMatcherResult
      toBeFetchedTimes(times: number): CustomMatcherResult
      toBeFetchedAndReturnTimes(response: MockResponse, times: number): CustomMatcherResult
    }
  }
}
