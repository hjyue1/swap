import { ResponseTransformer } from '../response';
export declare const SET_TIMEOUT_MAX_ALLOWED_INT = 2147483647;
export declare const MIN_SERVER_RESPONSE_TIME = 100;
export declare const MAX_SERVER_RESPONSE_TIME = 400;
export declare const NODE_SERVER_RESPONSE_TIME = 5;
export declare type DelayMode = 'real' | 'infinite';
export declare const delay: (durationOrMode?: number | DelayMode | undefined) => ResponseTransformer;
