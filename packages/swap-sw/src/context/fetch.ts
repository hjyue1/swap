import { Headers } from 'headers-utils'
import { MockedRequest } from '../handlers/RequestHandler'
import { isNodeProcess } from '../utils/internal/isNodeProcess'

const useFetch: (
  input: RequestInfo,
  init?: RequestInit,
) => Promise<Response> = isNodeProcess() ? require('node-fetch') : window.fetch

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

  requestParameters.body =
    typeof body === 'object' ? JSON.stringify(body) : body

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
