import { PartialDeep } from 'type-fest';
import { IsomorphicResponse } from '@mswjs/interceptors';
import { Headers, FlatHeadersObject } from 'headers-polyfill';
import { StrictEventEmitter } from 'strict-event-emitter';

declare type MaybePromise<ValueType = any> = ValueType | Promise<ValueType>;
/**
 * Internal representation of a mocked response instance.
 */
interface MockedResponse<BodyType = any> {
    body: BodyType;
    status: number;
    statusText: string;
    headers: Headers;
    once: boolean;
    passthrough: boolean;
    delay?: number;
}
declare type ResponseTransformer<BodyType extends TransformerBodyType = any, TransformerBodyType = any> = (res: MockedResponse<TransformerBodyType>) => MaybePromise<MockedResponse<BodyType>>;
declare type ResponseFunction<BodyType = any> = (...transformers: ResponseTransformer<BodyType>[]) => MaybePromise<MockedResponse<BodyType>>;
declare type ResponseComposition<BodyType = any> = ResponseFunction<BodyType> & {
    /**
     * Respond using a given mocked response to the first captured request.
     * Does not affect any subsequent captured requests.
     */
    once: ResponseFunction<BodyType>;
    networkError: (message: string) => void;
};
declare const defaultResponse: Omit<MockedResponse, 'headers'>;
declare type ResponseCompositionOptions<BodyType> = {
    defaultTransformers?: ResponseTransformer<BodyType>[];
    mockedResponseOverrides?: Partial<MockedResponse>;
};
declare function createResponseComposition<BodyType>(responseOverrides?: Partial<MockedResponse<BodyType>>, defaultTransformers?: ResponseTransformer<BodyType>[]): ResponseFunction;
declare const response: ResponseFunction<any> & {
    once: ResponseFunction<any>;
    networkError(message: string): never;
};

declare const status: (statusCode: number, statusText?: string | undefined) => ResponseTransformer;

declare type HeadersObject<KeyType extends string = string> = Record<KeyType, string | string[]>;
/**
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name
 */
declare type ForbiddenHeaderNames = 'cookie' | 'cookie2' | 'set-cookie' | 'set-cookie2';
declare type ForbiddenHeaderError<HeaderName extends string> = `SafeResponseHeader: the '${HeaderName}' header cannot be set on the response. Please use the 'ctx.cookie()' function instead.`;
/**
 * Sets one or multiple response headers.
 * @example
 * ctx.set('Content-Type', 'text/plain')
 * ctx.set({
 *   'Accept': 'application/javascript',
 *   'Content-Type': "text/plain"
 * })
 */
declare function set<N extends string | HeadersObject>(...args: N extends string ? Lowercase<N> extends ForbiddenHeaderNames ? ForbiddenHeaderError<N> : [N, string] : N extends HeadersObject<infer CookieName> ? Lowercase<CookieName> extends ForbiddenHeaderNames ? ForbiddenHeaderError<CookieName> : [N] : [N]): ResponseTransformer;

declare type DelayMode = 'real' | 'infinite';
declare const delay: (durationOrMode?: number | DelayMode | undefined) => ResponseTransformer;

interface ResponseLookupResult {
    handler?: RequestHandler;
    publicRequest?: any;
    parsedRequest?: any;
    response?: MockedResponse;
}
interface ResponseResolutionContext {
    baseUrl?: string;
}

interface UnhandledRequestPrint {
    warning(): void;
    error(): void;
}
declare type UnhandledRequestCallback = (request: MockedRequest, print: UnhandledRequestPrint) => void;
declare type UnhandledRequestStrategy = 'bypass' | 'warn' | 'error' | UnhandledRequestCallback;

