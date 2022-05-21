
import { swapInit, swapCallWithPromise } from '../src/index';

export const start = async () => {

  const res = await swapCallWithPromise('jsbridge://weseeLive/GetAnchorsWeiguangRank', {})
  return res
};

start();