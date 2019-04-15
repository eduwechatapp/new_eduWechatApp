const request = require('../../utils/request');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList:[],
    subject:'',
    which:'',
    offset:'',
    module:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var str = options.array;
    console.log(str);
    var array = str.split(',');
    console.log(array);
    if(array[2]=='知识点'){
      wx.request({
        url: 'http://129.204.216.249:8008/' + array[0] + '/knowledge/get/test/' + array[1] + '/200/0',
        header: {
          "Accept": "*/*"
        },
        success: function (res) {
          console.log(res.data.data)
          that.setData({
            menuList: res.data.data,
            subject: array[0],
            which: array[1],
            module: array[2]
          })
          console.log(that.data.menuList);
        }
      })
    }
    if(array[2]=='归纳总结'){
      wx.request({
        url: 'http://129.204.216.249:4000/'+array[0]+'/summary/get/test/'+array[1]+'/20/0',
        header: {
          "Accept": "*/*"
        },
        success: function (res) {
          console.log(res.data.data)
          that.setData({
            menuList: res.data.data,
            subject: array[0],
            which: array[1],
            module: array[2]
          })
          console.log(that.data.menuList);
        }
      })
    }
    if(array[2]=='专题'){
      wx.request({
        url: 'http://129.204.216.249:4000/' + array[0] + '/topic/get/test/' + array[1] + '/20/0',
        header: {
          "Accept": "*/*"
        },
        success: function (res) {
          console.log(res.data.data)
          that.setData({
            menuList: res.data.data,
            subject: array[0],
            which: array[1],
            module: array[2]
          })
          console.log(that.data.menuList);
        }
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
    var that = this;
    console.log(e)
    var id = e.currentTarget.id;
    var menuList = that.data.menuList;
    console.log("inner menulist: "+menuList);
    var title = menuList[id].title;
    var content = menuList[id].content;
    console.log("title :" + title+"content"+content);
    console.log("subject :" + that.data.subject + " which :" + that.data.which+" id: "+id+" module :"+that.data.module);
    wx.navigateTo({ url: '../content/content?array=' + [that.data.subject, that.data.which, id,that.data.module]});
  }
})