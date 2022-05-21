import * as test from '~example/methods/put.js';
describe('init', () => {
  it('init check', async () => {
    const res = await test.start()
    expect(res.data.put).toBeTruthy()
  })
})