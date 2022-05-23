import { g as getStore, p as patchSetStore, s as setStore } from './jsbridge-deps.js';
export { a as swapCall, b as swapCallWithPromise } from './jsbridge-deps.js';
import { rest, setupWorker } from 'swap-sw';
import { setupServer } from 'swap-sw/node';
export { waitFor } from './waitFor.js';
import 'swap-jsbridge';
import 'axios';

/**
 * 转换mockdata数据结构
 * @param {mockDataType} mockData
 * @returns {Array}
 */
const transform = function (mockData) {
    const handlers = [];
    Object.entries(mockData).forEach(([key, mockHandle]) => {
        const { method, url } = analysisKey(key);
        if (!rest[method]) {
            console.error(`${key}无效字段`);
            return;
        }
        if (typeof mockHandle === 'function') {
            handlers.push(rest[method](url, mockHandle));
        }
        else {
            handlers.push(rest[method](url, (req, res, ctx) => res(ctx.status(200), ctx.json(mockHandle))));
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
    const sw = setupWorker(...handlers);
    const { workerOpt, bypassMode, isOnline, baseURL } = getStore();
    sw.start(Object.assign({ bypassMode,
        isOnline,
        baseURL }, workerOpt));
};
const workerStop = function () {
    setupWorker().stop();
};
const workerRestoreHandlers = function () {
    setupWorker().restoreHandlers();
};
const workerResetHandlers = function () {
    setupWorker().resetHandlers();
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
    const server = setupServer(...handlers);
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

const getSwapJestServer = function () {
    return getStore('swapJestServer');
};
const swapRestoreHandlers = workerRestoreHandlers;
const swapResetHandlers = workerResetHandlers;

export { getSwapJestServer, swapInit, swapJestInit, swapJestListen, swapResetHandlers, swapRestoreHandlers, swapStop };
