import * as test from '~example/textJsBridge.js';
describe('init', () => {
  it('init check', async () => {
    const res = await test.start()
    expect(res.get).toBeTruthy()
  })
})