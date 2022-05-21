import { ResponseTransformer } from '../response'

export const xml = <BodyType extends string>(
  body: BodyType,
): ResponseTransformer<BodyType> => {
  return (res) => {
    res.headers.set('Content-Type', 'text/xml')
    res.body = body
    return res
  }
}
