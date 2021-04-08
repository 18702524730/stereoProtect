import Flyio from './interceptors'
import API from '@/api'
import Config from './config'
import store from '@/store'

// 异常情况的错误处理
const errorFunction = (reqConfig, err) => {
  // 如果有异常需要提示
  if (!reqConfig.errorAction && reqConfig.isErrorDefaultTip) {
    setTimeout(() => {
      Config.resError.tipShow(err)
    }, 0)
  }
  throw (err)
}

// 获取1-5之间的随机数
let getRandomFn = function() {
  return Math.ceil(Math.random() * (3-1) + 1);
}

// 接口请求完之后加载后一段进度条
let animationFn = function () {
	store.commit('SET_COMPLETE', true);
  let percent_ = store.state.progress.percent;
  if (!percent_) { return; }
  function step() {
    if (percent_ < 100) {
      percent_ +=2;
      store.commit('SET_PERCENT', percent_)
      window.requestAnimationFrame(step);
    }
  }
  window.requestAnimationFrame(step);
}

let promises = [] // 接收接口请求的promise数组
// 接口请求封装函数
const rMethod = (url = '', data = {}, flyConfig = {}) => {
  let flyio = Flyio.request(url, data, {
    ...Config.flyConfig,
    ...flyConfig
  })

  promises.push(flyio)
  Promise.all(promises).then(data => {
    if (data.length !== promises.length) return
    animationFn();  //接口请求完之后加载后一段进度条
    promises = [] // 所有请求完后清除promise数组
  }).catch(() => {
    promises = [] // 请求异常完后清除promise数组
  })

  return flyio.then(res => {
    return res
  }).catch(err => {
    throw err;
  })
}

export default {
  //通用自定义
  request: rMethod,

  get(url, data, flyConfig = {}) {
    return rMethod(url, data, {
      ...Config.flyConfig,
      ...flyConfig,
      method: 'get'
    });
  },

  // flyConfig中method默认为post
  post: rMethod,

  put(url, data, flyConfig = {}) {
    return rMethod(url, data, {
      ...Config.flyConfig,
      ...flyConfig,
      method: 'put'
    });
  },

  delete(url, data, flyConfig = {}) {
    return rMethod(url, data, {
      ...Config.flyConfig,
      ...flyConfig,
      method: 'delete'
    });
  },
}
