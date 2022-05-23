export const isBypass = function (requestURL: any): boolean {
  /**
   * webpack 状态轮询的地址
   */
  const bypassRegExp= [
    // 匹配 http://********/sockjs-node/info?********
    /^(http|https):\/\/([\w\W]+)\/sockjs-node\/info/gi,
    // 匹配 http://********/********.hot-update
    /^(http|https):\/\/([\w\W]+)\/([\w\W]+).hot-update/gi,
    // 匹配 http://********/manifest.json
    /^(http|https):\/\/([\w\W]+)\/manifest.json/gi,
  ]

  return bypassRegExp.some(function (item) {
    if (requestURL.match(item)) {
      return true
    }
  })
}