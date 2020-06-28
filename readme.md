# next-global-less

在开启 css modules 的 less 项目中，指定一个文件让其不被 css modules 处理。


## Usage

```js
const withGlobalLess = require('./next-global-less')

module.exports = withGlobalLess({globalPath: './pages/global.less'})
```
