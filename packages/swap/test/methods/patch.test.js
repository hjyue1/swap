import * as test from '~example/methods/patch.js';
describe('init', () => {
  it('init check', async () => {
    const res = await test.start()
    expect(res.data.patch).toBeTruthy()
  })
})