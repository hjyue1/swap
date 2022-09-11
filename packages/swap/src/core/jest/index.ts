import { setStore, getStore, patchSetStore } from '../../core/store';
import { transform } from '../../helpers/json-transform';
import { setupServer } from '@swap/sw/node';

/**
* @description 环境变量
* @returns {boolean}
*/
declare let process: {
  env: {
    isJest: string,
  }
};
declare let beforeAll: Function;
declare let afterEach: Function;
declare let afterAll: Function;

// eslint-disable-next-line no-unused-vars
export const swapJestInit = function ({ isMock = true, mockData }) {
  process.env.isJest = 'true';
  patchSetStore({
    mockData,
    isMock,
    mode: 'JEST',
  });

  const handlers = transform(getStore('mockData'));
  const server = setupServer(...handlers);
  setStore('swapJestServer', server);

  return server;
};

export const swapJestListen = function () {
  const swapServer = getStore('swapJestServer');
  if (!swapServer.listen || !swapServer.resetHandlers || !swapServer.close) return;

  beforeAll(() => swapServer.listen());
  afterEach(() => swapServer.resetHandlers());
  afterAll(() => swapServer.close());
};
