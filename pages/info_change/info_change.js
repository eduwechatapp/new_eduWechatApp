// pages/info_change/info_change.js
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

    score:'400 - 650'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      type: options.type
    })
    console.log(options)
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
    score = value[0] + ' - ' + value[1] 
    that.setData({
      score
    })
  },

  submit:function(e){
    
    setTimeout(()=>{
      wx.navigateBack({
        delta: 1
      });
        
    },0)
  }
})