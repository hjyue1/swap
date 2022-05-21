import { ResponseTransformer } from '../response';
export declare type DataContext<T> = (payload: T) => ResponseTransformer;
export declare const data: DataContext<Record<string, unknown>>;
