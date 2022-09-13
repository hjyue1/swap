var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

// node_modules/tsup/assets/esm_shims.js
var init_esm_shims = __esm({
  "node_modules/tsup/assets/esm_shims.js"() {
  }
});

// node_modules/outvariant/lib/format.js
var require_format = __commonJS({
  "node_modules/outvariant/lib/format.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.format = void 0;
    var POSITIONALS_EXP = /(%?)(%([sdjo]))/g;
    function serializePositional(positional, flag) {
      switch (flag) {
        case "s":
          return positional;
        case "d":
        case "i":
          return Number(positional);
        case "j":
          return JSON.stringify(positional);
        case "o": {
          if (typeof positional === "string") {
            return positional;
          }
          var json2 = JSON.stringify(positional);
          if (json2 === "{}" || json2 === "[]" || /^\[object .+?\]$/.test(json2)) {
            return positional;
          }
          return json2;
        }
      }
    }
    function format2(message) {
      var positionals = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        positionals[_i - 1] = arguments[_i];
      }
      if (positionals.length === 0) {
        return message;
      }
      var positionalIndex = 0;
      var formattedMessage = message.replace(POSITIONALS_EXP, function(match2, isEscaped, _, flag) {
        var positional = positionals[positionalIndex];
        var value = serializePositional(positional, flag);
        if (!isEscaped) {
          positionalIndex++;
          return value;
        }
        return match2;
      });
      if (positionalIndex < positionals.length) {
        formattedMessage += " " + positionals.slice(positionalIndex).join(" ");
      }
      formattedMessage = formattedMessage.replace(/%{2,2}/g, "%");
      return formattedMessage;
    }
    exports.format = format2;
  }
});

// node_modules/outvariant/lib/invariant.js
var require_invariant = __commonJS({
  "node_modules/outvariant/lib/invariant.js"(exports) {
    "use strict";
    init_esm_shims();
    var __extends = exports && exports.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (Object.prototype.hasOwnProperty.call(b2, p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __spreadArray = exports && exports.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.invariant = exports.createInvariantWith = exports.InvariantError = void 0;
    var format_1 = require_format();
    var STACK_FRAMES_TO_IGNORE = 2;
    function cleanErrorStack(error2) {
      if (!error2.stack) {
        return;
      }
      var nextStack = error2.stack.split("\n");
      nextStack.splice(1, STACK_FRAMES_TO_IGNORE);
      error2.stack = nextStack.join("\n");
    }
    var InvariantError = function(_super) {
      __extends(InvariantError2, _super);
      function InvariantError2(message) {
        var positionals = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          positionals[_i - 1] = arguments[_i];
        }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = "Invariant Violation";
        _this.message = format_1.format.apply(void 0, __spreadArray([message], positionals));
        cleanErrorStack(_this);
        return _this;
      }
      return InvariantError2;
    }(Error);
    exports.InvariantError = InvariantError;
    function createInvariantWith(ErrorConstructor) {
      var invariant = function(predicate, message) {
        var positionals = [];
        for (var _i = 2; _i < arguments.length; _i++) {
          positionals[_i - 2] = arguments[_i];
        }
        if (!predicate) {
          var resolvedMessage = format_1.format.apply(void 0, __spreadArray([message], positionals));
          var isConstructor = !!ErrorConstructor.prototype.name;
          var error2 = isConstructor ? new ErrorConstructor(resolvedMessage) : ErrorConstructor(resolvedMessage);
          cleanErrorStack(error2);
          throw error2;
        }
      };
      return invariant;
    }
    exports.createInvariantWith = createInvariantWith;
    function polymorphicInvariant(ErrorClass) {
      var args = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
      }
      return createInvariantWith(ErrorClass).apply(void 0, args);
    }
    exports.invariant = createInvariantWith(InvariantError);
    exports.invariant.as = polymorphicInvariant;
  }
});

// node_modules/outvariant/lib/index.js
var require_lib = __commonJS({
  "node_modules/outvariant/lib/index.js"(exports) {
    "use strict";
    init_esm_shims();
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_invariant(), exports);
    __exportStar(require_format(), exports);
  }
});

// src/native/index.ts
init_esm_shims();
import { interceptXMLHttpRequest } from "@mswjs/interceptors/lib/interceptors/XMLHttpRequest";

// src/node/createSetupServer.ts
init_esm_shims();
import { bold } from "chalk";

// src/utils/internal/isNodeProcess.ts
init_esm_shims();
function isNodeProcess() {
  if (typeof global !== "object") {
    return false;
  }
  if (Object.prototype.toString.call(global.process) === "[object process]" || navigator.product === "ReactNative") {
    return true;
  }
}

// src/node/createSetupServer.ts
import { StrictEventEmitter } from "strict-event-emitter";
import {
  createInterceptor
} from "@mswjs/interceptors";

// src/utils/internal/requestHandlerUtils.ts
init_esm_shims();
function use(currentHandlers, ...handlers) {
  currentHandlers.unshift(...handlers);
}
function restoreHandlers(handlers) {
  handlers.forEach((handler) => {
    handler.markAsSkipped(false);
  });
}
function resetHandlers(initialHandlers, ...nextHandlers) {
  return nextHandlers.length > 0 ? [...nextHandlers] : [...initialHandlers];
}

// src/utils/request/parseIsomorphicRequest.ts
init_esm_shims();

// src/handlers/RequestHandler.ts
init_esm_shims();
import { Headers as Headers3 } from "headers-polyfill";

// src/response.ts
init_esm_shims();
import { Headers } from "headers-polyfill";

// src/utils/internal/compose.ts
init_esm_shims();
function compose(...fns) {
  return (...args) => {
    return fns.reduceRight((leftFn, rightFn) => {
      return leftFn instanceof Promise ? Promise.resolve(leftFn).then(rightFn) : rightFn(leftFn);
    }, args[0]);
  };
}

// src/utils/NetworkError.ts
init_esm_shims();
var NetworkError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "NetworkError";
  }
};

