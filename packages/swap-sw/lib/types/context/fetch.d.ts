import { MockedRequest } from '../handlers/RequestHandler';
export declare const augmentRequestInit: (requestInit: RequestInit) => RequestInit;
export declare const fetch: (input: string | MockedRequest, requestInit?: RequestInit) => Promise<Response>;
