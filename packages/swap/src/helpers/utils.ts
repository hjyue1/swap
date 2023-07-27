import { UnKnowObjParam, AxiosResponse } from './type';
import { request } from './request';
/**
 * @description 获取 url
 * @param {string} url
 * @param {UnKnowObjParam} param
 * @returns {string} url
 */
export const getUrl = function (url: string, param?: UnKnowObjParam): string {
  if (param) {
    url = url + (url.match(/\?/) ? '&' : '?') + getParam(param);
  }
  return url;
};

/**
* @description 获取Param
* @param {UnKnowObjParam} obj
* @returns {string}
*/
export const getParam = function (obj?: UnKnowObjParam): string {
  const str: Array<string> = [];
  Object.entries(obj).forEach(([key, val]) => {
    const v = typeof val !== 'undefined' ? val : '';
    str.push(`${encodeURIComponent(key)}=${encodeURIComponent(v)}`);
  });
  return str.join('&');
};

/**
* @description 获取URL名称
* @param {string} baseUrl
* @returns {string}
*/
export function getURLName(baseUrl: string): string[] {
  return baseUrl.split('://');
}

/**
* @description 处理请求
* @returns {string}
*/
export const handlerRequest = async function (
  url: string,
  param?: UnKnowObjParam,
): Promise<AxiosResponse | UnKnowObjParam> {
  const [pre, name] = getURLName(url);
  return await request(pre, `/${name}`, param);
};

/**
 * 迭代数组或对象
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
export function forEach(obj: any, fn: Function) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /* eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (Array.isArray(obj)) {
    // Iterate over array values
    for (let i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    Object.keys(obj).forEach((key) => {
      fn.call(null, obj[key], key, obj);
    });
  }
}

export const isClient = typeof window !== 'undefined'