interface SharedOptions {
    /**
     * Specifies how to react to a request that has no corresponding
     * request handler. Warns on unhandled requests by default.
     *
     * @example worker.start({ onUnhandledRequest: 'bypass' })
     * @example worker.start({ onUnhandledRequest: 'warn' })
     * @example server.listen({ onUnhandledRequest: 'error' })
     */
    onUnhandledRequest?: UnhandledRequestStrategy;
    /**
     * A custom bypass mode to bypass a request in the list
     * of all request on the page.
     */
    bypassMode?: 'none' | 'api' | 'jsbridge';
    /**
     * Whether to enable online mock mode
     */
    isOnline?: boolean;
    /**
     * The prefix address of the resource
     */
    baseURL?: string;
}
interface LifeCycleEventsMap<ResponseType> {
    'request:start': (request: MockedRequest) => void;
    'request:match': (request: MockedRequest) => void;
    'request:unhandled': (request: MockedRequest) => void;
    'request:end': (request: MockedRequest) => void;
    'response:mocked': (response: ResponseType, requestId: string) => void;
    'response:bypass': (response: ResponseType, requestId: string) => void;
    unhandledException: (error: Error, request: MockedRequest) => void;
}
declare type LifeCycleEventEmitter<ResponseType> = Pick<StrictEventEmitter<ResponseType>, 'on' | 'removeListener' | 'removeAllListeners'>;

declare type WorkerLifecycleEventsMap = LifeCycleEventsMap<Response>;
declare type FindWorker = (scriptUrl: string, swapSWUrl: string) => boolean;
interface StartOptions extends SharedOptions {
    /**
     * Service Worker registration options.
     */
    serviceWorker?: {
        /**
         * Custom url to the worker script.
         * @default "./swapSW.js"
         */
        url?: string;
        options?: RegistrationOptions;
    };
    /**
     * Disables the logging of captured requests
     * into browser's console.
     * @default false
     */
    quiet?: boolean;
    /**
     * Defers any network requests until the Service Worker
     * instance is activated.
     * @default true
     */
    waitUntilReady?: boolean;
    /**
     * A custom lookup function to find a Mock Service Worker in the list
     * of all registered Service Workers on the page.
     */
    findWorker?: FindWorker;
}
interface SerializedResponse<BodyType = any> {
    status: number;
    statusText: string;
    headers: FlatHeadersObject;
    body: BodyType;
}
declare type StartReturnType = Promise<ServiceWorkerRegistration | undefined>;
declare type StopHandler = () => void;
interface SetupWorkerApi {
    start: (options?: StartOptions) => StartReturnType;
    stop: StopHandler;
    use: (...handlers: RequestHandler[]) => void;
    restoreHandlers: () => void;
    resetHandlers: (...nextHandlers: RequestHandler[]) => void;
    printHandlers: () => void;
    events: LifeCycleEventEmitter<WorkerLifecycleEventsMap>;
}

