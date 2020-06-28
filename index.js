const path = require('path')

module.exports = ({ globalPath, webpack, ...nextConfig } = {}) => ({
  ...nextConfig,

  webpack: (config, options) => {
    // 默认的 less 规则里面过滤掉对指定的 globalPath 的处理
    config.module.rules.find((rule) => String(rule.test) === String(/\.less$/)).exclude = [
      path.join(__dirname, globalPath)
    ]

    // copy 一份 less 规则给 global.less 用
    const ignoreGlobalLessLoaders = JSON.parse(JSON.stringify(options.defaultLoaders.less))

    // 这条规则有多个 loader，css-loader 是其中之一，并且 cssModules 是其控制
    // 找到它并关闭 cssModules
    ignoreGlobalLessLoaders.find(
      (loader) => typeof loader === 'object' && loader.loader.indexOf('css-loader') > -1
    ).options.modules = false

    config.module.rules.push({
      test: new RegExp(path.join(__dirname, globalPath) + '$'),
      use: ignoreGlobalLessLoaders
    })

    if (typeof webpack === 'function') {
      return webpack(config, options)
    }

    return config
  }
})
