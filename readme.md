# next-global-less

在被 `next-less` 处理过且开启 css modules 的 less 项目中，指定一个文件让其不被 css modules 处理。


## Install

```sh
yarn add next-global-less
```

## Usage

```js
const withGlobalLess = require('./next-global-less')
const path = require('path')

module.exports = withGlobalLess({globalPath: path.join(__dirname, './pages/global.less')})
```
