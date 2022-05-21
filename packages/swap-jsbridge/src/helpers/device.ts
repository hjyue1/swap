function getUa(): string {
  if (typeof navigator !== "undefined") {
      if (typeof navigator.userAgent !== "undefined") {
          return navigator.userAgent;
      }
  }
  return "";
}

const regexp = [
  ["IOS", /\b(iPad|iPhone|iPod)\b.*? OS ([\d_]+)/, 2],
  ["android", /\bAndroid\s*([^;]+)/],
  ["QQBrowser", /\bMQQBrowser\/([\d\.]+)\s(?!TBS\/([\d]+))(\w+)/],
  ["nowSDK", /\bNowSDK\/([\d\.]*)/i], // now结合版
  ["QQ", /\bQQ\/([\d\.]+)/],
  ["weixin", /\bMicroMessenger\/([\d\.]*)/],
  ["now", /\bNow\/([\d\._]+|LocalCompiled)/],
  ["nowDev", /\bNow\/([\d\._]+|LocalCompiled)\s*tnowDailybuild/],
  ["jiaoyou", /\bODApp\/([\d\.]+|LocalCompiled)/],
  ["jiaoyouDev", /\bODApp\/LocalCompiled/],
  ["huayang", /\bhuayangapp\/([\d\.]*)/],
  ["qzone", /\bQzone\/\w*_([\d\.]+)/],
  ["PCQQBrowser", /\bQQBrowser\/([\d\.]+)/], // PC 的 QQ
  ["nowOpenSDK", /\bNowOpenSdk\/([\d\.]*)/i], // 百万闯关
  ["comicReader", /\bQQAC_Client(_\w+)?\/([\d\.]*)/i], // 动漫
  ["weibo", /\bweibo/i], // 微博
  ["YYB", /\/qqdownloader\/(\d+)(?:\/(appdetail|external))?/], // 应用宝
  ['TencentLive', /\bTencentLive\/([\d\.]*)/i] // 腾讯直播
];

function Up(str: string) {
  return str.replace(/^./, (ch) => ch.toUpperCase());
}

type Version = string | null;
type Compare = (ver: string) => boolean;
type DeviceType = "IOS" | "android" | "QQBrowser" | "nowSDK" | "QQ" | "weixin" | "now" | "nowDev" | "jiaoyou" | "jiaoyouDev" | "huayang" | "qzone" | "PCQQBrowser" | "nowOpenSDK" | "comicReader" | "weibo" | "YYB" | "TencentLive";
interface DeviceInfo {
  userAgent: typeof getUa;
  isIOS: boolean;
  IOSVersion: Version;
  IOSUpper: Compare;
  IOSLower: Compare;
  IOSCompare: Compare;
  isAndroid: boolean;
  androidVersion: string;
  androidUpper: Compare;
  androidLower: Compare;
  androidCompare: Compare;
  isQQBrowser: boolean;
  QQBrowserVersion: Version;
  QQBrowserUpper: Compare;
  QQBrowserLower: Compare;
  QQBrowserCompare: Compare;
  isNowSDK: boolean;
  nowSDKVersion: Version;
  nowSDKUpper: Compare;
  nowSDKLower: Compare;
  nowSDKCompare: Compare;
  isQQ: boolean;
  QQVersion: Version;
  QQUpper: Compare;
  QQLower: Compare;
  QQCompare: Compare;
  isWeixin: boolean;
  weixinVersion: Version;
  weixinUpper: Compare;
  weixinLower: Compare;
  weixinCompare: Compare;
  isNow: boolean;
  nowVersion: Version;
  nowUpper: Compare;
  nowLower: Compare;
  nowCompare: Compare;
  isNowDev: boolean;
  nowDevVersion: Version;
  nowDevUpper: Compare;
  nowDevLower: Compare;
  nowDevCompare: Compare;
  isJiaoyou: boolean;
  jiaoyouVersion: Version;
  jiaoyouUpper: Compare;
  jiaoyouLower: Compare;
  jiaoyouCompare: Compare;
  isJiaoyouDev: boolean;
  jiaoyouDevVersion: Version;
  jiaoyouDevUpper: Compare;
  jiaoyouDevLower: Compare;
  jiaoyouDevCompare: Compare;
  isHuayang: boolean;
  huayangVersion: Version;
  huayangUpper: Compare;
  huayangLower: Compare;
  huayangCompare: Compare;
  isQzone: boolean;
  qzoneVersion: Version;
  qzoneUpper: Compare;
  qzoneLower: Compare;
  qzoneCompare: Compare;
  isPCQQBrowser: boolean;
  PCQQBrowserVersion: Version;
  PCQQBrowserUpper: Compare;
  PCQQBrowserLower: Compare;
  PCQQBrowserCompare: Compare;
  isNowOpenSDK: boolean;
  nowOpenSDKVersion: Version;
  nowOpenSDKUpper: Compare;
  nowOpenSDKLower: Compare;
  nowOpenSDKCompare: Compare;
  isComicReader: boolean;
  comicReaderVersion: Version;
  comicReaderUpper: Compare;
  comicReaderLower: Compare;
  comicReaderCompare: Compare;
  isWeibo: boolean;
  weiboVersion: Version;
  weiboUpper: Compare;
  weiboLower: Compare;
  weiboCompare: Compare;
  isYYB: boolean;
  YYBVersion: Version;
  YYBUpper: Compare;
  YYBLower: Compare;
  YYBCompare: Compare;
  isTencentLive: boolean;
  TencentLiveVersion: Version;
  TencentLiveUpper: Compare;
  TencentLiveLower: Compare;
  TencentLiveCompare: Compare;
  platform: "android" | "ios" | "pc";
  type: DeviceType;
  netType: Version;
  model: string;
}

