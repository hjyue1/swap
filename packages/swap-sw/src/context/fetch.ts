import { isNodeProcess } from 'is-node-process'
import { Headers } from 'headers-polyfill'
import { MockedRequest } from '../utils/request/MockedRequest'

const useFetch: (input: RequestInfo, init?: RequestInit) => Promise<Response> =
  isNodeProcess()
    ? (input, init) =>
        import('node-fetch').then(({ default: nodeFetch }) =>
          (nodeFetch as unknown as typeof window.fetch)(input, init),
        )
    : globalThis.fetch

export const augmentRequestInit = (requestInit: RequestInit): RequestInit => {
  const headers = new Headers(requestInit.headers)
  headers.set('x-swap-bypass', 'true')

  return {
    ...requestInit,
    headers: headers.all(),
  }
}

const createFetchRequestParameters = (input: MockedRequest): RequestInit => {
  const { body, method } = input
  const requestParameters: RequestInit = {
    ...input,
    body: undefined,
  }

  if (['GET', 'HEAD'].includes(method)) {
    return requestParameters
  }

  if (
    typeof body === 'object' ||
    typeof body === 'number' ||
    typeof body === 'boolean'
  ) {
    requestParameters.body = JSON.stringify(body)
  } else {
    requestParameters.body = body
  }

  return requestParameters
}

export const fetch = (
  input: string | MockedRequest,
  requestInit: RequestInit = {},
): Promise<Response> => {
  if (typeof input === 'string') {
    return useFetch(input, augmentRequestInit(requestInit))
  }

  const requestParameters = createFetchRequestParameters(input)
  const derivedRequestInit = augmentRequestInit(requestParameters)

  return useFetch(input.url.href, derivedRequestInit)
}
