import { ResponseTransformer } from '../response';
export declare const xml: <BodyType extends string>(body: BodyType) => ResponseTransformer<BodyType>;
