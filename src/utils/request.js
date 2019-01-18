/* eslint-disable */
import { API_DOMAIN, getTokenSecret, APPID, getDomainAsync, loadSystemInfo, version} from './const'
const Fly = require('flyio/dist/npm/wx')
const fly = new Fly()

fly.interceptors.request.use( async (config, promise) => {
  // 给所有请求添加自定义header
  // config.headers['X-Tag'] = 'flyio'
  try {
    if (!wx.getStorageSync('domain')) {
      let baseUrl = await getDomainAsync()
      fly.config.baseURL = baseUrl
      wx.setStorageSync('domain', baseUrl)
      config.url = baseUrl + config.url
    }
  } catch (e) {
    //
  }
  await loadSystemInfo()
  let systemInfo = await wx.getStorageSync('systemInfo')
  let paramsString = await '3#' + systemInfo.version + '#' + systemInfo.model + '#1#' + version + '#'
  console.log(config)
  config.headers['app_id'] = APPID
  config.headers['mx_secret'] = getTokenSecret().secret
  config.headers['mx_token'] = getTokenSecret().token
  config.headers["Content-Type"] = 'application/json;charset=UTF-8';
  config.headers['app_params'] = paramsString

  wx.showLoading({
    title: '加载中',
  })
  return config
})

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use((response) => {
  console.log(response)
  wx.hideLoading()
  if (response.data.code === 1 && response.data.msg === 'success') {
    return response.data.body
  }
  !wx.hideErrorTip && wx.showToast({
    title: response.data.msg,
    icon: 'none',
    duration: 3000,
    mask: true,
  })
  return Promise.reject(response.data)
}, err => {
  // 发生网络错误后会走到这里
  wx.hideLoading()
  wx.showToast({
    title: err.status.toString(),
    icon: 'none',
    duration: 3000,
    mask: true,
  })
  return Promise.reject(err)
})
// 配置请求基地址
fly.config.baseURL = wx.getStorageSync('domain') || API_DOMAIN

export default fly
