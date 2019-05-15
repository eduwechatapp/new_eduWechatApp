// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoList: [{
      imageUrl: '../../pages/icon/subject.png',
      title: '文科/理科',
      function: 'toInfoChange',
      params: 'subject'
    }, {
      imageUrl: '../../pages/icon/grade.png',
      title: '年级',
      function: 'toInfoChange',
      params: 'grade'
    }, {
      imageUrl: '../../pages/icon/score.png',
      title: '模考分数区间',
      function: 'toInfoChange',
      params: 'score'
    }],
    funcList: [{
      imageUrl: '../../pages/icon/feedback.png',
      title: '功能建议',
      function: 'toFeedback'
    }, {
      imageUrl: '../../pages/icon/debug.png',
      title: 'BUG反馈',
      function: 'toFeedback'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  toInfoChange: function (e) {
    var params = e.detail.params
    wx.navigateTo({
      url: '../info_change/info_change?type=' + params,
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });

  },

  toFeedback: function () {
    wx.navigateTo({
      url: '../feedback/feedback'
    })
  }
})