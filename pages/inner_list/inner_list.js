const request = require('../../utils/request');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this,
    path = options.path,
    args = options.args

    

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

  // 获取列表信息
  getMenuList:function(path,args) {
    var that = this
    
    request.post(path,args).then(res=>{
      var menuList = res.data
      that.setData({
        menuList
      })
      
    })
  },

  // 
  toText:function(e){
    var that = this,
    id = e.currentTarget.id,
    menuList = that.data.menuList,
    title = menuList[id].title,
    content = menuList[id].content

    wx.navigateTo({ url: '../content/content?title='+title+'&content='+content });
  }
})