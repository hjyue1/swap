import { getStore } from '../store';
import { handlerRequest, isClient } from '../../helpers/utils';

declare global {
  interface Window {
    WindVane: any
  }
}

type IWindvane = [
  className: string,
  methodName: string,
  params: unknown,
  successCallback: Function,
  failureCallback: Function,
  timeout: number
]

const proxyKey = 'call'

const proxyCallWindvane = async function(...arg) {
  const [ className, methodName, params, successCallback, failureCallback, timeout ] = arg as IWindvane;
  // jsbridge transform fetch
  // 如果没有命中mock data则返回空对象
  try {
    const res = await handlerRequest(`jsbrdige://${className}/${methodName}`, params)
    successCallback(res)
  }catch(err) {
    return failureCallback({})
  }
}

const handleWindvane = function():void {
  if(!isClient) return;
  window.WindVane = {}
  // if(!window.WindVane) {
  //   throw('window.WindVane is undefined') 
  // }
  window.WindVane = new Proxy(window.WindVane, {
    get: function(target, key, receiver) {
      if(key === 'isAvailable') return true
      if(key === proxyKey) return proxyCallWindvane
      return Reflect.get(target, key, receiver)
    },
    set: function(target, key: string, value, receiver) {
      console.warn('WindVane is set to a value')
      return Reflect.set(target, key, value, receiver)
    }
  })
}


export const windvaneStart = function():void {
  const { isMock, bypassMode } = getStore();
  if (isMock && (['api', 'none'].includes(bypassMode))) {
    return handleWindvane()
  }

  
  // window?.addEventListener('load', handleWindvane)
}