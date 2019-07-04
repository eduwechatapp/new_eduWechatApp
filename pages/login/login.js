const app = getApp();
Page({
  data:{
    showRegister: false,
    select:'',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad(){
    app.getOpenid();
    var body = {};
    var that = this
    body.openid = app.globalData.openid;
    wx.request({
      url: 'http://129.204.216.249:4000/user/login',
      method: 'POST',
      data: body,
      success(res) {
        console.log(res)
        if(res.data.code==4003){
          that.setData({
            showRegister: true
          })
        }

      }
    })
  },
  changeRole(e){
    console.log(e)
    if(e.currentTarget.dataset.role=='student'){
      this.setData({
        select: 'student'
      })
    }
    else{
      this.setData({
        select: 'volunteer'
      })
    }
  },
  next(){
    var that = this
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              app.globalData.nickname = res.userInfo.nickName
              app.globalData.avatarUrl = res.userInfo.avatarUrl
            }
          })
          var body = {}
          body.openid = app.globalData.openid
          body.type = that.data.select
          body.name = app.globalData.nickname
          wx.request({
            url: 'http://129.204.216.249:4000/user/register',
            method:'POST',
            data:body,
            success(res){
              console.log(res)
              app.globalData.uid = res.uid
              wx.showModal({
                title: '提示信息',
                content: '恭喜您，注册成功~',
                showCancel:false,
                success(res) {
                  if (res.confirm) {
                    if (that.data.select == 'student') {
                      wx.navigateTo({
                        url: '../composition/composition',
                      })
                    }
                    else {
                    }
                  } 
                }
              })
            }
          })
        }
      }
    })
  }
})