// src/response.ts
var defaultResponse = {
  status: 200,
  statusText: "OK",
  body: null,
  delay: 0,
  once: false,
  passthrough: false
};
var defaultResponseTransformers = [];
function createResponseComposition(responseOverrides, defaultTransformers = defaultResponseTransformers) {
  return async (...transformers) => {
    const initialResponse = Object.assign({}, defaultResponse, {
      headers: new Headers({
        "x-powered-by": "swap"
      })
    }, responseOverrides);
    const resolvedTransformers = [
      ...defaultTransformers,
      ...transformers
    ].filter(Boolean);
    const resolvedResponse = resolvedTransformers.length > 0 ? compose(...resolvedTransformers)(initialResponse) : initialResponse;
    return resolvedResponse;
  };
}
var response = Object.assign(createResponseComposition(), {
  once: createResponseComposition({ once: true }),
  networkError(message) {
    throw new NetworkError(message);
  }
});

// src/utils/internal/getCallFrame.ts
init_esm_shims();
var SOURCE_FRAME = /\/src\/(.+)/;
var BUILD_FRAME = /(node_modules)?[\/\\]lib[\/\\](umd|esm|iief|cjs)[\/\\]|^[^\/\\]*$/;
function getCallFrame(error2) {
  const stack = error2.stack;
  if (!stack) {
    return;
  }
  const frames = stack.split("\n").slice(1);
  const declarationFrame = frames.find((frame) => {
    return !(SOURCE_FRAME.test(frame) || BUILD_FRAME.test(frame));
  });
  if (!declarationFrame) {
    return;
  }
  const declarationPath = declarationFrame.replace(/\s*at [^()]*\(([^)]+)\)/, "$1").replace(/^@/, "");
  return declarationPath;
}

// src/utils/internal/isIterable.ts
init_esm_shims();
function isIterable(fn) {
  if (!fn) {
    return false;
  }
  return typeof fn[Symbol.iterator] == "function";
}

// src/context/status.ts
init_esm_shims();
import statuses from "statuses/codes.json";
var status = (statusCode, statusText) => {
  return (res) => {
    res.status = statusCode;
    res.statusText = statusText || statuses[String(statusCode)];
    return res;
  };
};

// src/context/set.ts
init_esm_shims();
import { objectToHeaders } from "headers-polyfill";
function set(...args) {
  return (res) => {
    const [name, value] = args;
    if (typeof name === "string") {
      res.headers.append(name, value);
    } else {
      const headers = objectToHeaders(name);
      headers.forEach((value2, name2) => {
        res.headers.append(name2, value2);
      });
    }
    return res;
  };
}

// src/context/delay.ts
init_esm_shims();
var SET_TIMEOUT_MAX_ALLOWED_INT = 2147483647;
var MIN_SERVER_RESPONSE_TIME = 100;
var MAX_SERVER_RESPONSE_TIME = 400;
var NODE_SERVER_RESPONSE_TIME = 5;
var getRandomServerResponseTime = () => {
  if (isNodeProcess()) {
    return NODE_SERVER_RESPONSE_TIME;
  }
  return Math.floor(Math.random() * (MAX_SERVER_RESPONSE_TIME - MIN_SERVER_RESPONSE_TIME) + MIN_SERVER_RESPONSE_TIME);
};
var delay = (durationOrMode) => {
  return (res) => {
    let delayTime;
    if (typeof durationOrMode === "string") {
      switch (durationOrMode) {
        case "infinite": {
          delayTime = SET_TIMEOUT_MAX_ALLOWED_INT;
          break;
        }
        case "real": {
          delayTime = getRandomServerResponseTime();
          break;
        }
        default: {
          throw new Error(`Failed to delay a response: unknown delay mode "${durationOrMode}". Please make sure you provide one of the supported modes ("real", "infinite") or a number to "ctx.delay".`);
        }
      }
    } else if (typeof durationOrMode === "undefined") {
      delayTime = getRandomServerResponseTime();
    } else {
      if (durationOrMode > SET_TIMEOUT_MAX_ALLOWED_INT) {
        throw new Error(`Failed to delay a response: provided delay duration (${durationOrMode}) exceeds the maximum allowed duration for "setTimeout" (${SET_TIMEOUT_MAX_ALLOWED_INT}). This will cause the response to be returned immediately. Please use a number within the allowed range to delay the response by exact duration, or consider the "infinite" delay mode to delay the response indefinitely.`);
      }
      delayTime = durationOrMode;
    }
    res.delay = delayTime;
    return res;
  };
};

// src/context/fetch.ts
init_esm_shims();
import { Headers as Headers2 } from "headers-polyfill";
var useFetch = isNodeProcess() ? __require("node-fetch") : window.fetch;
var augmentRequestInit = (requestInit) => {
  const headers = new Headers2(requestInit.headers);
  headers.set("x-swap-bypass", "true");
  return __spreadProps(__spreadValues({}, requestInit), {
    headers: headers.all()
  });
};
var createFetchRequestParameters = (input) => {
  const { body: body2, method } = input;
  const requestParameters = __spreadProps(__spreadValues({}, input), {
    body: void 0
  });
  if (["GET", "HEAD"].includes(method)) {
    return requestParameters;
  }
  if (typeof body2 === "object" || typeof body2 === "number" || typeof body2 === "boolean") {
    requestParameters.body = JSON.stringify(body2);
  } else {
    requestParameters.body = body2;
  }
  return requestParameters;
};
var fetch = (input, requestInit = {}) => {
  if (typeof input === "string") {
    return useFetch(input, augmentRequestInit(requestInit));
  }
  const requestParameters = createFetchRequestParameters(input);
  const derivedRequestInit = augmentRequestInit(requestParameters);
  return useFetch(input.url.href, derivedRequestInit);
};

