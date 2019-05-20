//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
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
    })
  },
  globalData: {
    userInfo: null,
    contentList: '',
    simpleList: '',
    knowledge: '',
    conclusion: '',
    template: '',
    summary: '',
    subjectEnum: [
      { name: '英语', unique: 'yy', index: 0 },
      { name: '数学', unique: 'sx', index: 1 },
      { name: '语文', unique: 'yw', index: 2 },
      { name: '化学', unique: 'hx', index: 3 },
      { name: '物理', unique: 'wl', index: 4 },
      { name: '生物', unique: 'sw', index: 5 },
      { name: '地理', unique: 'dl', index: 6 },
      { name: '政治', unique: 'zz', index: 7 },
      { name: '历史', unique: 'ls', index: 8 },
    ],
  },
});
