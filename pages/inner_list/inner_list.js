const request = require('../../utils/request');
var globalData = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList:[],//存储网络请求过后返回的数据
    subject:'',
    which:'',
    offset:'',
    module:''//存储模块名字
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var str = options.array;
    //console.log(str);
    var array = str.split(',');
    //console.log(array);
    console.log(options)
    if(array[2]=="搜索"){
      var contentList = globalData.contentList
      console.log(contentList)
      that.setData({
        menuList: contentList.dataList,
        module: array[2]
      })
      if(that.data.menuList.length == 0){
        wx.showModal({
          title: '提示',
          content: '查询无结果，建议更换关键字再次搜索哦',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 2
              })
            } 
          }
        })
      }

    }
    if(array[2]=='知识点'){
      wx.showToast({
        title: '加载ing',
        icon: 'loading'
      })
      wx.request({
        url:'https://www.vaskka.com/mp/'+array[0]+'/knowledge/get/test/'+array[1]+'/20/0',
        header: {
          "Accept": "*/*"
        },
        success: function (res) {
          wx.hideToast()
          //console.log(res.data.data)
          that.setData({
            menuList: res.data.data,
            subject: array[0],
            which: array[1],
            module: array[2]
          })
          globalData.knowledge = that.data.menuList
          //console.log(that.data.menuList);
        }
      })
    }
    if(array[2]=='归纳总结'){
      wx.showToast({
        title: '加载ing',
        icon: 'loading'
      })
      wx.request({
        url: 'https://www.vaskka.com/mp/'+array[0]+'/summary/get/test/'+array[1]+'/20/0',
        header: {
          "Accept": "*/*"
        },
        success: function (res) {
          wx.hideToast()
          //console.log(res.data.data)
          that.setData({
            menuList: res.data.data,
            subject: array[0],
            which: array[1],
            module: array[2]
          })
          globalData.conclusion = that.data.menuList
          //console.log(that.data.menuList);
        }
      })
    }
    if(array[2]=='专题'){
      wx.showToast({
        title: '加载ing',
        icon: 'loading'
      })
      wx.request({
        url: 'https://www.vaskka.com/mp/' + array[0] + '/topic/get/test/' + array[1] + '/20/0',
        header: {
          "Accept": "*/*"
        },
        success: function (res) {
          wx.hideToast()
          //console.log(res.data.data)
          that.setData({
            menuList: res.data.data,
            subject: array[0],
            which: array[1],
            module: array[2]
          })
          globalData.summary = that.data.menuList
          //console.log(that.data.menuList);
        }
      })
    }
    if (array[2] == '答题模版') {
      wx.showToast({
        title: '加载ing',
        icon: 'loading'
      })
      wx.request({
        url: 'https://www.vaskka.com/mp/' + array[0] + '/template/get/test/' + array[1] + '/20/0',
        header: {
          "Accept": "*/*"
        },
        success: function (res) {
          wx.hideToast()
          //console.log(res.data.data)
          that.setData({
            menuList: res.data.data,
            subject: array[0],
            which: array[1],
            module: array[2]
          })
          globalData.template = that.data.menuList
          //console.log(that.data.menuList);
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
    if(this.data.module=="搜索"){
      wx.navigateBack({
        delta: 2
      })
    }

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
    //console.log(e)
    var id = e.currentTarget.id;
    var menuList = that.data.menuList;
    //console.log("inner menulist: "+menuList);
    var title = menuList[id].title;
    var content = menuList[id].content;
    //console.log("title :" + title+"content"+content);
    //console.log("subject :" + that.data.subject + " which :" + that.data.which+" id: "+id+" module :"+that.data.module);
    wx.navigateTo({ url: '../content/content?array=' + [that.data.subject, that.data.which, id,that.data.module]});
   
  }
})