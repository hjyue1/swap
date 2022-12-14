import type { PartialDeep } from 'type-fest'
import type { IsomorphicResponse } from '@mswjs/interceptors'
import {
  DefaultBodyType,
  RequestHandler,
  RequestHandlerDefaultInfo,
} from '../handlers/RequestHandler'
import {
  LifeCycleEventEmitter,
  LifeCycleEventsMap,
  SharedOptions,
} from '../sharedOptions'
import { MockedRequest } from '../utils/request/MockedRequest'

export type ServerLifecycleEventsMap = LifeCycleEventsMap<IsomorphicResponse>

export interface SetupServerApi {
  listen(options?: PartialDeep<SharedOptions>): void
  close(): void
  use(...handlers: RequestHandler[]): void
  restoreHandlers(): void
  resetHandlers(...nextHandlers: RequestHandler[]): void
  listHandlers(): ReadonlyArray<
    RequestHandler<
      RequestHandlerDefaultInfo,
      MockedRequest<DefaultBodyType>,
      any,
      MockedRequest<DefaultBodyType>
    >
  >

  printHandlers(): void

  events: LifeCycleEventEmitter<ServerLifecycleEventsMap>
}
