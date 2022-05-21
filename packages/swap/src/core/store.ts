import { mode, isMock, mockData, swapJestServer, bypassMode, unmatchedMock, workerOpt, isOnline, baseURL } from '../helpers/default-props';
import { Store, StoreParams } from '../helpers/type';

const store: Store = {
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
export const getStore = function (key?: keyof Store): any {
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
export const setStore = function (key: keyof Store, val: any): Store {
  store[key] = val;
  return store;
};

/**
 * 批处理设置store，并返回store
 * @param {string} key
 * @param {any} value
 * @returns
 */
export const patchSetStore = function (obj: StoreParams): Store {
  Object.entries(obj).forEach(([key, val]: [keyof Store, any]) => {
    setStore(key, val);
  });
  return store;
};

