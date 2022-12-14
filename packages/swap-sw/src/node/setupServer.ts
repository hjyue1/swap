import { ClientRequestInterceptor } from '@mswjs/interceptors/lib/interceptors/ClientRequest/index.js'
import { XMLHttpRequestInterceptor } from '@mswjs/interceptors/lib/interceptors/XMLHttpRequest/index.js'
import { RequestHandler } from '../handlers/RequestHandler'
import { SetupServerApi } from './SetupServerApi'

export const setupServer = (
  ...handlers: Array<RequestHandler>
): SetupServerApi => {
  return new SetupServerApi(
    [ClientRequestInterceptor, XMLHttpRequestInterceptor],
    ...handlers,
  )
}
