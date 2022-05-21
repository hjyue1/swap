<p align="center">
  <img src="https://isee.weishi.qq.com/live/wesee-live/swaplogo.png" alt="swaplogo" width="300" />
</p>

<p align="center">全新的架构：Mock集成框架</p>


## 为什么要使用SWAP
如果你有以下场景
- 开发web页面，苦苦等待后端调试
- 苦恼在APP调试移动H5页面（why？你可能使用到JSBridge）
- 要写很多非主业务和衍生文件进行单元测试
- 你的mock api需要侵入关联业务 or 手动开关mock

不妨尝试接入 `SWAP`，可以帮助您解决以上的问题。

### 根据不权威调研
客观分析开发一个移动H5需求的时间（某视APP榜单）:
- 业务代码开发与调试：2D
- 与后端联调：1D
- 编写单元测试：2D（90%覆盖率）
- 总时长：5D

使用了SWAP之后：
- 业务代码开发与调试：1D
- 与后端联调：0D
- 编写单元测试：1D
- 编写MockData: 0.5D
- 总时长：2.5D


## 特性
- 无侵入模拟API
- 熟悉的Node Response用法
- 支持jest，可以让你编写更少的单元测试
- 中心化Mock Data
- 支持JSBridge Mock 

## 如何使用
##### 注意事项
> - 需要在`https` 或 `localhost` 的域名中操作，自定义https域名可以利用`whistle`
> - webpack需要4.40.0以上版本

##### 1.安装依赖包
```bash
tnpm install @tencent/swap
```

##### 2.根据项目构建方案
  - 如果项目有使用webpack `4.40.0以上版本`
    ```js
    // webpack.config.js
    const SwapWebpackPlugin = require('@tencent/swap/webpackPlugin');
    ...
    module.exports = {
      ...
      plugins: [
        new SwapWebpackPlugin();
      ]
    }
    ```
  - 非webpack项目，请执行cmd，把swapSW.js生成到项目public目录
    ```bash
    npx swap init <xxxxxxx>
    ```
    > xxxxxxx 代表 public地址，如果是create-react-app，则如下
      ```bash
    npx swap init public
    ```

##### 3.项目中引用
```jsx
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// 引入swap
if (process.env.NODE_ENV === 'development') {
  const swap = require('@tencent/swap')
  const mockData = require('../mocker')
  swap.swapInit({
    mockData
  })
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```
```js
// mocker.js
module.exports = {
  'GET /list': (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: '201',
      }),
    )
  }
}
```

## Demo Example
  - [create-react-app](https://git.code.oa.com/swap/example/simple-react-example)
  - [vue](https://git.code.oa.com/swap/example/simple-vue-example)

## Document 
>[点击wiki查看](https://git.code.oa.com/rocketliu/swap/wikis/Document)


## JSBridge Document
>[点击查看](https://git.code.oa.com/rocketliu/swap-jsbridge)

## 如何在Jest环境下执行
>[点击wiki查看](https://git.code.oa.com/rocketliu/swap/wikis/Jest)

#### Jest Example
  - [create-react-app](https://git.code.oa.com/rocketliu/swap/wikis/Jest/create-react-app)
  - [vue](https://git.code.oa.com/rocketliu/swap/wikis/Jest/vue)

## FAQ
>[点击查看](https://git.code.oa.com/rocketliu/swap/wikis/FAQ)

## 展望
- 云端API接入
- 构建工具Plugin

## Contributors

感谢大家的贡献:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://git.code.oa.com/u/rocketliu"><img src="https://dayu.oa.com/avatars/rocketliu/profile.jpg" width="100px;" alt=""/><br /><sub><b>Rocketliu</b></sub></a></td>
    <td align="center"><a href="https://git.code.oa.com/u/frankjwang"><img src="https://dayu.oa.com/avatars/frankjwang/profile.jpg" width="100px;" alt=""/><br /><sub><b>Frankjwang</b></sub></a></td>
  </tr>
</table>