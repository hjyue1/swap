import * as test from '~example/methods/all.js';
describe('init', () => {
  it('init check', async () => {
    const res = await test.start()
    expect(res.length).toBe(2)
    expect(res[0].data.get).toBeTruthy()
    expect(res[1].data.post).toBeTruthy()
  })
})