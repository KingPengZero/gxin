require('babel-polyfill');

const environment = {
  development: { // 开发环境
    evnname: 'development',
    // ServerAPI: 'http://172.20.56.28:11503',
    ServerAPI: 'http://172.20.95.41:11503',
    isProduction: false,
    isTest: false,
    // fileServer: { postUrl: 'http://172.20.95.138:9910/upworkplace.php', imgUrl: 'http://172.20.95.138:9910/workplace/{0}' },
  },
  testenv: { // 测试环境
    evnname: 'testenv',
    ServerAPI: 'http://172.20.95.36',                                        // 公司测试即信环境
    isProduction: false,
    isTest: true,
    // fileServer: { postUrl: 'http://172.20.95.91:9910/upworkplace.php', imgUrl: 'http://172.20.95.91:9910/workplace/{0}' }
  },
  production: {// 正式环境
    evnname: 'production',
    ServerAPI: 'http://172.20.95.41:11503',
    isProduction: true,
    // fileServer: { postUrl: 'http://172.20.95.91:9910/upworkplace.php', imgUrl: 'http://172.20.95.91:9910/workplace/{0}' }
  }
}[process.env.NODE_ENV || 'development'];

// const __host = '127.0.0.1';
const __host = '172.20.54.13';
module.exports = Object.assign({
  host: process.env.HOST || __host,
  port: process.env.PORT,
  apiHost: process.env.APIHOST || __host,
  apiPort: process.env.APIPORT,
  app: {
    title: '即信',
    description: '即信轻应用，手机应用程序.',
    head: {
      titleTemplate: '%s',
      meta: [
        { name: 'description', content: '即信轻应用，手机应用程序.' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: '即信' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: '即信' },
        { property: 'og:description', content: '即信轻应用，手机应用程序.' },
        { property: 'og:card', content: 'summary' },
        { property: 'og:site', content: '@jiaxin' },
        { property: 'og:creator', content: '@jiaxin' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' }
      ],
      script: [{ type: 'text/javascript', src: !!environment.isProduction ? './gocom.js' : 'http://172.20.95.91:9910/js/gocom.js' }]
    },
    IsHideNavBar: false,
    BuildPublicPath: '/tools/lighttask/',
    BaseName: '/tools/lighttask/',
  },
}, environment);

