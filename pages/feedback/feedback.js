const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    maxlen: 140,
    len: 0,
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
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

  input: function (e) {
    var that = this;
    var value = e.detail.value;
    var len = parseInt(value.length);
    that.setData({
      content: value,
      len: len
    })
  },
  sentMsg:function(e){
    if(this.data.content!=''){
      wx.showModal({
        title: '消息',
        content: '感谢您的反馈，我们会努力做的更好哦~',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            wx.navigateBack({
              delta: 1
            })
          }
        }
      });
    }
    else{
      wx.showModal({
        title: '提示',
        content: '请输入内容哦',
        showCancel: false,
      });
    }
    
  }
})