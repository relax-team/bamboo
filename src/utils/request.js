/*
* axios 封装
* 中文说明文档：https://www.kancloud.cn/yunye/axios/234845
* === 调用方式 ===
* const res = await this.fetch({
*   url: 'getUserInfo',
*   data: {'test': 1}
* });
* console.log(res)
* */

import axios from 'axios'
import {Message} from 'element-ui'
import Store from '../store/index'
import router from '../router/index'
import cfg from '../../config/env/index'

export default async (opt) => {
  opt = Object.assign({
    loading: true,
    method: 'POST',
    headers: {},
    data: {},
    timeout: 10000  //设置默认超时
  }, opt);

  //处理opt中的url
  let reqUrl = opt.url;
  if (!reqUrl) {
    const error = 'request缺少必要参数, url: ' + opt.url;
    console.error(error);
    return Promise.reject({
      err_code: 1003,
      msg: error
    })
  }

  //拼接请求的url
  let baseURL = localStorage.getItem('ms_mock_api') || cfg.api.root; // api的base_url
  if(cfg.proxy){
    baseURL = cfg.api.node;
  }
  if (!/^http/.test(reqUrl)) {
    reqUrl = baseURL + reqUrl;
  }

  //创建一个axios示例，可以自定义配置
  const instance = axios.create({
    headers: Object.assign({}, opt.headers),
    timeout: opt.timeout, // request timeout
    withCredentials: true
  });

  //处理请求方式，默认post请求
  const fetch = function (opt) {
    if(opt.method.toUpperCase() === 'GET'){
      return instance.get(reqUrl, {params: opt.data});
    }
    return instance.post(reqUrl, opt.data);
  };

  //开始发送请求，处理返回结果
  let err, res;
  try {
    showLoading(opt);
    const response = await fetch(opt);
    hideLoading(opt);
    if (response.status === 200) {
      res = response.data;

      //针对不同的接口，处理不同的逻辑
      switch (+res.code) {
        case -1:
          //登录超时，需要重新登录
          let to = '/login', currPath = router.app._route.path;
          currPath && (to += '?go=' + currPath);
          router.push({path: to});
          break;
        case 200:
          //正常返回数据
          break;
        default:
          //异常
          err = {
            err_code: res.code,
            message: res.message
          };
          break;
      }

    } else {
      err = {
        err_code: response.status,
        message: response.statusText || '服务器错误'
      };
    }
    //统一错误提示
    if (err) return handleError(err);
    return res || {};
  } catch (e) {
    hideLoading(opt);
    return handleError(e);
  }
}

function handleError(err) {
  console.error('请求出错啦! #', err.err_code);
  Message({
    message: err.message,
    type: 'error',
    duration: 5 * 1000
  });
  return Promise.reject(err);
}

/*
* 显示loading
* */
function showLoading(opt) {
  if(!opt.loading) return;
  opt.timer && clearTimeout(opt.timer);
  opt.timer = setTimeout(() => {
    Store.dispatch("app/showLoading", true);
  }, 180);
}

/*
* 隐藏loading
* */
function hideLoading(opt) {
  opt.timer && clearTimeout(opt.timer);
  Store.dispatch("app/showLoading", false);
}
