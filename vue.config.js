// vue.config.js
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/warehouse-admin/' : '/',
  
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  },
  
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // 定制 Vant 主题色
            'primary-color': '#1989fa',
            'success-color': '#07c160',
            'warning-color': '#ff976a',
            'danger-color': '#ee0a24'
          }
        }
      }
    }
  },
  
  configureWebpack: {
    resolve: {
      alias: {
        '@': require('path').resolve(__dirname, 'src')
      }
    }
  }
})

// package.json 依赖配置
/*
{
  "name": "warehouse-admin",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    "vue": "^3.2.13",
    "vue-router": "^4.0.3",
    "vuex": "^4.0.0",
    "vant": "^4.0.0",
    "axios": "^1.4.0",
    "@vant/touch-emulator": "^1.4.0"
  },
  "devDependencies": {
    "@vue/cli-plugin-router": "~5.0.0",
    "@vue/cli-plugin-vuex": "~5.0.0",
    "@vue/cli-service": "~5.0.0",
    "less": "^4.1.3",
    "less-loader": "^11.1.0"
  }
}
*/

// .env.development
/*
NODE_ENV=development
VUE_APP_API_BASE_URL=http://localhost:3000/api
VUE_APP_TITLE=企业微信仓库管理系统
*/

// .env.production
/*
NODE_ENV=production
VUE_APP_API_BASE_URL=https://your-api-domain.com/api
VUE_APP_TITLE=企业微信仓库管理系统
*/