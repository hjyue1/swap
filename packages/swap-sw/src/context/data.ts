import { ResponseTransformer } from '../response'
import { jsonParse } from '../utils/internal/jsonParse'
import { mergeRight } from '../utils/internal/mergeRight'
import { json } from './json'

export type DataContext<T> = (payload: T) => ResponseTransformer

export const data: DataContext<Record<string, unknown>> = (payload) => {
  return (res) => {
    const prevBody = jsonParse(res.body) || {}
    const nextBody = mergeRight(prevBody, { data: payload })

    return json(nextBody)(res)
  }
}
