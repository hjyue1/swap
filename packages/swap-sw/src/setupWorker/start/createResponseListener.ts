import {
  ServiceWorkerIncomingEventsMap,
  SetupWorkerInternalContext,
} from '../../setupWorker/glossary'
import { ServiceWorkerMessage } from './utils/createMessageChannel'

export function createResponseListener(context: SetupWorkerInternalContext) {
  return (
    _: MessageEvent,
    message: ServiceWorkerMessage<
      'RESPONSE',
      ServiceWorkerIncomingEventsMap['RESPONSE']
    >,
  ) => {
    const { payload: responseJson } = message

    if (responseJson.type?.includes('opaque')) {
      return
    }

    const response = new Response(responseJson.body || null, responseJson)
    const isMockedResponse = response.headers.get('x-powered-by') === 'swap'

    if (isMockedResponse) {
      context.emitter.emit('response:mocked', response, responseJson.requestId)
    } else {
      context.emitter.emit('response:bypass', response, responseJson.requestId)
    }
  }
}
