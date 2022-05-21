import { Mask } from './setupWorker/glossary'
import { ResponseResolver } from './handlers/RequestHandler'
import {
  GraphQLHandler,
  GraphQLContext,
  GraphQLRequest,
  GraphQLVariables,
  ExpectedOperationTypeNode,
  GraphQLHandlerNameSelector,
} from './handlers/GraphQLHandler'

function createScopedGraphQLHandler(
  operationType: ExpectedOperationTypeNode,
  url: Mask,
) {
  return <
    Query extends Record<string, any>,
    Variables extends GraphQLVariables = GraphQLVariables
  >(
    operationName: GraphQLHandlerNameSelector,
    resolver: ResponseResolver<
      GraphQLRequest<Variables>,
      GraphQLContext<Query>
    >,
  ) => {
    return new GraphQLHandler(operationType, operationName, url, resolver)
  }
}

function createGraphQLOperationHandler(url: Mask) {
  return <
    Query extends Record<string, any>,
    Variables extends GraphQLVariables = GraphQLVariables
  >(
    resolver: ResponseResolver<
      GraphQLRequest<Variables>,
      GraphQLContext<Query>
    >,
  ) => {
    return new GraphQLHandler('all', new RegExp('.*'), url, resolver)
  }
}

const standardGraphQLHandlers = {
  operation: createGraphQLOperationHandler('*'),
  query: createScopedGraphQLHandler('query', '*'),
  mutation: createScopedGraphQLHandler('mutation', '*'),
}

function createGraphQLLink(url: Mask): typeof standardGraphQLHandlers {
  return {
    operation: createGraphQLOperationHandler(url),
    query: createScopedGraphQLHandler('query', url),
    mutation: createScopedGraphQLHandler('mutation', url),
  }
}

export const graphql = {
  ...standardGraphQLHandlers,
  link: createGraphQLLink,
}
