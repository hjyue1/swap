import { ResponseTransformer } from '../response'

export const body = <
  BodyType extends string | Blob | BufferSource | ReadableStream | FormData,
>(
  value: BodyType,
): ResponseTransformer<BodyType> => {
  return (res) => {
    res.body = value
    return res
  }
}
