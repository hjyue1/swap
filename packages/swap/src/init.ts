import { getStore, patchSetStore } from './core/store';
import { Store } from './helpers/type';
import { workerStart, workerStop } from './core/sw';

/**
 * swap 入口 api
 * @param opts
 * @returns
 */
export const swapInit = (opts: Store): void => {
  patchSetStore({
    isMock: true,
    ...opts,
  });

  if (getStore('isMock')) return workerStart();

  workerStop();
};

export const swapStop = workerStop;
