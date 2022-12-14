import { XMLHttpRequestInterceptor } from '@mswjs/interceptors/lib/interceptors/XMLHttpRequest'
import { RequestHandler } from '../handlers/RequestHandler'
import { SetupServerApi } from '../node/SetupServerApi'

export function setupServer(
  ...handlers: Array<RequestHandler>
): SetupServerApi {
  // Provision request interception via patching the `XMLHttpRequest` class only
  // in React Native. There is no `http`/`https` modules in that environment.
  return new SetupServerApi([XMLHttpRequestInterceptor], ...handlers)
}