// src/handlers/RequestHandler.ts
var defaultContext = {
  status,
  set,
  delay,
  fetch
};
var RequestHandler = class {
  constructor(options) {
    this.shouldSkip = false;
    this.ctx = options.ctx || defaultContext;
    this.resolver = options.resolver;
    const callFrame = getCallFrame(new Error());
    this.info = __spreadProps(__spreadValues({}, options.info), {
      callFrame
    });
  }
  parse(_request, _resolutionContext) {
    return null;
  }
  test(request, resolutionContext) {
    return this.predicate(request, this.parse(request, resolutionContext), resolutionContext);
  }
  getPublicRequest(request, _parsedResult) {
    return request;
  }
  markAsSkipped(shouldSkip = true) {
    this.shouldSkip = shouldSkip;
  }
  async run(request, resolutionContext) {
    if (this.shouldSkip) {
      return null;
    }
    const parsedResult = this.parse(request, resolutionContext);
    const shouldIntercept = this.predicate(request, parsedResult, resolutionContext);
    if (!shouldIntercept) {
      return null;
    }
    const publicRequest = this.getPublicRequest(request, parsedResult);
    const executeResolver = this.wrapResolver(this.resolver);
    const mockedResponse = await executeResolver(publicRequest, response, this.ctx);
    return this.createExecutionResult(parsedResult, publicRequest, mockedResponse);
  }
  wrapResolver(resolver) {
    return async (req, res, ctx) => {
      const result = this.resolverGenerator || await resolver(req, res, ctx);
      if (isIterable(result)) {
        const { value, done } = result[Symbol.iterator]().next();
        const nextResponse = await value;
        if (!nextResponse && done) {
          return this.resolverGeneratorResult;
        }
        if (!this.resolverGenerator) {
          this.resolverGenerator = result;
        }
        this.resolverGeneratorResult = nextResponse;
        return nextResponse;
      }
      return result;
    };
  }
  createExecutionResult(parsedResult, request, response2) {
    return {
      handler: this,
      parsedResult: parsedResult || null,
      request,
      response: response2 || null
    };
  }
};
function passthrough() {
  return {
    status: 101,
    statusText: "Continue",
    headers: new Headers3(),
    body: null,
    passthrough: true,
    once: false
  };
}

// src/utils/request/parseBody.ts
init_esm_shims();

// src/utils/internal/jsonParse.ts
init_esm_shims();
function jsonParse(value) {
  try {
    return JSON.parse(value);
  } catch (error2) {
    return void 0;
  }
}

// src/utils/internal/parseMultipartData.ts
init_esm_shims();
import { stringToHeaders } from "headers-polyfill";
function parseContentHeaders(headersString) {
  var _a, _b;
  const headers = stringToHeaders(headersString);
  const contentType = headers.get("content-type") || "text/plain";
  const disposition = headers.get("content-disposition");
  if (!disposition) {
    throw new Error('"Content-Disposition" header is required.');
  }
  const directives = disposition.split(";").reduce((acc, chunk) => {
    const [name2, ...rest] = chunk.trim().split("=");
    acc[name2] = rest.join("=");
    return acc;
  }, {});
  const name = (_a = directives.name) == null ? void 0 : _a.slice(1, -1);
  const filename = (_b = directives.filename) == null ? void 0 : _b.slice(1, -1);
  return {
    name,
    filename,
    contentType
  };
}
function parseMultipartData(data2, headers) {
  const contentType = headers == null ? void 0 : headers.get("content-type");
  if (!contentType) {
    return void 0;
  }
  const [, ...directives] = contentType.split(/; */);
  const boundary = directives.filter((d) => d.startsWith("boundary=")).map((s) => s.replace(/^boundary=/, ""))[0];
  if (!boundary) {
    return void 0;
  }
  const boundaryRegExp = new RegExp(`--+${boundary}`);
  const fields = data2.split(boundaryRegExp).filter((chunk) => chunk.startsWith("\r\n") && chunk.endsWith("\r\n")).map((chunk) => chunk.trimStart().replace(/\r\n$/, ""));
  if (!fields.length) {
    return void 0;
  }
  const parsedBody = {};
  try {
    for (const field of fields) {
      const [contentHeaders, ...rest] = field.split("\r\n\r\n");
      const contentBody = rest.join("\r\n\r\n");
      const { contentType: contentType2, filename, name } = parseContentHeaders(contentHeaders);
      const value = filename === void 0 ? contentBody : new File([contentBody], filename, { type: contentType2 });
      const parsedValue = parsedBody[name];
      if (parsedValue === void 0) {
        parsedBody[name] = value;
      } else if (Array.isArray(parsedValue)) {
        parsedBody[name] = [...parsedValue, value];
      } else {
        parsedBody[name] = [parsedValue, value];
      }
    }
    return parsedBody;
  } catch (error2) {
    return void 0;
  }
}

// src/utils/request/parseBody.ts
function parseBody(body2, headers) {
  var _a;
  if (!body2) {
    return body2;
  }
  const contentType = ((_a = headers == null ? void 0 : headers.get("content-type")) == null ? void 0 : _a.toLowerCase()) || "";
  const hasMultipartContent = contentType.startsWith("multipart/form-data");
  if (hasMultipartContent && typeof body2 !== "object") {
    return parseMultipartData(body2.toString(), headers) || body2;
  }
  const hasJsonContent = contentType.includes("json");
  if (hasJsonContent && typeof body2 !== "object") {
    return jsonParse(body2.toString()) || body2;
  }
  return body2;
}

// src/utils/request/setRequestCookies.ts
init_esm_shims();
import * as cookieUtils2 from "cookie";
import { store } from "@mswjs/cookies";

// src/utils/request/getRequestCookies.ts
init_esm_shims();
import * as cookieUtils from "cookie";
function getAllCookies() {
  return cookieUtils.parse(document.cookie);
}
function getRequestCookies(request) {
  if (typeof document === "undefined" || typeof location === "undefined") {
    return {};
  }
  switch (request.credentials) {
    case "same-origin": {
      return location.origin === request.url.origin ? getAllCookies() : {};
    }
    case "include": {
      return getAllCookies();
    }
    default: {
      return {};
    }
  }
}

// src/utils/request/setRequestCookies.ts
function setRequestCookies(request) {
  var _a;
  const requestCookiesString = request.headers.get("cookie");
  store.hydrate();
  const cookiesFromStore = Array.from((_a = store.get(__spreadProps(__spreadValues({}, request), { url: request.url.toString() }))) == null ? void 0 : _a.entries()).reduce((cookies, [name, { value }]) => {
    return Object.assign(cookies, { [name.trim()]: value });
  }, {});
  const cookiesFromDocument = getRequestCookies(request);
  const forwardedCookies = __spreadValues(__spreadValues({}, cookiesFromDocument), cookiesFromStore);
  for (const [name, value] of Object.entries(forwardedCookies)) {
    request.headers.append("cookie", `${name}=${value}`);
  }
  const ownCookies = requestCookiesString ? cookieUtils2.parse(requestCookiesString) : {};
  request.cookies = __spreadValues(__spreadValues(__spreadValues({}, request.cookies), forwardedCookies), ownCookies);
}

