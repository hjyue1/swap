[TOC]




## 1. webpack重复打包了`axios`
> 在 webpack config 的 **resolve.alias**申明下axios

```js
// webpack.config.js
module.exports = {
   ...,
  alias: {
        'axios': path.resolve(process.cwd(), 'node_modules', 'axios'),
   }
}
```


## 2. 如果是使用`webpack@5.x`版本，引入swap会报缺少Polyfill Node.js核心模块相关的错误
> 在 webpack config 的 **plugins** 使用 **node-polyfill-webpack-plugin** 可解决

```js
// webpack.config.js
module.exports = {
   ...,
  plugins: [
   ...,
   new NodePolyfillPlugin()
   ]
}
```

## 3. webpack无法热更新的问题
> 在 webpack config 的 **devServer** 指定 **public** 的地址

```js
// webpack.config.js
module.exports = {
   ...,
  devServer: {
    ...,
    public: 'xxxxxx'
  }
}
```
