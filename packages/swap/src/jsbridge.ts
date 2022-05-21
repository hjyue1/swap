import { call, callWithPromise } from 'swap-jsbridge';
import { UnKnowObjParam } from './helpers/type';
import { handlerRequest } from './helpers/utils';
import { getStore } from './core/store';

export const wrapperCall = function (target: typeof call | typeof callWithPromise) {
  return async function (
    scheme: string,
    param?: UnKnowObjParam,
    ...extendOpt: any
  ) {
    const { isMock, bypassMode } = getStore();
    if (isMock && (['api', 'none'].includes(bypassMode))) {
      // jsbridge transform fetch
      // 如果没有命中mock data则返回空对象
      return await handlerRequest(scheme, param).catch(() => ({}));
    }

    return target.call(this, scheme, param, ...extendOpt);
  };
};

const swapCall = wrapperCall(call);
const swapCallWithPromise = wrapperCall(callWithPromise);

export { swapCall, swapCallWithPromise };