class Device {
  public entry: Partial<DeviceInfo> = {};
  constructor() {
      this._init();
  }

  /**
   * 获取版本
   * @param {String} keyword
   * @return {String}
   */
  private version(name: DeviceType): string | null {
      return this.entry[name + "Version"] || null;
  }

  private _init() {
      regexp.forEach((args) => {
          this.addItem.apply(this, args);
      });

      this.entry.platform = this.entry.isIOS
          ? "ios"
          : this.entry.isAndroid
          ? "android"
          : "pc";

      regexp.forEach((args) => {
          const [name] = args;
          if (this.entry["is" + Up(name as DeviceType)]) {
              this.entry.type = name as DeviceType;
          }
      });

      // 网络类型
      this.entry.netType =
          getUa().match(/NetType\/(\w+)/i) && RegExp.$1.toUpperCase();

      // 机型，主要是安卓机型，例如 HUAWEI C8825D，SAMSUNG-GT-I9308_TD 等
      this.entry.model =
          getUa().match(/\(.*;\s?(\S*?\s?\S*?)\s?(Build)?\//i) && RegExp.$1;
      this.entry.userAgent = getUa;
  }

  private addItem(name: string, exp: string, verPos = 1) {
      const match = getUa().match(exp);
      const version =
          ((match && match[verPos]) || "").replace(/_/g, ".") || null;
      this.entry["is" + Up(name)] = !!match;
      this.entry[name + "Version"] = version;
      this.entry[name + "Upper"] = this._upper.bind(this, name);
      this.entry[name + "Lower"] = this._lower.bind(this, name);
      this.entry[name + "Compare"] = this._compare.bind(this, name);
  }

  private _upper(name: DeviceType, ver: string) {
      const v = this.version(name);
      return (v && this.compare(v, ver) >= 0) || false;
  }

  private _lower(name: DeviceType, ver: string) {
      const v = this.version(name);
      return (v && this.compare(v, ver) <= 0) || false;
  }

  private _compare(name: DeviceType, ver: string) {
      const v = this.version(name);
      return v ? this.compare(v, ver) : -2;
  }
  /*
   * 当a<b返回-1, 当a==b返回0, 当a>b返回1,
   * 约定当a或b非法则返回-1
   *
   * ps：该方法从qqapi.js中移植过来的
   */
  private compare(a: string, b: string) {
      let i;
      let l;
      let r;
      let len;
      let a1;
      let b1;
      a1 = String(a).split(".");
      b1 = String(b).split(".");

      for (i = 0, len = Math.max(a.length, b.length); i < len; i++) {
          l = (isFinite(a1[i]) && Number(a1[i])) || 0;
          r = (isFinite(b1[i]) && Number(b1[i])) || 0;
          if (l < r) {
              return -1;
          } else if (l > r) {
              return 1;
          }
      }

      return 0;
  }
}

export default new Device().entry;
