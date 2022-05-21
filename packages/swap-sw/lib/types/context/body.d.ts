import { ResponseTransformer } from '../response';
export declare const body: <BodyType extends string | Blob | BufferSource | ReadableStream<any> | FormData>(value: BodyType) => ResponseTransformer<BodyType>;
