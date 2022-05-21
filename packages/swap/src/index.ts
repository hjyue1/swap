import { getStore } from './core/store';
import { workerRestoreHandlers, workerResetHandlers } from './core/sw';

export { swapInit, swapStop } from './init';
export { swapJestInit, swapJestListen } from './core/jest';
export const getSwapJestServer = function () {
  return getStore('swapJestServer');
};
export { swapCall, swapCallWithPromise } from './jsbridge';
export { waitFor } from './waitFor';
export const swapRestoreHandlers = workerRestoreHandlers;
export const swapResetHandlers = workerResetHandlers;
