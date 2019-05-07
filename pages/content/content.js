var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList:[],
    article:{},
    argument:[],
  },
  contentRequest: function (array) {
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var arti='';
    //var offset = options.id;
    var str=options.array;
    var array_str = str.split(',');
    var array = [array_str[0], array_str[1]-'0', array_str[2]-'0',array_str[3]]
    console.log(array);
    that.setData({
      argument:array
    })
    console.log("onLoad: "+array);
    //console.log(array[0]);
    // var subject = options.subject;
    // var title = options.title;
    // var title = options.title;
    // var which = options.which;
    if (array[3] == '知识点') {
      wx.request({
        url: 'https://www.vaskka.com/mp/' + array[0] + '/knowledge/get/test/' + array[1] + '/100/0',
        header: {
          "Accept": "*/*"
        },
        success: function (res) {
          //console.log(res.data.data)
          that.setData({
            menuList: res.data.data,
          })
          //console.log(res.data.data.content);
          //console.log("content:"+that.data.menuList[0].content);
          WxParse.wxParse('arti', 'html', that.data.menuList[array[2]].content, that, 5);
        }
      })
    }
    if (array[3] == '归纳总结') {
      wx.request({
        url: 'https://www.vaskka.com/mp/' + array[0] + '/summary/get/test/' + array[1] + '/100/0',
        header: {
          "Accept": "*/*"
        },
        success: function (res) {
          //console.log(res.data.data)
          that.setData({
            menuList: res.data.data,
          })
          //console.log(res.data.data.content);
          //console.log("content:"+that.data.menuList[0].content);
          WxParse.wxParse('arti', 'html', that.data.menuList[array[2]].content, that, 5);
        }
      })
    }
    if (array[3] == '专题') {
      wx.request({
        url: 'https://www.vaskka.com/mp/' + array[0] + '/topic/get/test/' + array[1] + '/100/0',
        header: {
          "Accept": "*/*"
        },
        success: function (res) {
          //console.log(res.data.data)
          that.setData({
            menuList: res.data.data,
          })
          //console.log(res.data.data.content);
          //console.log("content:"+that.data.menuList[0].content);
          WxParse.wxParse('arti', 'html', that.data.menuList[array[2]].content, that, 5);
        }
      })
    }
    if (array[3] == '答题模版') {
      
      wx.request({
        url: 'https://www.vaskka.com/mp/' + array[0] + '/template/get/test/' + array[1] + '/100/0',
        header: {
          "Accept": "*/*"
        },
        success: function (res) {
          //console.log(res.data.data)
          that.setData({
            menuList: res.data.data,
          })
          //console.log(res.data.data.content);
          //console.log("content:"+that.data.menuList[0].content);
          WxParse.wxParse('arti', 'html', that.data.menuList[array[2]].content, that, 5);
        }
      })
    }
    
    //content = options.content


  },
  


  pageUp: function(){
    var that = this;
    var which = that.data.argument;
    var length = that.data.menuList.length - 1;
    console.log("which: " + which);
    if (which[2] == 0) {
      wx.showToast({
        title: '这是第一页噢',
        icon: 'none',
        duration: 2000
      })
    }
    else {
      which[2] = which[2] - 1;
      switch (which[3]) {
        case "答题模版":
          module = "template";
          break;
        case "知识点":
          module = "knowledge";
          break;
        case "专题":
          module = "topic";
          break;
        case "归纳总结":
          module = "summary";
          break;
      }
      wx.request({
        url: 'https://www.vaskka.com/mp/' + which[0] + '/' + module + '/get/test/' + which[1] + '/100/0',
        header: {
          "Accept": "*/*"
        },
        success: function (res) {
          //console.log(res.data.data)
          that.setData({
            menuList: res.data.data,
          })
          //console.log(res.data.data.content);
          //console.log("content:"+that.data.menuList[0].content);
          WxParse.wxParse('arti', 'html', that.data.menuList[which[2]].content, that, 5);
        }
      })
      that.setData({
        argument: which,
      })
      WxParse.wxParse('arti', 'html', that.data.menuList[that.data.argument[2]].content, that, 5);
    }
  },
  pageDown: function(){
    var that = this;
    var which = that.data.argument;
    var length = that.data.menuList.length-1;
    console.log("which: " + which);
    if(which[2] == length){
      wx.showToast({
        title: '已经是最后一页！',
        icon: 'none',
        duration: 2000
      })
    }
    else{
      which[2] =which[2]+ 1;
      switch (which[3]) {
        case "答题模版":
          module = "template";
          break;
        case "知识点":
          module = "knowledge";
          break;
        case "专题":
          module = "topic";
          break;
        case "归纳总结":
          module = "summary";
          break;
      }
      wx.request({
        url: 'https://www.vaskka.com/mp/' + which[0] + '/'+module+'/get/test/' + which[1] + '/100/0',
        header: {
          "Accept": "*/*"
        },
        success: function (res) {
          //console.log(res.data.data)
          that.setData({
            menuList: res.data.data,
          })
          //console.log(res.data.data.content);
          //console.log("content:"+that.data.menuList[0].content);
          WxParse.wxParse('arti', 'html', that.data.menuList[which[2]].content, that, 5);
        }
      })
        that.setData({
          argument: which,
        })
      WxParse.wxParse('arti', 'html', that.data.menuList[that.data.argument[2]].content, that, 5);
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

  }
})