import { ResponseTransformer } from '../response';
export declare const text: <BodyType extends string>(body: BodyType) => ResponseTransformer<BodyType>;
