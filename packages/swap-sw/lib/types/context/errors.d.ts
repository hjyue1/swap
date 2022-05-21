import { GraphQLError } from 'graphql';
import { ResponseTransformer } from '../response';
export declare const errors: <ErrorsType extends readonly Partial<GraphQLError>[] | null | undefined>(errorsList: ErrorsType) => ResponseTransformer<string>;