// src/utils/request/parseIsomorphicRequest.ts
function parseIsomorphicRequest(request) {
  const mockedRequest = {
    id: request.id,
    url: request.url,
    method: request.method,
    body: parseBody(request.body, request.headers),
    credentials: request.credentials || "same-origin",
    headers: request.headers,
    cookies: {},
    redirect: "manual",
    referrer: "",
    keepalive: false,
    cache: "default",
    mode: "cors",
    referrerPolicy: "no-referrer",
    integrity: "",
    destination: "document",
    bodyUsed: false,
    passthrough
  };
  setRequestCookies(mockedRequest);
  return mockedRequest;
}

// src/utils/handleRequest.ts
init_esm_shims();
import { until } from "@open-draft/until";

// src/utils/getResponse.ts
init_esm_shims();
var getResponse = async (request, handlers, resolutionContext) => {
  const relevantHandlers = handlers.filter((handler) => {
    return handler.test(request, resolutionContext);
  });
  if (relevantHandlers.length === 0) {
    return {
      handler: void 0,
      response: void 0
    };
  }
  const result = await relevantHandlers.reduce(async (executionResult, handler) => {
    const previousResults = await executionResult;
    if (!!(previousResults == null ? void 0 : previousResults.response)) {
      return executionResult;
    }
    const result2 = await handler.run(request, resolutionContext);
    if (result2 === null || result2.handler.shouldSkip) {
      return null;
    }
    if (!result2.response) {
      return {
        request: result2.request,
        handler: result2.handler,
        response: void 0,
        parsedResult: result2.parsedResult
      };
    }
    if (result2.response.once) {
      handler.markAsSkipped(true);
    }
    return result2;
  }, Promise.resolve(null));
  if (!result) {
    return {
      handler: void 0,
      response: void 0
    };
  }
  return {
    handler: result.handler,
    publicRequest: result.request,
    parsedRequest: result.parsedResult,
    response: result.response
  };
};

// src/utils/internal/devUtils.ts
init_esm_shims();
var import_outvariant = __toESM(require_lib());
var LIBRARY_PREFIX = "[SWAP]";
function formatMessage(message, ...positionals) {
  const interpolatedMessage = (0, import_outvariant.format)(message, ...positionals);
  return `${LIBRARY_PREFIX} ${interpolatedMessage}`;
}
function warn(message, ...positionals) {
  console.warn(formatMessage(message, ...positionals));
}
function error(message, ...positionals) {
  console.error(formatMessage(message, ...positionals));
}
var devUtils = {
  formatMessage,
  warn,
  error
};

// src/utils/request/onUnhandledRequest.ts
init_esm_shims();
import getStringMatchScore from "js-levenshtein";

// src/utils/internal/parseGraphQLRequest.ts
init_esm_shims();
import {
  parse as parse3
} from "graphql";

// src/utils/request/getPublicUrlFromRequest.ts
init_esm_shims();
var getPublicUrlFromRequest = (request) => {
  return request.referrer.startsWith(request.url.origin) ? request.url.pathname : new URL(request.url.pathname, `${request.url.protocol}//${request.url.host}`).href;
};

// src/utils/internal/parseGraphQLRequest.ts
function parseDocumentNode(node) {
  var _a;
  const operationDef = node.definitions.find((def) => {
    return def.kind === "OperationDefinition";
  });
  return {
    operationType: operationDef == null ? void 0 : operationDef.operation,
    operationName: (_a = operationDef == null ? void 0 : operationDef.name) == null ? void 0 : _a.value
  };
}
function parseQuery(query) {
  try {
    const ast = parse3(query);
    return parseDocumentNode(ast);
  } catch (error2) {
    return error2;
  }
}
function extractMultipartVariables(variables, map, files) {
  const operations = { variables };
  for (const [key, pathArray] of Object.entries(map)) {
    if (!(key in files)) {
      throw new Error(`Given files do not have a key '${key}' .`);
    }
    for (const dotPath of pathArray) {
      const [lastPath, ...reversedPaths] = dotPath.split(".").reverse();
      const paths = reversedPaths.reverse();
      let target = operations;
      for (const path of paths) {
        if (!(path in target)) {
          throw new Error(`Property '${paths}' is not in operations.`);
        }
        target = target[path];
      }
      target[lastPath] = files[key];
    }
  }
  return operations.variables;
}
function getGraphQLInput(request) {
  var _a, _b;
  switch (request.method) {
    case "GET": {
      const query = request.url.searchParams.get("query");
      const variables = request.url.searchParams.get("variables") || "";
      return {
        query,
        variables: jsonParse(variables)
      };
    }
    case "POST": {
      if ((_a = request.body) == null ? void 0 : _a.query) {
        const { query, variables } = request.body;
        return {
          query,
          variables
        };
      }
      if ((_b = request.body) == null ? void 0 : _b.operations) {
        const _c = request.body, { operations, map } = _c, files = __objRest(_c, ["operations", "map"]);
        const parsedOperations = jsonParse(operations) || {};
        if (!parsedOperations.query) {
          return null;
        }
        const parsedMap = jsonParse(map || "") || {};
        const variables = parsedOperations.variables ? extractMultipartVariables(parsedOperations.variables, parsedMap, files) : {};
        return {
          query: parsedOperations.query,
          variables
        };
      }
    }
    default:
      return null;
  }
}
function parseGraphQLRequest(request) {
  const input = getGraphQLInput(request);
  if (!input || !input.query) {
    return void 0;
  }
  const { query, variables } = input;
  const parsedResult = parseQuery(query);
  if (parsedResult instanceof Error) {
    const requestPublicUrl = getPublicUrlFromRequest(request);
    throw new Error(devUtils.formatMessage('Failed to intercept a GraphQL request to "%s %s": cannot parse query. See the error message from the parser below.\n\n%s', request.method, requestPublicUrl, parsedResult.message));
  }
  return {
    operationType: parsedResult.operationType,
    operationName: parsedResult.operationName,
    variables
  };
}

// src/utils/internal/isStringEqual.ts
init_esm_shims();
function isStringEqual(actual, expected) {
  return actual.toLowerCase() === expected.toLowerCase();
}

