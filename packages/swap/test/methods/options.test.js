import * as test from '~example/methods/options.js';
describe('init', () => {
  it('init check', async () => {
    const res = await test.start()
    expect(res.data.options).toBeTruthy()
  })
})