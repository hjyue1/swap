import * as test from '~example/methods/head.js';
describe('init', () => {
  it('init check', async () => {
    const res = await test.start()
    expect(res.data.head).toBeTruthy()
  })
})