// src/handlers/RestHandler.ts
init_esm_shims();

// src/context/index.ts
init_esm_shims();

// src/context/cookie.ts
init_esm_shims();
import * as cookieUtils3 from "cookie";
var cookie = (name, value, options) => {
  return (res) => {
    const serializedCookie = cookieUtils3.serialize(name, value, options);
    res.headers.set("Set-Cookie", serializedCookie);
    if (typeof document !== "undefined") {
      document.cookie = serializedCookie;
    }
    return res;
  };
};

// src/context/body.ts
init_esm_shims();
var body = (value) => {
  return (res) => {
    res.body = value;
    return res;
  };
};

// src/context/data.ts
init_esm_shims();

// src/utils/internal/mergeRight.ts
init_esm_shims();

// src/utils/internal/isObject.ts
init_esm_shims();
function isObject(value) {
  return value != null && typeof value === "object" && !Array.isArray(value);
}

// src/utils/internal/mergeRight.ts
function mergeRight(left, right) {
  return Object.entries(right).reduce((result, [key, rightValue]) => {
    const leftValue = result[key];
    if (Array.isArray(leftValue) && Array.isArray(rightValue)) {
      result[key] = leftValue.concat(rightValue);
      return result;
    }
    if (isObject(leftValue) && isObject(rightValue)) {
      result[key] = mergeRight(leftValue, rightValue);
      return result;
    }
    result[key] = rightValue;
    return result;
  }, Object.assign({}, left));
}

// src/context/json.ts
init_esm_shims();
var json = (body2) => {
  return (res) => {
    res.headers.set("Content-Type", "application/json");
    res.body = JSON.stringify(body2);
    return res;
  };
};

// src/context/data.ts
var data = (payload) => {
  return (res) => {
    const prevBody = jsonParse(res.body) || {};
    const nextBody = mergeRight(prevBody, { data: payload });
    return json(nextBody)(res);
  };
};

// src/context/errors.ts
init_esm_shims();
var errors = (errorsList) => {
  return (res) => {
    if (errorsList == null) {
      return res;
    }
    const prevBody = jsonParse(res.body) || {};
    const nextBody = mergeRight(prevBody, { errors: errorsList });
    return json(nextBody)(res);
  };
};

// src/context/text.ts
init_esm_shims();
var text = (body2) => {
  return (res) => {
    res.headers.set("Content-Type", "text/plain");
    res.body = body2;
    return res;
  };
};

// src/context/xml.ts
init_esm_shims();
var xml = (body2) => {
  return (res) => {
    res.headers.set("Content-Type", "text/xml");
    res.body = body2;
    return res;
  };
};

// src/utils/logging/getStatusCodeColor.ts
init_esm_shims();
function getStatusCodeColor(status2) {
  if (status2 < 300) {
    return "#69AB32" /* Success */;
  }
  if (status2 < 400) {
    return "#F0BB4B" /* Warning */;
  }
  return "#E95F5D" /* Danger */;
}

// src/utils/logging/getTimestamp.ts
init_esm_shims();
function getTimestamp() {
  const now = new Date();
  return [now.getHours(), now.getMinutes(), now.getSeconds()].map(String).map((chunk) => chunk.slice(0, 2)).map((chunk) => chunk.padStart(2, "0")).join(":");
}

// src/utils/logging/prepareRequest.ts
init_esm_shims();
function prepareRequest(request) {
  return __spreadProps(__spreadValues({}, request), {
    headers: request.headers.all()
  });
}

// src/utils/logging/prepareResponse.ts
init_esm_shims();
import { objectToHeaders as objectToHeaders2 } from "headers-polyfill";
function prepareResponse(res) {
  const responseHeaders = objectToHeaders2(res.headers);
  return __spreadProps(__spreadValues({}, res), {
    body: parseBody(res.body, responseHeaders)
  });
}

// src/utils/matching/matchRequestUrl.ts
init_esm_shims();
import { match } from "path-to-regexp";
import { getCleanUrl } from "@mswjs/interceptors/lib/utils/getCleanUrl";

// src/utils/matching/normalizePath.ts
init_esm_shims();

