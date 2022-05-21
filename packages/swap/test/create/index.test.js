import * as test from '~example/create/index.js';
describe('init', () => {
  it('init check', async () => {
    const res = await test.start()
    expect(res.data.post).toBeTruthy()
  })
})