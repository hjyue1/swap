
import { StartOptions } from 'swap-sw/lib/types/setupWorker/glossary';

export {
  AxiosResponse,
} from 'axios';
export interface UnKnowObjParam {
  [propName: string]: any;
}

export interface mockDataType {
  [propName: string]: object | Function;
}

// 开启的模式：mock or jest
export type StoreMode = 'MOCK' | 'JEST'

// swap拦截时放过的请求类型
export type StoreBypassMode = 'none' | 'api' | 'jsbridge'

export type StoreParams = {
  [K in keyof Store] ?: Store[K]
}
export interface Store {
  mode: StoreMode,
  // 是否开启mock
  isMock: Boolean,
  // 是否开启在线
  isOnline: Boolean,
  // isOnline为true时生效，拼接的前缀请求地址
  baseURL: string,
  // 请求放行模式
  bypassMode: StoreBypassMode,
  // 模拟的数据
  mockData: mockDataType,
  // 未命中的模拟数据
  unmatchedMock: {
    code: number,
    msg: string
  },
  // 在jest模式下，swap的监听实例
  swapJestServer: any,
  // 传给swap-sw的参数
  workerOpt?: StartOptions
}