// src/utils/url/cleanUrl.ts
init_esm_shims();
var REDUNDANT_CHARACTERS_EXP = /[\?|#].*$/g;
function getSearchParams(path) {
  return new URL(`/${path}`, "http://localhost").searchParams;
}
function cleanUrl(path) {
  return path.replace(REDUNDANT_CHARACTERS_EXP, "");
}

// src/utils/url/getAbsoluteUrl.ts
init_esm_shims();

// src/utils/url/isAbsoluteUrl.ts
init_esm_shims();
function isAbsoluteUrl(url) {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
}

// src/utils/url/getAbsoluteUrl.ts
function getAbsoluteUrl(path, baseUrl) {
  if (isAbsoluteUrl(path)) {
    return path;
  }
  if (path.startsWith("*")) {
    return path;
  }
  const origin = baseUrl || typeof document !== "undefined" && document.baseURI;
  return origin ? decodeURI(new URL(encodeURI(path), origin).href) : path;
}

// src/utils/matching/normalizePath.ts
function normalizePath(path, baseUrl) {
  if (path instanceof RegExp) {
    return path;
  }
  const maybeAbsoluteUrl = getAbsoluteUrl(path, baseUrl);
  return cleanUrl(maybeAbsoluteUrl);
}

// src/utils/matching/matchRequestUrl.ts
function coercePath(path) {
  return path.replace(/([:a-zA-Z_-]*)(\*{1,2})+/g, (_, parameterName, wildcard) => {
    const expression = "(.*)";
    if (!parameterName) {
      return expression;
    }
    return parameterName.startsWith(":") ? `${parameterName}${wildcard}` : `${parameterName}${expression}`;
  }).replace(/([^\/])(:)(?=\d+)/, "$1\\$2").replace(/^([^\/]+)(:)(?=\/\/)/, "$1\\$2");
}
function matchRequestUrl(url, path, baseUrl) {
  const normalizedPath = normalizePath(path, baseUrl);
  const cleanPath = typeof normalizedPath === "string" ? coercePath(normalizedPath) : normalizedPath;
  const cleanUrl2 = getCleanUrl(url);
  const result = match(cleanPath, { decode: decodeURIComponent })(cleanUrl2);
  const params = result && result.params || {};
  return {
    matches: result !== false,
    params
  };
}

// src/handlers/RestHandler.ts
var restContext = __spreadProps(__spreadValues({}, defaultContext), {
  cookie,
  body,
  text,
  json,
  xml
});
var RestHandler = class extends RequestHandler {
  constructor(method, path, resolver) {
    super({
      info: {
        header: `${method} ${path}`,
        path,
        method
      },
      ctx: restContext,
      resolver
    });
    this.checkRedundantQueryParameters();
  }
  checkRedundantQueryParameters() {
    const { method, path } = this.info;
    if (path instanceof RegExp) {
      return;
    }
    const url = cleanUrl(path);
    if (url === path) {
      return;
    }
    const searchParams = getSearchParams(path);
    const queryParams = [];
    searchParams.forEach((_, paramName) => {
      queryParams.push(paramName);
    });
    devUtils.warn(`Found a redundant usage of query parameters in the request handler URL for "${method} ${path}". Please match against a path instead and access query parameters in the response resolver function using "req.url.searchParams".`);
  }
  parse(request, resolutionContext) {
    return matchRequestUrl(request.url, this.info.path, resolutionContext == null ? void 0 : resolutionContext.baseUrl);
  }
  getPublicRequest(request, parsedResult) {
    return __spreadProps(__spreadValues({}, request), {
      params: parsedResult.params || {}
    });
  }
  predicate(request, parsedResult) {
    const matchesMethod = this.info.method instanceof RegExp ? this.info.method.test(request.method) : isStringEqual(this.info.method, request.method);
    return matchesMethod && parsedResult.matches;
  }
  log(request, response2) {
    const publicUrl = getPublicUrlFromRequest(request);
    const loggedRequest = prepareRequest(request);
    const loggedResponse = prepareResponse(response2);
    const statusColor = getStatusCodeColor(response2.status);
    console.groupCollapsed(devUtils.formatMessage("%s %s %s (%c%s%c)"), getTimestamp(), request.method, publicUrl, `color:${statusColor}`, `${response2.status} ${response2.statusText}`, "color:inherit");
    console.log("Request", loggedRequest);
    console.log("Handler:", {
      mask: this.info.path,
      resolver: this.resolver
    });
    console.log("Response", loggedResponse);
    console.groupEnd();
  }
};

// src/handlers/GraphQLHandler.ts
init_esm_shims();

// src/context/extensions.ts
init_esm_shims();
var extensions = (payload) => {
  return (res) => {
    const prevBody = jsonParse(res.body) || {};
    const nextBody = mergeRight(prevBody, { extensions: payload });
    return json(nextBody)(res);
  };
};

// src/utils/internal/tryCatch.ts
init_esm_shims();
function tryCatch(fn, onException) {
  try {
    const result = fn();
    return result;
  } catch (error2) {
    onException == null ? void 0 : onException(error2);
  }
}

// src/handlers/GraphQLHandler.ts
var graphqlContext = __spreadProps(__spreadValues({}, defaultContext), {
  data,
  extensions,
  errors,
  cookie
});
function isDocumentNode(value) {
  if (value == null) {
    return false;
  }
  return typeof value === "object" && "kind" in value && "definitions" in value;
}
var GraphQLHandler = class extends RequestHandler {
  constructor(operationType, operationName, endpoint, resolver) {
    let resolvedOperationName = operationName;
    if (isDocumentNode(operationName)) {
      const parsedNode = parseDocumentNode(operationName);
      if (parsedNode.operationType !== operationType) {
        throw new Error(`Failed to create a GraphQL handler: provided a DocumentNode with a mismatched operation type (expected "${operationType}", but got "${parsedNode.operationType}").`);
      }
      if (!parsedNode.operationName) {
        throw new Error(`Failed to create a GraphQL handler: provided a DocumentNode with no operation name.`);
      }
      resolvedOperationName = parsedNode.operationName;
    }
    const header = operationType === "all" ? `${operationType} (origin: ${endpoint.toString()})` : `${operationType} ${resolvedOperationName} (origin: ${endpoint.toString()})`;
    super({
      info: {
        header,
        operationType,
        operationName: resolvedOperationName
      },
      ctx: graphqlContext,
      resolver
    });
    this.endpoint = endpoint;
  }
  parse(request) {
    return tryCatch(() => parseGraphQLRequest(request), (error2) => console.error(error2.message));
  }
  getPublicRequest(request, parsedResult) {
    return __spreadProps(__spreadValues({}, request), {
      variables: (parsedResult == null ? void 0 : parsedResult.variables) || {}
    });
  }
  predicate(request, parsedResult) {
    if (!parsedResult) {
      return false;
    }
    if (!parsedResult.operationName && this.info.operationType !== "all") {
      const publicUrl = getPublicUrlFromRequest(request);
      devUtils.warn(`Failed to intercept a GraphQL request at "${request.method} ${publicUrl}": anonymous GraphQL operations are not supported.

Consider naming this operation or using "graphql.operation" request handler to intercept GraphQL requests regardless of their operation name/type.
      `);
      return false;
    }
    const hasMatchingUrl = matchRequestUrl(request.url, this.endpoint);
    const hasMatchingOperationType = this.info.operationType === "all" || parsedResult.operationType === this.info.operationType;
    const hasMatchingOperationName = this.info.operationName instanceof RegExp ? this.info.operationName.test(parsedResult.operationName || "") : parsedResult.operationName === this.info.operationName;
    return hasMatchingUrl.matches && hasMatchingOperationType && hasMatchingOperationName;
  }
  log(request, response2, handler, parsedRequest) {
    const loggedRequest = prepareRequest(request);
    const loggedResponse = prepareResponse(response2);
    const statusColor = getStatusCodeColor(response2.status);
    const requestInfo = (parsedRequest == null ? void 0 : parsedRequest.operationName) ? `${parsedRequest == null ? void 0 : parsedRequest.operationType} ${parsedRequest == null ? void 0 : parsedRequest.operationName}` : `anonymous ${parsedRequest == null ? void 0 : parsedRequest.operationType}`;
    console.groupCollapsed(devUtils.formatMessage("%s %s (%c%s%c)"), getTimestamp(), `${requestInfo}`, `color:${statusColor}`, `${response2.status} ${response2.statusText}`, "color:inherit");
    console.log("Request:", loggedRequest);
    console.log("Handler:", this);
    console.log("Response:", loggedResponse);
    console.groupEnd();
  }
};

// src/utils/request/onUnhandledRequest.ts
var MAX_MATCH_SCORE = 3;
var MAX_SUGGESTION_COUNT = 4;
var TYPE_MATCH_DELTA = 0.5;
function groupHandlersByType(handlers) {
  return handlers.reduce((groups, handler) => {
    if (handler instanceof RestHandler) {
      groups.rest.push(handler);
    }
    if (handler instanceof GraphQLHandler) {
      groups.graphql.push(handler);
    }
    return groups;
  }, {
    rest: [],
    graphql: []
  });
}
function getRestHandlerScore() {
  return (request, handler) => {
    const { path, method } = handler.info;
    if (path instanceof RegExp || method instanceof RegExp) {
      return Infinity;
    }
    const hasSameMethod = isStringEqual(request.method, method);
    const methodScoreDelta = hasSameMethod ? TYPE_MATCH_DELTA : 0;
    const requestPublicUrl = getPublicUrlFromRequest(request);
    const score = getStringMatchScore(requestPublicUrl, path);
    return score - methodScoreDelta;
  };
}
function getGraphQLHandlerScore(parsedQuery) {
  return (_, handler) => {
    if (typeof parsedQuery.operationName === "undefined") {
      return Infinity;
    }
    const { operationType, operationName } = handler.info;
    if (typeof operationName !== "string") {
      return Infinity;
    }
    const hasSameOperationType = parsedQuery.operationType === operationType;
    const operationTypeScoreDelta = hasSameOperationType ? TYPE_MATCH_DELTA : 0;
    const score = getStringMatchScore(parsedQuery.operationName, operationName);
    return score - operationTypeScoreDelta;
  };
}
function getSuggestedHandler(request, handlers, getScore) {
  const suggestedHandlers = handlers.reduce((suggestions, handler) => {
    const score = getScore(request, handler);
    return suggestions.concat([[score, handler]]);
  }, []).sort(([leftScore], [rightScore]) => leftScore - rightScore).filter(([score]) => score <= MAX_MATCH_SCORE).slice(0, MAX_SUGGESTION_COUNT).map(([, handler]) => handler);
  return suggestedHandlers;
}
function getSuggestedHandlersMessage(handlers) {
  if (handlers.length > 1) {
    return `Did you mean to request one of the following resources instead?

${handlers.map((handler) => `  \u2022 ${handler.info.header}`).join("\n")}`;
  }
  return `Did you mean to request "${handlers[0].info.header}" instead?`;
}
function onUnhandledRequest(request, handlers, strategy = "warn") {
  const parsedGraphQLQuery = tryCatch(() => parseGraphQLRequest(request));
  function generateHandlerSuggestion() {
    const handlerGroups = groupHandlersByType(handlers);
    const relevantHandlers = parsedGraphQLQuery ? handlerGroups.graphql : handlerGroups.rest;
    const suggestedHandlers = getSuggestedHandler(request, relevantHandlers, parsedGraphQLQuery ? getGraphQLHandlerScore(parsedGraphQLQuery) : getRestHandlerScore());
    return suggestedHandlers.length > 0 ? getSuggestedHandlersMessage(suggestedHandlers) : "";
  }
  function generateUnhandledRequestMessage() {
    const publicUrl = getPublicUrlFromRequest(request);
    const requestHeader = parsedGraphQLQuery ? `${parsedGraphQLQuery.operationType} ${parsedGraphQLQuery.operationName} (${request.method} ${publicUrl})` : `${request.method} ${publicUrl}`;
    const handlerSuggestion = generateHandlerSuggestion();
    const messageTemplate = [
      `captured a request without a matching request handler:`,
      `  \u2022 ${requestHeader}`,
      handlerSuggestion,
      `If you still wish to intercept this unhandled request, please create a request handler for it.
`
    ].filter(Boolean);
    return messageTemplate.join("\n\n");
  }
  function applyStrategy(strategy2) {
    const message = generateUnhandledRequestMessage();
    switch (strategy2) {
      case "error": {
        devUtils.error("Error: %s", message);
        throw new Error(devUtils.formatMessage('Cannot bypass a request when using the "error" strategy for the "onUnhandledRequest" option.'));
      }
      case "warn": {
        devUtils.warn("Warning: %s", message);
        break;
      }
      case "bypass":
        break;
      default:
        throw new Error(devUtils.formatMessage('Failed to react to an unhandled request: unknown strategy "%s". Please provide one of the supported strategies ("bypass", "warn", "error") or a custom callback function as the value of the "onUnhandledRequest" option.', strategy2));
    }
  }
  if (typeof strategy === "function") {
    strategy(request, {
      warning: applyStrategy.bind(null, "warn"),
      error: applyStrategy.bind(null, "error")
    });
    return;
  }
  applyStrategy(strategy);
}

// src/utils/request/readResponseCookies.ts
init_esm_shims();
import { store as store2 } from "@mswjs/cookies";
function readResponseCookies(request, response2) {
  store2.add(__spreadProps(__spreadValues({}, request), { url: request.url.toString() }), response2);
  store2.persist();
}

// src/utils/matching/bypassUrl.ts
init_esm_shims();
var isBypass = function(requestURL) {
  const bypassRegExp = [
    /^(http|https):\/\/([\w\W]+)\/sockjs-node\/info/gi,
    /^(http|https):\/\/([\w\W]+)\/([\w\W]+).hot-update/gi,
    /^(http|https):\/\/([\w\W]+)\/manifest.json/gi
  ];
  return bypassRegExp.some(function(item) {
    if (requestURL.match(item)) {
      return true;
    }
  });
};

// src/utils/handleRequest.ts
async function handleRequest(request, handlers, options, emitter, handleRequestOptions) {
  var _a, _b, _c, _d, _e, _f, _g;
  emitter.emit("request:start", request);
  if (request.headers.get("x-swap-bypass") === "true" || isBypass(request.url.href)) {
    emitter.emit("request:end", request);
    (_a = handleRequestOptions == null ? void 0 : handleRequestOptions.onPassthroughResponse) == null ? void 0 : _a.call(handleRequestOptions, request);
    return;
  }
  if (options.bypassMode === "api" && ((_b = request.headers) == null ? void 0 : _b.get("x-swap-jsbridge")) !== "true" || options.bypassMode === "jsbridge" && ((_c = request.headers) == null ? void 0 : _c.get("x-swap-jsbridge")) === "true") {
    emitter.emit("request:end", request);
    (_d = handleRequestOptions == null ? void 0 : handleRequestOptions.onPassthroughResponse) == null ? void 0 : _d.call(handleRequestOptions, request);
    return;
  }
  const [lookupError, lookupResult] = await until(() => {
    return getResponse(request, handlers, handleRequestOptions == null ? void 0 : handleRequestOptions.resolutionContext);
  });
  if (lookupError) {
    emitter.emit("unhandledException", lookupError, request);
    throw lookupError;
  }
  const { handler, response: response2 } = lookupResult;
  if (!handler) {
    onUnhandledRequest(request, handlers, options.onUnhandledRequest);
    emitter.emit("request:unhandled", request);
    emitter.emit("request:end", request);
    (_e = handleRequestOptions == null ? void 0 : handleRequestOptions.onPassthroughResponse) == null ? void 0 : _e.call(handleRequestOptions, request);
    return;
  }
  if (!response2) {
    devUtils.warn(`Expected response resolver to return a mocked response Object, but got %s. The original response is going to be used instead.

  \u2022 %s
    %s`, response2, handler.info.header, handler.info.callFrame);
    emitter.emit("request:end", request);
    (_f = handleRequestOptions == null ? void 0 : handleRequestOptions.onPassthroughResponse) == null ? void 0 : _f.call(handleRequestOptions, request);
    return;
  }
  if (response2.passthrough) {
    emitter.emit("request:end", request);
    (_g = handleRequestOptions == null ? void 0 : handleRequestOptions.onPassthroughResponse) == null ? void 0 : _g.call(handleRequestOptions, request);
    return;
  }
  readResponseCookies(request, response2);
  emitter.emit("request:match", request);
  return new Promise((resolve) => {
    var _a2, _b2, _c2;
    const requiredLookupResult = lookupResult;
    const transformedResponse = ((_a2 = handleRequestOptions == null ? void 0 : handleRequestOptions.transformResponse) == null ? void 0 : _a2.call(handleRequestOptions, response2)) || response2;
    (_b2 = handleRequestOptions == null ? void 0 : handleRequestOptions.onMockedResponse) == null ? void 0 : _b2.call(handleRequestOptions, transformedResponse, requiredLookupResult);
    setTimeout(() => {
      var _a3;
      (_a3 = handleRequestOptions == null ? void 0 : handleRequestOptions.onMockedResponseSent) == null ? void 0 : _a3.call(handleRequestOptions, transformedResponse, requiredLookupResult);
      emitter.emit("request:end", request);
      resolve(transformedResponse);
    }, (_c2 = response2.delay) != null ? _c2 : 0);
  });
}

// src/utils/internal/pipeEvents.ts
init_esm_shims();
function pipeEvents(source, destination) {
  const rawEmit = source.emit;
  if (rawEmit._isPiped) {
    return;
  }
  source.emit = function(event, ...data2) {
    destination.emit(event, ...data2);
    return rawEmit.call(this, event, ...data2);
  };
  source.emit._isPiped = true;
}

// src/node/createSetupServer.ts
var DEFAULT_LISTEN_OPTIONS = {
  onUnhandledRequest: "warn"
};
function createSetupServer(...interceptors) {
  const emitter = new StrictEventEmitter();
  const publicEmitter = new StrictEventEmitter();
  pipeEvents(emitter, publicEmitter);
  return function setupServer2(...requestHandlers) {
    requestHandlers.forEach((handler) => {
      if (Array.isArray(handler))
        throw new Error(devUtils.formatMessage('Failed to call "setupServer" given an Array of request handlers (setupServer([a, b])), expected to receive each handler individually: setupServer(a, b).'));
    });
    let currentHandlers = [...requestHandlers];
    if (!isNodeProcess()) {
      throw new Error(devUtils.formatMessage("Failed to execute `setupServer` in the environment that is not Node.js (i.e. a browser). Consider using `setupWorker` instead."));
    }
    let resolvedOptions = {};
    const interceptor = createInterceptor({
      modules: interceptors,
      async resolver(request) {
        const mockedRequest = parseIsomorphicRequest(request);
        return handleRequest(mockedRequest, currentHandlers, resolvedOptions, emitter, {
          transformResponse(response2) {
            return {
              status: response2.status,
              statusText: response2.statusText,
              headers: response2.headers.all(),
              body: response2.body
            };
          }
        });
      }
    });
    interceptor.on("response", (request, response2) => {
      if (!request.id) {
        return;
      }
      if (response2.headers.get("x-powered-by") === "swap") {
        emitter.emit("response:mocked", response2, request.id);
      } else {
        emitter.emit("response:bypass", response2, request.id);
      }
    });
    return {
      listen(options) {
        resolvedOptions = mergeRight(DEFAULT_LISTEN_OPTIONS, options || {});
        interceptor.apply();
      },
      use(...handlers) {
        use(currentHandlers, ...handlers);
      },
      restoreHandlers() {
        restoreHandlers(currentHandlers);
      },
      resetHandlers(...nextHandlers) {
        currentHandlers = resetHandlers(requestHandlers, ...nextHandlers);
      },
      printHandlers() {
        currentHandlers.forEach((handler) => {
          const { header, callFrame } = handler.info;
          const pragma = handler.info.hasOwnProperty("operationType") ? "[graphql]" : "[rest]";
          console.log(`${bold(`${pragma} ${header}`)}
  Declaration: ${callFrame}
`);
        });
      },
      events: {
        on(...args) {
          return publicEmitter.on(...args);
        },
        removeListener(...args) {
          return publicEmitter.removeListener(...args);
        },
        removeAllListeners(...args) {
          return publicEmitter.removeAllListeners(...args);
        }
      },
      close() {
        emitter.removeAllListeners();
        publicEmitter.removeAllListeners();
        interceptor.restore();
      }
    };
  };
}

// src/native/index.ts
var setupServer = createSetupServer(interceptXMLHttpRequest);
export {
  setupServer
};
