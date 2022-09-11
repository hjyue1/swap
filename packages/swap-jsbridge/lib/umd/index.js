(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["swap-jsbridge"] = {}));
})(this, (function (exports) { 'use strict';

  /**
   * @description 获取直播jsbridge参数结构
   * @param {string} url
   * @param {UnKnowObjParam} params
   * @returns {string} url
   */
  var getLiveUrl = function (url, params) {
      if (params) {
          url = "".concat(url).concat(url.match(/\?/) ? "&" : "?").concat(getParam(params));
      }
      return url;
  };
  /**
   * @description 获取微视端内jsbridge参数结构
   * @param {string} url
   * @param {UnKnowObjParam} params
   * @returns {string} url
   */
  var getWsUrl = function (url, params) {
      if (params) {
          url = "".concat(url, "?p=").concat(encodeURIComponent(JSON.stringify(params)));
      }
      return url;
  };
  /**
   * @description 获取 url
   * @param {string} url
   * @param {UnKnowObjParam} params
   * @returns {string} url
   */
  var getUrl = function (url, params, extendOpt) {
      var key = 'live';
      var jsbridgeMap = {
          "live": getLiveUrl,
          "ws": getWsUrl,
      };
      if (extendOpt) {
          var type = extendOpt.type;
          if (type === 'custom') {
              jsbridgeMap[type] = extendOpt.parseCallback;
          }
          if (jsbridgeMap[type]) {
              key = type;
          }
      }
      return jsbridgeMap[key](url, params);
  };
  /**
  * @description 获取Param
  * @param {UnKnowObjParam} obj
  * @returns {string}
  */
  var getParam = function (obj) {
      var str = [];
      for (var k in obj) {
          if (obj.hasOwnProperty(k)) {
              var v = typeof obj[k] !== "undefined" ? obj[k] : "";
              str.push(encodeURIComponent(k) + "=" + encodeURIComponent(v));
          }
      }
      return str.join("&");
  };

  function callByLocation(url, param, extendOpt) {
      url = getUrl(url, param, extendOpt);
      setTimeout(function () {
          window.location.href = url;
      }, 0);
      return url;
  }
  function callByIframe(url, param, extendOpt) {
      url = getUrl(url, param, extendOpt);
      var iframe = document.createElement('iframe');
      var body = document.getElementsByTagName('body')[0];
      body.appendChild(iframe);
      var style = {
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
      for (var k in style) {
          iframe.style[k] = style[k];
      }
      iframe.src = url;
      setTimeout(function () {
          try {
              if (body && body.removeChild) {
                  body.removeChild(iframe);
              }
          }
          catch (e) { }
      }, 2000);
      return url;
  }
  function callProto(url, param, extendOpt) {
      if (navigator.userAgent.match(/\bSafari\/\S+$/) // IOS在safari等设备中iframe无效
          && navigator.userAgent.match(/\b(iPhone|iPad|iPod)\b/)) {
          return callByLocation(url, param, extendOpt);
      }
      return callByIframe(url, param, extendOpt);
  }
  var callProtoArray = [];
  var timer = null;
  var call = function (url, param, extendOpt) {
      callProtoArray.push({
          url: url,
          param: param,
      });
      if (timer) {
          clearInterval(timer);
          timer = null;
      }
      timer = setInterval(function () {
          var current = callProtoArray.shift();
          if (current) {
              return callProto(current.url, current.param, extendOpt);
          }
          clearInterval(timer);
          timer = null;
      }, 30);
  };
  var callWithPromise = (function () {
      var callBackCount = 0;
      return function (url, opts, extendOpt) {
          if (opts === void 0) { opts = {}; }
          return new Promise(function (resolve, reject) {
              var callbackName = '';
              if (!opts.callback) {
                  callbackName = "JSBRIDGE_CALLBACK_".concat(callBackCount++);
                  opts.callback = callbackName;
              }
              else {
                  callbackName = opts.callback;
              }
              window[callbackName] = function (data) {
                  resolve(data);
                  delete window[callbackName];
              };
              callProto(url, opts, extendOpt);
          });
      };
  })();

  exports.call = call;
  exports.callByIframe = callByIframe;
  exports.callByLocation = callByLocation;
  exports.callWithPromise = callWithPromise;

}));