declare type DefaultContext = {
    status: typeof status;
    set: typeof set;
    delay: typeof delay;
    fetch: typeof fetch;
};
declare const defaultContext: DefaultContext;
declare type DefaultRequestMultipartBody = Record<string, string | File | (string | File)[]>;
declare type DefaultBodyType = Record<string, any> | DefaultRequestMultipartBody | string | number | boolean | null | undefined;
interface MockedRequest<Body = DefaultBodyType> {
    id: string;
    url: URL;
    method: Request['method'];
    headers: Headers;
    cookies: Record<string, string>;
    mode: Request['mode'];
    keepalive: Request['keepalive'];
    cache: Request['cache'];
    destination: Request['destination'];
    integrity: Request['integrity'];
    credentials: Request['credentials'];
    redirect: Request['redirect'];
    referrer: Request['referrer'];
    referrerPolicy: Request['referrerPolicy'];
    body: Body;
    bodyUsed: Request['bodyUsed'];
    passthrough: typeof passthrough;
}
interface RequestHandlerDefaultInfo {
    header: string;
}
interface RequestHandlerInternalInfo {
    callFrame?: string;
}
declare type ContextMap = Record<string, (...args: any[]) => any>;
declare type ResponseResolverReturnType<ReturnType> = ReturnType | undefined | void;
declare type MaybeAsyncResponseResolverReturnType<ReturnType> = MaybePromise<ResponseResolverReturnType<ReturnType>>;
declare type AsyncResponseResolverReturnType<ReturnType> = MaybeAsyncResponseResolverReturnType<ReturnType> | Generator<MaybeAsyncResponseResolverReturnType<ReturnType>, MaybeAsyncResponseResolverReturnType<ReturnType>, MaybeAsyncResponseResolverReturnType<ReturnType>>;
declare type ResponseResolver<RequestType = MockedRequest, ContextType = typeof defaultContext, BodyType = any> = (req: RequestType, res: ResponseComposition<BodyType>, context: ContextType) => AsyncResponseResolverReturnType<MockedResponse<BodyType>>;
interface RequestHandlerOptions<HandlerInfo> {
    info: HandlerInfo;
    resolver: ResponseResolver<any, any>;
    ctx?: ContextMap;
}
interface RequestHandlerExecutionResult<PublicRequestType> {
    handler: RequestHandler;
    parsedResult: any;
    request: PublicRequestType;
    response?: MockedResponse;
}
declare abstract class RequestHandler<HandlerInfo extends RequestHandlerDefaultInfo = RequestHandlerDefaultInfo, Request extends MockedRequest = MockedRequest, ParsedResult = any, PublicRequest extends MockedRequest = Request> {
    info: HandlerInfo & RequestHandlerInternalInfo;
    shouldSkip: boolean;
    private ctx;
    private resolverGenerator?;
    private resolverGeneratorResult?;
    protected resolver: ResponseResolver<any, any>;
    constructor(options: RequestHandlerOptions<HandlerInfo>);
    /**
     * Determine if the captured request should be mocked.
     */
    abstract predicate(request: MockedRequest, parsedResult: ParsedResult, resolutionContext?: ResponseResolutionContext): boolean;
    /**
     * Print out the successfully handled request.
     */
    abstract log(request: Request, response: SerializedResponse<any>, handler: this, parsedResult: ParsedResult): void;
    /**
     * Parse the captured request to extract additional information from it.
     * Parsed result is then exposed to other methods of this request handler.
     */
    parse(_request: MockedRequest, _resolutionContext?: ResponseResolutionContext): ParsedResult;
    /**
     * Test if this handler matches the given request.
     */
    test(request: MockedRequest, resolutionContext?: ResponseResolutionContext): boolean;
    /**
     * Derive the publicly exposed request (`req`) instance of the response resolver
     * from the captured request and its parsed result.
     */
    protected getPublicRequest(request: MockedRequest, _parsedResult: ParsedResult): PublicRequest;
    markAsSkipped(shouldSkip?: boolean): void;
    /**
     * Execute this request handler and produce a mocked response
     * using the given resolver function.
     */
    run(request: MockedRequest, resolutionContext?: ResponseResolutionContext): Promise<RequestHandlerExecutionResult<PublicRequest> | null>;
    private wrapResolver;
    private createExecutionResult;
}
/**
 * Bypass this intercepted request.
 * This will make a call to the actual endpoint requested.
 */
declare function passthrough(): MockedResponse<null>;

declare const fetch: (input: string | MockedRequest, requestInit?: RequestInit) => Promise<Response>;

declare type ServerLifecycleEventsMap = LifeCycleEventsMap<IsomorphicResponse>;
interface SetupServerApi {
    listen(options?: PartialDeep<SharedOptions>): void;
    close(): void;
    use(...handlers: RequestHandler[]): void;
    restoreHandlers(): void;
    resetHandlers(...nextHandlers: RequestHandler[]): void;
    printHandlers(): void;
    events: LifeCycleEventEmitter<ServerLifecycleEventsMap>;
}

export { AsyncResponseResolverReturnType as A, DefaultContext as D, MockedRequest as M, ResponseTransformer as R, SetupWorkerApi as S, set as a, RequestHandler as b, DefaultBodyType as c, delay as d, ResponseResolver as e, fetch as f, ResponseResolutionContext as g, SerializedResponse as h, RequestHandlerDefaultInfo as i, MockedResponse as j, ResponseLookupResult as k, SharedOptions as l, ServerLifecycleEventsMap as m, defaultResponse as n, createResponseComposition as o, defaultContext as p, StartOptions as q, response as r, status as s, ResponseResolverReturnType as t, DefaultRequestMultipartBody as u, ResponseComposition as v, ResponseCompositionOptions as w, ResponseFunction as x, DelayMode as y, SetupServerApi as z };
