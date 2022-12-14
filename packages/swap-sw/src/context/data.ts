import { jsonParse } from '../utils/internal/jsonParse'
import { mergeRight } from '../utils/internal/mergeRight'
import { json } from './json'
import { GraphQLPayloadContext } from '../typeUtils'


export const data: GraphQLPayloadContext<Record<string, unknown>> = (
  payload,
) => {
  return (res) => {
    const prevBody = jsonParse(res.body) || {}
    const nextBody = mergeRight(prevBody, { data: payload })

    return json(nextBody)(res)
  }
}
