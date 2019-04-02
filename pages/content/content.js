var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList:[],
    article:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var arti='';
    //var offset = options.id;
    var str=options.array;
    var array = str.split(',');
    console.log(array[0]);
    // var subject = options.subject;
    // var title = options.title;
    // var which = options.which;
    wx.request({
      url: 'http://129.204.216.249:8008/' + array[0] + '/knowledge/get/test/' + array[1] + '/20/0',
      header: {
        "Accept": "*/*"
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          menuList: res.data.data,
        })
        //console.log(res.data.data.content);
        //console.log("content:"+that.data.menuList[0].content);
        WxParse.wxParse('arti', 'html', that.data.menuList[array[2]].content, that, 5);
      }
    })
    //content = options.content


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

  }
})