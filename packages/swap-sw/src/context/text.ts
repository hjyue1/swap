import { ResponseTransformer } from '../response'

export const text = <BodyType extends string>(
  body: BodyType,
): ResponseTransformer<BodyType> => {
  return (res) => {
    res.headers.set('Content-Type', 'text/plain')
    res.body = body
    return res
  }
}
