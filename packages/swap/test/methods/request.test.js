import * as test from '~example/methods/request.js';
describe('init', () => {
  it('init check', async () => {
    const res = await test.start()
    expect(res.data.request).toBeTruthy()
  })
})