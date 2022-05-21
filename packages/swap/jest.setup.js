
import { swapJestInit } from './src/index';

const mockData = {
  ['POST /post']: {
    post: true,
  },
  ['POST https://api.weishi.qq.com/trpc.weishi.weishi_h5_proxy.weishi_h5_proxy/post']: {
    post: true,
  },
  ['GET /get']: {
    get: true,
  },
  ['GET /request']: {
    request: true,
  },
  ['PUT /put']: {
    put: true,
  },
  ['PATCH /patch']: {
    patch: true,
  },
  ['DELETE /delete']: {
    delete: true,
  },
  ['HEAD /head']: {
    head: true,
  },
  ['OPTIONS /options']: {
    options: true,
  },
  ['GET /jsbridge/weseeLive/GetAnchorsWeiguangRank']: {
    get: true,
  },
};

const swapServer = swapJestInit({ mockData });

// eslint-disable-next-line no-undef
beforeAll(() => swapServer.listen());

// eslint-disable-next-line no-undef
afterEach(() => swapServer.resetHandlers());

// eslint-disable-next-line no-undef
afterAll(() => swapServer.close());
