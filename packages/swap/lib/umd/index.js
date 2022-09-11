(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@swap/sw'), require('@swap/sw/node'), require('@swap/jsbridge'), require('axios')) :
  typeof define === 'function' && define.amd ? define(['exports', '@swap/sw', '@swap/sw/node', '@swap/jsbridge', 'axios'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.swapSW = {}, global["@swap/sw"], global["@swap/sw"], global["@swap/jsbridge"], global.axios));
})(this, (function (exports, sw, node, jsbridge, axios) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

  const mode = 'MOCK';
  const isMock = false;
  const isOnline = false;
  const baseURL = '';
  const bypassMode = 'none';
  const workerOpt = null;
  const mockData = {};
  const swapJestServer = {};
  const unmatchedMock = {
      code: 999,
      msg: '没有匹配到数据',
  };

  const store = {
      mode,
      isMock,
      bypassMode,
      mockData,
      unmatchedMock,
      swapJestServer,
      workerOpt,
      isOnline,
      baseURL,
  };
  /**
   * 获取store中的值，如果没有入参则返回所有
   * @param key
   * @returns
   */
  const getStore = function (key) {
      if (key) {
          return store[key];
      }
      return store;
  };
  /**
   * 设置store，并返回store
   * @param {string} key
   * @param {any} value
   * @returns
   */
  const setStore = function (key, val) {
      store[key] = val;
      return store;
  };
  /**
   * 批处理设置store，并返回store
   * @param {string} key
   * @param {any} value
   * @returns
   */
  const patchSetStore = function (obj) {
      Object.entries(obj).forEach(([key, val]) => {
          setStore(key, val);
      });
      return store;
  };

  /**
   * 转换mockdata数据结构
   * @param {mockDataType} mockData
   * @returns {Array}
   */
  const transform = function (mockData) {
      const handlers = [];
      Object.entries(mockData).forEach(([key, mockHandle]) => {
          const { method, url } = analysisKey(key);
          if (!sw.rest[method]) {
              console.error(`${key}无效字段`);
              return;
          }
          if (typeof mockHandle === 'function') {
              handlers.push(sw.rest[method](url, mockHandle));
          }
          else {
              handlers.push(sw.rest[method](url, (req, res, ctx) => res(ctx.status(200), ctx.json(mockHandle))));
          }
      });
      return handlers;
  };
  const analysisKey = function (key) {
      const [method, url] = key.split(' ');
      return {
          method: method.toLowerCase(),
          url,
      };
  };

  const workerStart = function () {
      if (getStore('mode') === 'JEST')
          return;
      const handlers = transform(getStore('mockData'));
      const sw$1 = sw.setupWorker(...handlers);
      const { workerOpt, bypassMode, isOnline, baseURL } = getStore();
      sw$1.start(Object.assign({ bypassMode,
          isOnline,
          baseURL }, workerOpt));
  };
  const workerStop = function () {
      sw.setupWorker().stop();
  };
  const workerRestoreHandlers = function () {
      sw.setupWorker().restoreHandlers();
  };
  const workerResetHandlers = function () {
      sw.setupWorker().resetHandlers();
  };

  /**
   * swap 入口 api
   * @param opts
   * @returns
   */
  const swapInit = (opts) => {
      patchSetStore(Object.assign({ isMock: true }, opts));
      if (getStore('isMock'))
          return workerStart();
      workerStop();
  };
  const swapStop = workerStop;

  // eslint-disable-next-line no-unused-vars
  const swapJestInit = function ({ isMock = true, mockData }) {
      process.env.isJest = 'true';
      patchSetStore({
          mockData,
          isMock,
          mode: 'JEST',
      });
      const handlers = transform(getStore('mockData'));
      const server = node.setupServer(...handlers);
      setStore('swapJestServer', server);
      return server;
  };
  const swapJestListen = function () {
      const swapServer = getStore('swapJestServer');
      if (!swapServer.listen || !swapServer.resetHandlers || !swapServer.close)
          return;
      beforeAll(() => swapServer.listen());
      afterEach(() => swapServer.resetHandlers());
      afterAll(() => swapServer.close());
  };

  /******************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */

  function __awaiter(thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  }

  const request = function (baseURL, url, params) {
      return __awaiter(this, void 0, void 0, function* () {
          const instance = axios__default["default"].create({
              baseURL,
              timeout: 20000,
              withCredentials: false,
              headers: { 'x-swap-jsbridge': 'true' },
          });
          const res = yield instance.get(url, { params });
          return res.data;
      });
  };

  /**
  * @description 获取URL名称
  * @param {string} baseUrl
  * @returns {string}
  */
  function getURLName(baseUrl) {
      return baseUrl.split('://');
  }
  /**
  * @description 处理请求
  * @returns {string}
  */
  const handlerRequest = function (url, param) {
      return __awaiter(this, void 0, void 0, function* () {
          const [pre, name] = getURLName(url);
          return yield request(pre, `/${name}`, param);
      });
  };

  const wrapperCall = function (target) {
      return function (scheme, param, ...extendOpt) {
          return __awaiter(this, void 0, void 0, function* () {
              const { isMock, bypassMode } = getStore();
              if (isMock && (['api', 'none'].includes(bypassMode))) {
                  // jsbridge transform fetch
                  // 如果没有命中mock data则返回空对象
                  return yield handlerRequest(scheme, param).catch(() => ({}));
              }
              return target.call(this, scheme, param, ...extendOpt);
          });
      };
  };
  const swapCall = wrapperCall(jsbridge.call);
  const swapCallWithPromise = wrapperCall(jsbridge.callWithPromise);

  const scheduler = typeof setImmediate === 'function' ? setImmediate : setTimeout;
  const waitFor = function () {
      return new Promise((resolve) => {
          scheduler(resolve);
      });
  };

  const getSwapJestServer = function () {
      return getStore('swapJestServer');
  };
  const swapRestoreHandlers = workerRestoreHandlers;
  const swapResetHandlers = workerResetHandlers;

  exports.getSwapJestServer = getSwapJestServer;
  exports.swapCall = swapCall;
  exports.swapCallWithPromise = swapCallWithPromise;
  exports.swapInit = swapInit;
  exports.swapJestInit = swapJestInit;
  exports.swapJestListen = swapJestListen;
  exports.swapResetHandlers = swapResetHandlers;
  exports.swapRestoreHandlers = swapRestoreHandlers;
  exports.swapStop = swapStop;
  exports.waitFor = waitFor;

}));
