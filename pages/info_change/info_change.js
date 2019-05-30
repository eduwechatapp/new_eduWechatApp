// pages/info_change/info_change.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    subjectItems: [
      { name: '文科', value: 0 },
      { name: '理科', value: 1 }
    ],
    gradeItems:[
      { name: '高一', value: 0 },
      { name: '高二', value: 1 },
      { name: '高三', value: 2 }
    ],

    score:'400 - 650',
    name:'',
    location:'',
    school:'',
    haveset:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    
    that.setData({
      type: options.type,
    })
    var value = wx.getStorageSync('haveset')
    that.setData({
      haveset: value
    })
    app.globalData.haveset = value
    console.log(app.globalData.haveset)
    if(app.globalData.haveset){
      wx.getStorage({
        key: 'name',
        success: function(res) {
          that.setData({
            name:res.data
          })
        },
      })
      wx.getStorage({
        key: 'location',
        success: function (res) {
          that.setData({
            location: res.data
          })
        },
      })
      wx.getStorage({
        key: 'school',
        success: function (res) {
          that.setData({
            school: res.data
          })
        },
      })
      
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  afterChange:function(e){
    var that = this,
    value = e.detail.value,
      score = Math.floor(value[0] * 7.5) + ' - ' + Math.floor(value[1]*7.5)
    that.setData({
      score
    })
  },
  change:function(e){
    var that = this,
      value = e.detail.value,
      score = Math.floor(value[0] * 7.5) + ' - ' + Math.floor(value[1] * 7.5)
    that.setData({
      score
    })
  },
  input:function(e){
    var type = e.currentTarget.dataset.type
    this.setData({
      [type]:e.detail.value
    })

  },

  submit:function(e){
    
    setTimeout(()=>{
      wx.navigateBack({
        delta: 1
      });
        
    },0)
  },
  setMsg:function(e){
    var that  = this
    if(that.data.haveset==false){
      if (this.data.name == '' || this.data.location == '' || this.data.school == '') {
        wx.showModal({
          title: '提示',
          content: '请输入完整信息哦',
          showCancel: false
        })
      }
      else {
        wx.setStorage({
          key: 'name',
          data: that.data.name,
        })
        wx.setStorage({
          key: 'location',
          data: that.data.location,
        })
        wx.setStorage({
          key: 'school',
          data: that.data.school,
        })
        wx.setStorage({
          key: 'haveset',
          data: true,
        })
        that.setData({
          haveset: true
        })
        app.globalData.haveset = true
        wx.showModal({
          title: '消息',
          content: '设置成功！',
          showCancel: false,
          success(res) {
            if(res.confirm){
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
      }
    }
    else{
      wx.showModal({
        title: '提示',
        content: '请问您确定要修改信息吗？',
        success(res){
          if(res.confirm){
            that.setData({
              haveset:false,
              name:'',
              location:'',
              school:''
            })
            app.globalData.haveset=false
            wx.setStorage({
              key: 'haveset',
              data: false,
            })
          }
        }
      })
    }
    
  }
})