import { Mask } from './setupWorker/glossary';
import { ResponseResolver } from './handlers/RequestHandler';
import { GraphQLHandler, GraphQLContext, GraphQLRequest, GraphQLVariables, GraphQLHandlerNameSelector } from './handlers/GraphQLHandler';
declare const standardGraphQLHandlers: {
    operation: <Query extends Record<string, any>, Variables extends GraphQLVariables = GraphQLVariables>(resolver: ResponseResolver<GraphQLRequest<Variables>, GraphQLContext<Query>, any>) => GraphQLHandler<GraphQLRequest<any>>;
    query: <Query_1 extends Record<string, any>, Variables_1 extends GraphQLVariables = GraphQLVariables>(operationName: GraphQLHandlerNameSelector, resolver: ResponseResolver<GraphQLRequest<Variables_1>, GraphQLContext<Query_1>, any>) => GraphQLHandler<GraphQLRequest<any>>;
    mutation: <Query_1 extends Record<string, any>, Variables_1 extends GraphQLVariables = GraphQLVariables>(operationName: GraphQLHandlerNameSelector, resolver: ResponseResolver<GraphQLRequest<Variables_1>, GraphQLContext<Query_1>, any>) => GraphQLHandler<GraphQLRequest<any>>;
};
declare function createGraphQLLink(url: Mask): typeof standardGraphQLHandlers;
export declare const graphql: {
    link: typeof createGraphQLLink;
    operation: <Query extends Record<string, any>, Variables extends GraphQLVariables = GraphQLVariables>(resolver: ResponseResolver<GraphQLRequest<Variables>, GraphQLContext<Query>, any>) => GraphQLHandler<GraphQLRequest<any>>;
    query: <Query_1 extends Record<string, any>, Variables_1 extends GraphQLVariables = GraphQLVariables>(operationName: GraphQLHandlerNameSelector, resolver: ResponseResolver<GraphQLRequest<Variables_1>, GraphQLContext<Query_1>, any>) => GraphQLHandler<GraphQLRequest<any>>;
    mutation: <Query_1 extends Record<string, any>, Variables_1 extends GraphQLVariables = GraphQLVariables>(operationName: GraphQLHandlerNameSelector, resolver: ResponseResolver<GraphQLRequest<Variables_1>, GraphQLContext<Query_1>, any>) => GraphQLHandler<GraphQLRequest<any>>;
};
export {};
