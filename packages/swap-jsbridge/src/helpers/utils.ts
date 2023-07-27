import { UnKnowObjParam, jsbridgeOpt } from './type';

/**
 * @description 获取直播jsbridge参数结构
 * @param {string} url
 * @param {UnKnowObjParam} params
 * @returns {string} url
 */
export const getLiveUrl = function (url: string, params?: UnKnowObjParam): string {
  if (params) {
    url = `${url}${url.match(/\?/) ? "&" : "?"}${getParam(params)}`
  }
  return url;
}

/**
 * @description 获取微视端内jsbridge参数结构
 * @param {string} url
 * @param {UnKnowObjParam} params
 * @returns {string} url
 */
export const getWsUrl = function (url: string, params?: UnKnowObjParam): string {
  if (params) {
    url = `${url}?p=${encodeURIComponent(JSON.stringify(params))}`
  }
  return url;
}

/**
 * @description 获取 url
 * @param {string} url
 * @param {UnKnowObjParam} params
 * @returns {string} url
 */
export const getUrl = function (url: string, params?: UnKnowObjParam, extendOpt?: jsbridgeOpt): string {
  let key = 'live'
  const jsbridgeMap = {
    "live" : getLiveUrl,
    "ws" : getWsUrl,
  }
  if (extendOpt) {
    const { type } = extendOpt;
    if (type === 'custom') {
      jsbridgeMap[type] = extendOpt.parseCallback
    }
    if (jsbridgeMap[type]) {
      key = type
    }
  }
  return jsbridgeMap[key](url, params)
}

/**
* @description 获取Param
* @param {UnKnowObjParam} obj
* @returns {string}
*/
export const getParam = function (obj?: UnKnowObjParam): string {
  const str: Array<string> = [];
  for (const k in obj) {
    if (obj.hasOwnProperty(k)) {
      const v = typeof obj[k] !== "undefined" ? obj[k] : "";
      str.push(encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}

export const isClient = typeof window !== 'undefined'