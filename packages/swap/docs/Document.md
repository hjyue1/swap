[TOC]

##### swapInit(initOpts): `void`
> 开始使用swap

```js
initOpts:{
  mockData: Object,           // mock数据
  isMock: Boolean             // 是否开启mock功能总开关
  bypassMode: 'all' | 'api' | 'jsbridge', // swap拦截时放过的请求类型
}
```

##### swapStop(): `void`
> 清除 swap service work

##### swapCall(url, params, extendOpt): `void`
> 调用JSBridge

```js
extendOpt: {
  type: 'live' | 'ws' | 'custom'; // default is live
  parseCallback?: Function        // 自定义处理params的回调
}
```

##### swapCallWithPromise(url, params, extendOpt): `Promise`
> 调用JSBridge

```js
extendOpt: {
  type: 'live' | 'ws' | 'custom'; // default is live
  parseCallback?: Function        // 自定义处理params的回调
}
```


##### swapJestInit(initOpts): `swapJestServer`
> jest环境下启用 swap


##### getSwapJestServer(): `swapJestServer`
> jest环境下启用 swap, 该方法依赖 `swapJestInit`，请先执行**swapJestInit**，才会生成**swapJestServer**

```js
swapJestServer: {
  listen: Function,             // 开启监听，拦截请求
  close: Function,              // 清除所有请求，并停止拦截请求
  use: Function,                // 自定义加入请求实例
  resetHandlers: Function,      // 重置为初始状态的请求
  restoreHandlers: Function,    // 将标记为once的请求重置
}
```

##### swapJestListen(): `void`
> 开启jest 请求拦截监听, 该方法依赖 `swapJestInit`，请先执行**swapJestInit**
