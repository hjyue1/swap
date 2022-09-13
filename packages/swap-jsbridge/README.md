<p align="center">
  <h1>rocket-swap-jsbridge</h1>
</p>

## 如何使用
安装依赖包
```bash
tnpm install rocket-swap-jsbridge
```
接下来
```js
// 1. Import mocking utils.
import { call, callWithPromise } from 'rocket-swap-jsbridge';
// 2. call
call('jsbridge://weseeLive/getLiveInfo', {})
```

## Document
### 方法
##### call( url, params, extendOpt? ): void
```js
- url:[sting]
- params:[Object]
- extendOpt: {
  type: 'live' | 'ws' | 'custom';
  parseCallback?: Function  // 自定义处理url和params组合，最终return的值将赋予给iframe.src, 时机：type为custom时，被调用
}
```
##### callWithPromise( url, params, extendOpt? ) : Promise
```js
- url:[sting]
- params:[Object]
- extendOpt: {
  type: 'live' | 'ws' | 'custom';
  parseCallback?: Function  // 自定义处理url和params组合，最终return的值将赋予给iframe.src, 时机：type为custom时，被调用
}
```
## Support
- **微视直播JsBridge(默认)**

- **微视端内**

- **自定义类**