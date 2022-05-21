import * as test from '~example/methods/get.js';
describe('init', () => {
  it('init check', async () => {
    const res = await test.start()
    expect(res.data.get).toBeTruthy()
  })
})