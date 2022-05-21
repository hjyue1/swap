import { IsomorphicResponse } from '@mswjs/interceptors';
import { MockedRequest, RequestHandler } from '../handlers/RequestHandler';
import { SharedOptions } from '../sharedOptions';
export interface ServerLifecycleEventsMap {
    'request:start': (request: MockedRequest) => void;
    'request:match': (request: MockedRequest) => void;
    'request:unhandled': (request: MockedRequest) => void;
    'request:end': (request: MockedRequest) => void;
    'response:mocked': (response: IsomorphicResponse, requestId: string) => void;
    'response:bypass': (response: IsomorphicResponse, requestId: string) => void;
}
export interface SetupServerApi {
    listen(options?: SharedOptions): void;
    close(): void;
    use(...handlers: RequestHandler[]): void;
    restoreHandlers(): void;
    resetHandlers(...nextHandlers: RequestHandler[]): void;
    printHandlers(): void;
    /**
     * Attaches a listener to one of the life-cycle events.
     */
    on<EventType extends keyof ServerLifecycleEventsMap>(eventType: EventType, listener: ServerLifecycleEventsMap[EventType]): void;
}
