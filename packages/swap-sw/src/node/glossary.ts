import { PartialDeep } from 'type-fest'
import { IsomorphicResponse } from '@mswjs/interceptors'
import { RequestHandler } from '../handlers/RequestHandler'
import {
  LifeCycleEventEmitter,
  LifeCycleEventsMap,
  SharedOptions,
} from '../sharedOptions'

export type ServerLifecycleEventsMap = LifeCycleEventsMap<IsomorphicResponse>

export interface SetupServerApi {
  listen(options?: PartialDeep<SharedOptions>): void
  close(): void
  use(...handlers: RequestHandler[]): void
  restoreHandlers(): void
  resetHandlers(...nextHandlers: RequestHandler[]): void
  printHandlers(): void
  events: LifeCycleEventEmitter<ServerLifecycleEventsMap>
}
