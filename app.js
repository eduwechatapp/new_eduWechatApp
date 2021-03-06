import api from './api/index';

const host = 'https://www.vaskka.com/mp';

App({
  onLaunch() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });
    wx.cloud.init({
      env: 'kdgz-6vgzs',
      traceUser: true
    })
    // 加载缓存到 globalData
    this.checkCache();
    // 获取 open_id
    this.open_id = 'test';
    this.api = api;
  },

  globalData: {
    userInfo: null,
    contentList: '',
    simpleList: '',
    knowledge: '',
    conclusion: '',
    template: '',
    summary: '',
    content: '',
    openid:'',
    subjectEnum: [
      { name: '英语', unique: 'yy', index: 0, eng: 'english' },
      { name: '数学', unique: 'sx', index: 1, eng: 'math' },
      { name: '语文', unique: 'yw', index: 2, eng: 'chinese' },
      { name: '化学', unique: 'hx', index: 3, eng: 'chemistry' },
      { name: '物理', unique: 'wl', index: 4, eng: 'physics' },
      { name: '生物', unique: 'sw', index: 5, eng: 'biology' },
      { name: '地理', unique: 'dl', index: 6, eng: 'geography' },
      { name: '政治', unique: 'zz', index: 7, eng: 'political' },
      { name: '历史', unique: 'ls', index: 8, eng: 'history' },
    ],
  },

  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log('云函数获取到的openid: ', res.result.openId)
        var openid = res.result.openId;
        that.globalData.openid = openid
      }
    })
  },

  post(_url, urlParam = {}, data = {}) {
    let url = `${host}${_url}`;
    if (Object.keys(param).length > 0) {
      urlParam = '?';
      Object.keys(param).forEach((k, i) => {
        if (i > 0) {
          urlParam += '&';
        }
        urlParam += `${k}=${param[k]}`;
      });
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        data,
        method: 'POST',
        success(res) {
          resolve(res.data);
        },
        fail(res) {
          reject(res.data)
          wx.showToast({
            title: '网络错误!', //提示的内容,
            icon: 'none', //图标,
            duration: 2000, //延迟时间,
            mask: true, //显示透明蒙层，防止触摸穿透,
            success: res => { }
          });
        }
      });
    });
  },

  route(_url, param = {}) {
    let urlParam = '';
    if (Object.keys(param).length > 0) {
      urlParam = '?';
      Object.keys(param).forEach((k, i) => {
        if (i > 0) {
          urlParam += '&';
        }
        urlParam += `${k}=${param[k]}`;
      });
    }
    const url = `${_url}${urlParam}`;
    wx.navigateTo({ url });
  },

  toast(title, icon = 'none', duration = 1500) {
    return new Promise(res => {
      wx.showToast({
        title,
        icon,
        duration,
        success: res,
      });
    });
  },

  hideToast() {
    return new Promise(res => {
      wx.hideToast({
        success: res,
      });
    });
  },

  scrollTo(pos, duration = 300) {
    return new Promise(res => {
      wx.pageScrollTo({
        scrollTo: pos,
        duration,
        complete: res,
      });
    });
  },

  setStore(key, data) {
    return new Promise(res => {
      wx.setStorage({ key, data, complete: (e) => res(e.data) });
    });
  },

  getStore(key) {
    return new Promise(res => {
      wx.getStorage({ key, complete: (e) => res(e.data) });
    });
  },

  clearStore() {
    return new Promise(resolve => {
      wx.clearStorage({ complete: resolve });
    });
  },

  async checkCache() {
    let list = await this.getStore('noteList');
    if (list === undefined || list === '') {
      list = {};
      this.globalData.subjectEnum.forEach(e => {
        list[e.name] = [];
      });
      await this.setStore('noteList', list);
    }
    this.globalData.noteList = list;
  },
});
