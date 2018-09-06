// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Promise from 'es6-promise'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Moment from 'moment'
import MintUI from 'mint-ui'
import ElementUI from 'element-ui'
import jQuery from 'jquery'
import { config } from './config/config'
window.Promise = Promise

import 'element-ui/lib/theme-default/index.css'
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false

Vue.prototype.$http = axios
axios.defaults.baseURL = config.baseurl
axios.defaults.withCredentials = true

Vue.prototype.formatTime = function (time) {
  if (time === null) {
    return Moment().format('YYYY-MM-DD HH:mm:ss')
  }
  return new Moment(time).format('YYYY-MM-DD HH:mm:ss')
}
Vue.prototype.formatDate = function (time) {
  if (time === null) {
    return Moment().format('YYYY-MM-DD')
  }
  return new Moment(time).format('YYYY-MM-DD')
}
Vue.prototype.$ = jQuery

Vue.use(MintUI)
Vue.use(ElementUI)

Vue.prototype.kefu = config.kefu
Vue.prototype.kefuhao = config.kefuhao
Vue.prototype.wxAppId = config.wxAppId
Vue.prototype.wxRedirectURI = config.wxRedirectURI

Vue.filter('timeformat', function (value) {
  return new Moment(value).format('YYYY-MM-DD HH:mm:ss')
})
Vue.filter('dateformat', function (value) {
  return new Moment(value).format('YYYY.M.D')
})
Vue.filter('moneyformat', function (value) {
  if (value > 9999) {
    return value.toFixed(0)
  } else if (value > 999) {
    return value.toFixed(1)
  } else {
    return value.toFixed(2)
  }
})
Vue.filter('posnegformat', function (value) {
  if (value > 0) {
    value = '+' + value
  }
})
Vue.filter('lengthLimit', function (value) {
  if (value.length > 4) {
    value = value.substr(0, 4) + '...'
  }
  return value
})
Vue.filter('redPoStatus', function (value) {
  var statusName = ''
  if (value === 6) {
    statusName = '退款成功'
  } else if (value === 5) {
    statusName = '正在退款'
  } else if (value === 4) {
    statusName = '领取成功'
  } else if (value === 3) {
    statusName = '发放失败'
  } else if (value === 2) {
    statusName = '已发待领'
  } else if (value === 1) {
    statusName = '正在发放'
  } else if (value === 0) {
    statusName = '初始状态'
  }
  return statusName
})
var areas = new Map()
areas.set(10001, '毕节')
areas.set(10002, '贵阳')
areas.set(10003, '兴义')
areas.set(10004, '安顺')
areas.set(10005, '贵州')
areas.set(20001, '潮汕')
areas.set(20002, '茂名')
areas.set(20003, '韶关')
areas.set(30001, '呼包鄂')
areas.set(40001, '安徽')
areas.set(40002, '巢湖')
areas.set(50001, '河南')
areas.set(60001, '街坊')
areas.set(60002, '街坊')

var gameNames = new Map()
gameNames.set(10001, '麻友圈')
gameNames.set(10002, '麻友圈')
gameNames.set(10003, '麻友圈')
gameNames.set(10004, '麻友圈')
gameNames.set(10005, '麻友圈')
gameNames.set(20001, '雀友会')
gameNames.set(20002, '么么麻将')
gameNames.set(20003, '么么麻将')
gameNames.set(30001, '胡一把')
gameNames.set(40001, '麻友会')
gameNames.set(40002, '么么麻将')
gameNames.set(50001, '么么麻将')
gameNames.set(60001, '麻将')
gameNames.set(60002, '麻将')

Vue.prototype.getAreaName = function (code) {
  if (areas.get(code) === null) {
    return '麻将'
  }
  return areas.get(code)
}
Vue.prototype.getAreaGameName = function (code) {
  if (gameNames.get(code) === null) {
    return '发红包'
  }
  return gameNames.get(code)
}

var gameDownloadUrls = new Map()
gameDownloadUrls.set(60001, 'http://home.cn-jfqp.nbigame.com/download/mahjong.html')
gameDownloadUrls.set(60002, 'http://home.cn-hbcz.nbigame.com/download/mahjong.html')
Vue.prototype.getDownloadURL = function (code) {
  if (gameDownloadUrls.get(code) === null) {
    return 'http://404.html'
  }
  return gameDownloadUrls.get(code)
}
var errorMesMap = new Map()
errorMesMap.set(401, '未认证')
errorMesMap.set(404, '接口不存在')
errorMesMap.set(500, '服务器内部错误')
errorMesMap.set(0, '成功')
errorMesMap.set(10001, '失败')
errorMesMap.set(10002, '用户不存在')
errorMesMap.set(10003, '用户未授权')
errorMesMap.set(10004, '用户余额不足')
errorMesMap.set(10005, '已达到次数上限')
errorMesMap.set(10006, '提现失败')
errorMesMap.set(10007, '提现成功')
errorMesMap.set(10008, '红包发放失败')
errorMesMap.set(10009, '红包发放成功')
errorMesMap.set(10010, '红包正在发放')
errorMesMap.set(10011, '上个红包流程还没结束')
errorMesMap.set(10012, '提现金额超出限制')
errorMesMap.set(10006, '提现处理中')
errorMesMap.set(20000, '未知错误')
Vue.prototype.alertCode = function (code) {
  if (errorMesMap.get(code) === null) {
    alert('客户端未知错误')
  }
  alert(errorMesMap.get(code))
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
  created () {
    Vue.prototype.api = this.$route.query
    Vue.prototype.refer = document.referrer
  }
})
