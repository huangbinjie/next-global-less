module.exports = ({ globalPath, webpack, ...nextConfig } = {}) => ({
  ...nextConfig,

  webpack: (config, options) => {
    if (!options.defaultLoaders) {
      throw new Error(
        'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
      )
    }

    if (!options.defaultLoaders.less) {
      throw new Error('Cannot find less config, make sure next-less is working correctly.')
    }

    // next-less 处理够会往 webpack 配置里面 push 这样的规则，找到并过滤掉对指定的 globalPath 的处理
    config.module.rules.find((rule) => String(rule.test) === String(/\.less$/)).exclude = globalPath

    // copy 一份 less loader 给 global.less 用
    const ignoreGlobalLessLoaders = JSON.parse(JSON.stringify(options.defaultLoaders.less))

    // 这个 loader 有多个子 loader，css-loader 是其中之一，并且 cssModules 是其控制
    // 找到它并关闭 cssModules
    ignoreGlobalLessLoaders.find(
      (loader) => typeof loader === 'object' && loader.loader.indexOf('css-loader') > -1
    ).options.modules = false

    config.module.rules.push({
      test: globalPath,
      use: ignoreGlobalLessLoaders
    })

    if (typeof webpack === 'function') {
      return webpack(config, options)
    }

    return config
  }
})
