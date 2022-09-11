import { call, callWithPromise } from '@swap/jsbridge';
import axios from 'axios';

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
        const instance = axios.create({
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
const swapCall = wrapperCall(call);
const swapCallWithPromise = wrapperCall(callWithPromise);

export { swapCall as a, swapCallWithPromise as b, getStore as g, patchSetStore as p, setStore as s, wrapperCall as w };
