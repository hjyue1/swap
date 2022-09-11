module.exports = {
  'GET /jsbridge/weseeLive/getLiveInfo': {
    user: 'rocketliu',
  },
  'GET /list': (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: '203',
      })
    );
  },
};
