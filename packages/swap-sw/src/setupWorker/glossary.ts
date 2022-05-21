import { HeadersList } from 'headers-utils'
import { StrictEventEmitter } from 'strict-event-emitter'
import { MockedResponse } from '../response'
import { SharedOptions } from '../sharedOptions'
import { ServiceWorkerMessage } from '../utils/createBroadcastChannel'
import { createStart } from './start/createStart'
import { createStop } from './stop/createStop'
import { MockedRequest, RequestHandler } from '../handlers/RequestHandler'

export type Mask = RegExp | string
export type ResolvedMask = Mask | URL

type RequestWithoutMethods = Omit<
  Request,
  | 'text'
  | 'body'
  | 'json'
  | 'blob'
  | 'arrayBuffer'
  | 'formData'
  | 'clone'
  | 'signal'
  | 'isHistoryNavigation'
  | 'isReloadNavigation'
>

/**
 * Request representation received from the worker message event.
 */
export interface ServiceWorkerIncomingRequest extends RequestWithoutMethods {
  /**
   * Unique UUID of the request generated once the request is
   * captured by the "fetch" event in the Service Worker.
   */
  id: string

  /**
   * Text response body.
   */
  body: string | undefined
}

export type ServiceWorkerIncomingResponse = Pick<
  Response,
  'type' | 'ok' | 'status' | 'statusText' | 'body' | 'headers' | 'redirected'
> & {
  requestId: string
}

/**
 * Map of the events that can be received from the Service Worker.
 */
export interface ServiceWorkerIncomingEventsMap {
  MOCKING_ENABLED: boolean
  INTEGRITY_CHECK_RESPONSE: string
  KEEPALIVE_RESPONSE: never
  REQUEST: ServiceWorkerIncomingRequest
  RESPONSE: ServiceWorkerIncomingResponse
}

/**
 * Map of the events that can be sent to the Service Worker
 * from any execution context.
 */
export type ServiceWorkerOutgoingEventTypes =
  | 'MOCK_ACTIVATE'
  | 'MOCK_DEACTIVATE'
  | 'INTEGRITY_CHECK_REQUEST'
  | 'KEEPALIVE_REQUEST'
  | 'CLIENT_CLOSED'
  | 'ONLINE'
  | 'OFFLINE'

/**
 * Map of the events that can be sent to the Service Worker
 * only as a part of a single `fetch` event handler.
 */
export type ServiceWorkerFetchEventTypes =
  | 'MOCK_SUCCESS'
  | 'MOCK_BY_PASS'
  | 'MOCK_NOT_FOUND'
  | 'NETWORK_ERROR'
  | 'INTERNAL_ERROR'

export interface WorkerLifecycleEventsMap {
  'request:start': (request: MockedRequest) => void
  'request:match': (request: MockedRequest) => void
  'request:unhandled': (request: MockedRequest) => void
  'request:end': (request: MockedRequest) => void
  'response:mocked': (response: Response, requestId: string) => void
  'response:bypass': (response: Response, requestId: string) => void
}

export interface SetupWorkerInternalContext {
  startOptions: StartOptions | undefined
  worker: ServiceWorker | null
  registration: ServiceWorkerRegistration | null
  requestHandlers: RequestHandler[]
  emitter: StrictEventEmitter<WorkerLifecycleEventsMap>
  keepAliveInterval?: number
  workerChannel: {
    /**
     * Adds a Service Worker event listener.
     */
    on<EventType extends keyof ServiceWorkerIncomingEventsMap>(
      eventType: EventType,
      callback: (
        event: MessageEvent,
        message: ServiceWorkerMessage<
          EventType,
          ServiceWorkerIncomingEventsMap[EventType]
        >,
      ) => void,
    ): void
    send<EventType extends ServiceWorkerOutgoingEventTypes>(
      eventType: EventType,
    ): void
  }
  events: {
    /**
     * Adds an event listener on the given target.
     * Returns a clean-up function that removes that listener.
     */
    addListener<E extends Event>(
      target: EventTarget,
      eventType: string,
      listener: (event: E) => void,
    ): () => void
    /**
     * Removes all currently attached listeners.
     */
    removeAllListeners(): void
    /**
     * Awaits a given message type from the Service Worker.
     */
    once<EventType extends keyof ServiceWorkerIncomingEventsMap>(
      eventType: EventType,
    ): Promise<
      ServiceWorkerMessage<EventType, ServiceWorkerIncomingEventsMap[EventType]>
    >
  }
}

export type ServiceWorkerInstanceTuple = [
  ServiceWorker | null,
  ServiceWorkerRegistration,
]

export type FindWorker = (
  scriptUrl: string,
  mockServiceWorkerUrl: string,
) => boolean

export type StartOptions = SharedOptions & {
  /**
   * Service Worker instance options.
   */
  serviceWorker?: {
    url?: string
    options?: RegistrationOptions
  }

  /**
   * Disables the logging of captured requests
   * into browser's console.
   */
  quiet?: boolean

  /**
   * Defers any network requests until the Service Worker
   * instance is ready. Defaults to `true`.
   */
  waitUntilReady?: boolean

  /**
   * A custom lookup function to find a Mock Service Worker in the list
   * of all registered Service Workers on the page.
   */
  findWorker?: FindWorker

  /**
   * A custom bypass mode to bypass a request in the list
   * of all request on the page.
   */
  bypassMode?: 'none' | 'api' | 'jsbridge'

  /**
   * Whether to enable online mock mode
   */
  isOnline?: boolean

  /**
   * The prefix address of the resource
   */
  baseURL?: string
}

export type ResponseWithSerializedHeaders<BodyType = any> = Omit<
  MockedResponse<BodyType>,
  'headers'
> & {
  headers: HeadersList
}

export interface SetupWorkerApi {
  start: ReturnType<typeof createStart>
  stop: ReturnType<typeof createStop>
  use: (...handlers: RequestHandler[]) => void
  restoreHandlers: () => void
  resetHandlers: (...nextHandlers: RequestHandler[]) => void
  printHandlers: () => void
  on<EventType extends keyof WorkerLifecycleEventsMap>(
    eventType: EventType,
    listener: WorkerLifecycleEventsMap[EventType],
  ): void
}
