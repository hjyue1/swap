import * as test from '~example/methods/post.js';
describe('init', () => {
  it('init check', async () => {
    const res = await test.start()
    expect(res.data.post).toBeTruthy()
  })
})