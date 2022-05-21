import * as test from '~example/methods/delete.js';
describe('init', () => {
  it('init check', async () => {
    const res = await test.start()
    expect(res.data.delete).toBeTruthy()
  })
})