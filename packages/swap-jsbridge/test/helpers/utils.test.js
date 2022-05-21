import { getUrl } from '@/helpers/utils';
import * as Jsbridge from '@/index';

describe('check utils', () => {
  it("check getUrl", () => {
    const url = "jsbridge://weishi/getUserInfo"
    expect(getUrl(url)).toBe('jsbridge://weishi/getUserInfo')
    expect(getUrl(url, {test: 1})).toBe(`${url}?test=1`)
    expect(getUrl(url, {test: 1, test2: 2})).toBe(`${url}?test=1&test2=2`)
    expect(getUrl(`${url}?test3=3`, {test: 1, test2: 2})).toBe(`${url}?test3=3&test=1&test2=2`)
    expect(getUrl(`${url}`, {test: 1, test2: 2}, {type: 'ws'})).toBe(`${url}?p=%7B%22test%22%3A1%2C%22test2%22%3A2%7D`)
  })

  it("check callWithPromise", () => {
    // const url = "jsbridge://weishi/getUserInfo"
    // const callByIframe = jest.spyOn(Jsbridge, 'callByIframe')
    // Jsbridge.callWithPromise(url, {}, {type: 'ws'})
    // expect(callByIframe).toHaveBeenCalled()
  })
})