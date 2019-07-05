// const host = 'https://www.vaskka.com/mp';
const host = 'http://129.204.216.249:4000';

export function post(path, data = {}, param = {}) {
  const url = `${host}${path}`;
  return new Promise(resolve => {
    wx.request({ url, data, method: 'POST', success: res => resolve(res.data) });
  });
}

export function get(path, param = {}) {
  const url = `${host}${path}?${toURLParam(param)}`;
  return new Promise(resolve => {
    wx.request({ url, success: res => resolve(res.data) });
  });
}

export function toURLParam(data) {
  let ret = '';
  Object.keys(data).forEach((k, i) => {
    if (i > 0) {
      ret += '&';
    }
    ret += `${k}=${data[k]}`;
  });
  return ret;
}

export function openid() {
  return getApp().globalData.openid;
}
