import { ResponseTransformer } from '../response'

export const json = <BodyTypeJSON>(
  body: BodyTypeJSON,
): ResponseTransformer<BodyTypeJSON> => {
  return (res) => {
    res.headers.set('Content-Type', 'application/json')
    res.body = JSON.stringify(body) as any

    return res
  }
}
