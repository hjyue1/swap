import { getUrl, isClient } from './helpers/utils';
import { UnKnowObjParam, CallProtoArrayType, jsbridgeOpt } from './helpers/type';


declare let window: any;

export function callByLocation(url: string, param?: UnKnowObjParam, extendOpt?: jsbridgeOpt) {
  url = getUrl(url, param, extendOpt);
  isClient && setTimeout(() => {
    window.location.href = url;
  }, 0);
  return url;
}

export function callByIframe(url: string, param?: UnKnowObjParam, extendOpt?: jsbridgeOpt): string {
  url = getUrl(url, param, extendOpt);
  const iframe : any = document.createElement('iframe');
  const body = document.getElementsByTagName('body')[0];

  body.appendChild(iframe);

  const style: any = {
    border: 'none',
    height: 0,
    left: 0,
    margin: 0,
    opacity: 0,
    padding: 0,
    position: 'fixed',
    right: 0,
    visibility: 'hidden',
    width: 0,
    zIndex: -1,
  };

  for (const k in style) {
    iframe.style[k] = style[k];
  }
  iframe.src = url;

  setTimeout(() => {
    try {
      if (body && body.removeChild) {
        body.removeChild(iframe);
      }
    } catch (e) { }
  }, 2000);

  return url;
}

function callProto(url: string, param?: UnKnowObjParam, extendOpt?: jsbridgeOpt): string {

  if (
    navigator.userAgent.match(/\bSafari\/\S+$/) // IOS在safari等设备中iframe无效
    && navigator.userAgent.match(/\b(iPhone|iPad|iPod)\b/)
  ) {
    return callByLocation(url, param, extendOpt);
  }
  return callByIframe(url, param, extendOpt);
}

const callProtoArray: Array<CallProtoArrayType> = [];
let timer: any = null;

export const call = (url: string, param?: UnKnowObjParam, extendOpt?: jsbridgeOpt) => {
  callProtoArray.push({
    url,
    param,
  });
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  timer = setInterval(() => {
    const current = callProtoArray.shift();
    if (current) {
      return callProto(current.url, current.param, extendOpt);
    }
    clearInterval(timer);
    timer = null;
  }, 30);
};

export const callWithPromise = (() => {
  let callBackCount: number = 0;

  return (
    url: string,
    opts: { callback?: string } & Partial<UnKnowObjParam> = {},
    extendOpt?: jsbridgeOpt
  ) => new Promise((resolve, reject) => {
    let callbackName: string = '';

    if (!opts.callback) {
      callbackName = `JSBRIDGE_CALLBACK_${callBackCount++}`;
      opts.callback = callbackName;
    } else {
      callbackName = opts.callback;
    }
    window[callbackName] = (data: any): void => {
      resolve(data);
      delete window[callbackName];
    };

    callProto(url, opts, extendOpt);
  });
})();

