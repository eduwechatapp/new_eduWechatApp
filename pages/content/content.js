var WxParse = require('../../wxParse/wxParse.js');
var globalData = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList:[],
    article:{},
    argument:[],
    currentSelect:'notCare',
    storage_argument:[],
    search_argument:[],
    titleName:'',
    module:'',
    contentList:'',
    index:'',
    id:'',
    content:''
  },
  contentRequest: function (array) {
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var arti='';
    //普通阅读页面的变量处理
    var str=options.array;
    var array_str = str.split(',');
    var array = [array_str[0], array_str[1]-'0', array_str[2]-'0',array_str[3]]
    var str_storage = options.array;
    //缓存页面跳转至此的数据处理
    var str_storage_split = str.split(',');
    var array_storage = [str_storage_split[0], str_storage_split[1] - '0', str_storage_split[2]]
    console.log(options);
    console.log(array);
    console.log(array_storage)
    that.setData({
      argument:array
    })
    console.log("onLoad: "+array);
    //简单搜索搜索页面跳转至此的数据处理
    var array_search_str = options.array
    var array_search = array_search_str.split(',')
    //高级搜索页面跳转至此的数据处理
    if(array[3]=='搜索'){//高级搜索
      WxParse.wxParse('arti', 'html', globalData.contentList.dataList[array[2]].content, that, 5);
      that.setData({
        titleName: globalData.contentList.dataList[array[2]].title,
        search_argument: array[2],
        menuList: globalData.contentList.dataList,
        module: "搜索"
      })
      wx.setNavigationBarTitle({
        title: that.data.titleName
      })
    }
    if(array_search[2]=='搜索'){//简单搜索
      var text_str = options.text
      var text_array = text_str.split(',')
      var text = [text_array[0]-'0',text_array[1]-'0',text_array[2]]
      that.setData({
        module:"搜索"
      })
      console.log(text)
      wx.request({
        url: 'https://www.vaskka.com/mp/search/simple/' + 'test/' + text[2] + '/100/0',
        method: 'POST',
        header: {
          "Accept": "application/json"
        },
        success: function (res) {
          console.log(res.data.data)
          that.setData({
            contentList: res.data.data,
            index: text[0],
            id: text[1]
          })
          that.setData({
            titleName: that.data.contentList[that.data.index].dataList[that.data.id].title,
            content: that.data.contentList[that.data.index].dataList[that.data.id].content,
            
          })  
          wx.setNavigationBarTitle({
            title: that.data.titleName
          })
          WxParse.wxParse('arti', 'html', that.data.content, that, 5);
          //console.log(res.data.data.content);
          //console.log("content:"+that.data.menuList[0].content);
        }
      })

      
    }

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
          that.setData({
            titleName: that.data.menuList[array[2]].title
          })
          wx.setNavigationBarTitle({
            title: that.data.titleName
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
          that.setData({
            titleName: that.data.menuList[array[2]].title
          })
          wx.setNavigationBarTitle({
            title: that.data.titleName
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
          that.setData({
            titleName: that.data.menuList[array[2]].title
          })
          wx.setNavigationBarTitle({
            title: that.data.titleName
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
          that.setData({
            titleName: that.data.menuList[array[2]].title
          })
          wx.setNavigationBarTitle({
            title: that.data.titleName
          })
          //console.log(res.data.data.content);
          //console.log("content:"+that.data.menuList[0].content);
          WxParse.wxParse('arti', 'html', that.data.menuList[array[2]].content, that, 5);
        }
      })
    }
    if (array_storage[2] == '需要留意') {
      var key = new Array();
      var key_index = new Array();
      var string;
      var that = this;
      var length = 0;
      var count = 0;
      var temp_listName = new Array();
      var temp_storage = new Array();
      var storage_value;
      wx.getStorageInfo({
        success: function (res) {
          key = res.keys;
          console.log(key);
          for (var i = 0; i < key.length; i++) {
            string = key[i].split('_');
            //console.log(string[0]+string[1])
            if (string[0] == "attention" && string[1] == array_storage[0]) {
              key_index[count] = i;
              count++;
            }
          }
          count = 0;
          console.log(key_index)
          console.log(key[key_index[2]])
          for (var i = 0; i < key_index.length; i++) {

            storage_value = wx.getStorageSync(key[key_index[i]])
            console.log(storage_value)
            temp_listName.push(storage_value["title"])
            temp_storage.push(storage_value)
          }
          that.setData({
            listName: temp_listName,
            storage: temp_storage,
            module: array_storage[2],
            subject: array_storage[0],
            menuList: temp_storage,
            storage_argument:array_storage
          })
          that.setData({
            titleName: that.data.menuList[array_storage[1]].title
          })
          wx.setNavigationBarTitle({
            title: that.data.titleName
          })
          WxParse.wxParse('arti', 'html', that.data.menuList[array_storage[1]].content, that, 5);
        },
        
      })

    }
    if (array_storage[2] == '重点关注') {
      var key = new Array();
      var key_index = new Array();
      var string;
      var that = this;
      var length = 0;
      var count = 0;
      var temp_listName = new Array();
      var temp_storage = new Array();
      var storage_value;
      wx.getStorageInfo({
        success: function (res) {
          key = res.keys;
          console.log(key);
          for (var i = 0; i < key.length; i++) {
            string = key[i].split('_');
            //console.log(string[0]+string[1])
            if (string[0] == "focus" && string[1] == array_storage[0]) {
              key_index[count] = i;
              count++;
            }
          }
          count = 0;
          console.log(key_index)
          console.log(key[key_index[2]])
          for (var i = 0; i < key_index.length; i++) {

            storage_value = wx.getStorageSync(key[key_index[i]])
            console.log(storage_value)
            temp_listName.push(storage_value["title"])
            temp_storage.push(storage_value)
          }
          that.setData({
            listName: temp_listName,
            storage: temp_storage,
            module: array_storage[2],
            subject: array_storage[0],
            menuList: temp_storage,
            storage_argument: array_storage
          })
          that.setData({
            titleName: that.data.menuList[array_storage[1]].title
          })
          wx.setNavigationBarTitle({
            title: that.data.titleName
          })
          WxParse.wxParse('arti', 'html', that.data.menuList[array_storage[1]].content, that, 5);
        },

      })

    }
    var that = this;
    wx.getStorage({
      key: "button_" + that.data.argument[0] + "_" + that.data.argument[1] + "_" + that.data.argument[2] + "_" +that.data.argument[3],
      success: function(res) {
        console.log(res.data)
        that.setData({
          currentSelect:res.data
        })
      },
    })
    
    //content = options.content


  },
  switchStatus:function(e){
    this.setData({
      currentSelect:e.currentTarget.dataset.id
    })
    console.log(this.data.argument)
    if (this.data.currentSelect == "notCare"){
      wx.removeStorage({
        key: "attention" + "_" + this.data.argument[0] + "_" + this.data.argument[1] + "_" + this.data.argument[2] + "_" + this.data.argument[3],
        success: function(res) {
          console.log(res)
        },
      })
      wx.removeStorage({
        key: "focus" + "_" + this.data.argument[0] + "_" + this.data.argument[1] + "_" + this.data.argument[2] + "_" + this.data.argument[3],
        success: function (res) {
          console.log(res)
        },
      })
    }
    else if (this.data.currentSelect == "attention"){
      wx.removeStorage({
        key: "focus" + "_" + this.data.argument[0] + "_" + this.data.argument[1] + "_" + this.data.argument[2] + "_" + this.data.argument[3],
        success: function (res) {
          console.log(res)
        },
      })
      wx.setStorage({
        key: e.currentTarget.dataset.id + "_" + this.data.argument[0] + "_" + this.data.argument[1] + "_" + this.data.argument[2] + "_" + this.data.argument[3],
        data: this.data.menuList[this.data.argument[2]],
      })
    }
    else{
      wx.removeStorage({
        key: "attention" + "_" + this.data.argument[0] + "_" + this.data.argument[1] + "_" + this.data.argument[2] + "_" + this.data.argument[3],
        success: function (res) {
          console.log(res)
        },
      })
      wx.setStorage({
        key: e.currentTarget.dataset.id + "_" + this.data.argument[0] + "_" + this.data.argument[1] + "_" + this.data.argument[2] + "_" + this.data.argument[3],
        data: this.data.menuList[this.data.argument[2]],
      })
      console.log(this.data.currentSelect);
    }
    wx.setStorage({
      key: "button" + "_" + this.data.argument[0] + "_" + this.data.argument[1] + "_" + this.data.argument[2] + "_" + this.data.argument[3],
      data: this.data.currentSelect,
    })
  },


  pageUp: function(){
    var that = this;
    var which = that.data.argument;
    var length = that.data.menuList.length - 1;
    var storage_which = that.data.storage_argument;
    console.log("which: " + which);
    if (that.data.storage_argument[2] == '需要留意' || that.data.storage_argument[2] =='重点关注'){
      if (storage_which[1] == 0) {
        wx.showToast({
          title: '这是第一页噢',
          icon: 'none',
          duration: 2000
        })
      }

      else {
        storage_which[1] = storage_which[1] - 1;
        that.setData({
          storage_argument: storage_which
        })
        that.setData({
          titleName: that.data.menuList[that.data.storage_argument[1]].title
        })
        wx.setNavigationBarTitle({
          title: that.data.titleName
        })
        WxParse.wxParse('arti', 'html', that.data.menuList[that.data.storage_argument[1]].content, that, 5);
      }
    }
    else if(that.data.argument[3]=="搜索"){
      if (that.data.search_argument==0){
        wx.showToast({
          title: '这是第一页噢',
          icon: 'none',
          duration: 2000
        })
      }
      else{
        
        that.setData({
          search_argument:that.data.search_argument-1
        })
        WxParse.wxParse('arti', 'html', globalData.contentList.dataList[that.data.search_argument].content, that, 5);
        that.setData({
          titleName: globalData.contentList.dataList[that.data.search_argument].title,
        })
        wx.setNavigationBarTitle({
          title: that.data.titleName
        })
      }
    }
    else{
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
            that.setData({
              titleName: that.data.menuList[which[2]].title
            })
            wx.setNavigationBarTitle({
              title: that.data.titleName
            })
            //console.log(res.data.data.content);
            //console.log("content:"+that.data.menuList[0].content);
            WxParse.wxParse('arti', 'html', that.data.menuList[which[2]].content, that, 5);
          }
        })
        that.setData({
          argument: which,
        })
        that.setData({
          titleName: that.data.menuList[that.data.argument[2]].title
        })
        wx.setNavigationBarTitle({
          title: that.data.titleName
        })
        WxParse.wxParse('arti', 'html', that.data.menuList[that.data.argument[2]].content, that, 5);
        that.setData({
          currentSelect: ""
        })
        wx.getStorage({
          key: "button_" + that.data.argument[0] + "_" + that.data.argument[1] + "_" + that.data.argument[2] + "_" + that.data.argument[3],
          success: function (res) {
            console.log(res.data)
            that.setData({
              currentSelect: res.data
            })
          },
        })
      }
    }
    
  },
  pageDown: function(){
    var that = this;
    var which = that.data.argument;
    var length = that.data.menuList.length-1;
    console.log("which: " + which);
    var that = this;
    var which = that.data.argument;
    var length = that.data.menuList.length - 1;
    var storage_which = that.data.storage_argument;
    console.log("which: " + which);
    if (that.data.storage_argument[2] == '需要留意' || that.data.storage_argument[2] == '重点关注') {
      if (storage_which[1] == length) {
        wx.showToast({
          title: '已经是最后一页！',
          icon: 'none',
          duration: 2000
        })
      }
      else {
        storage_which[1] = storage_which[1] + 1;
        that.setData({
          storage_argument: storage_which
        })
        that.setData({
          titleName: that.data.menuList[that.data.storage_argument[1]].title
        })
        wx.setNavigationBarTitle({
          title: that.data.titleName
        })

        WxParse.wxParse('arti', 'html', that.data.menuList[that.data.storage_argument[1]].content, that, 5);
      }
    }
    else if (that.data.argument[3] == "搜索") {
      if (that.data.search_argument == that.data.menuList.length-1) {
        wx.showToast({
          title: '已经是最后一页！',
          icon: 'none',
          duration: 2000
        })
      }
      else {

        that.setData({
          search_argument: that.data.search_argument + 1
        })
        WxParse.wxParse('arti', 'html', globalData.contentList.dataList[that.data.search_argument].content, that, 5);
        that.setData({
          titleName: globalData.contentList.dataList[that.data.search_argument].title,
        })
        wx.setNavigationBarTitle({
          title: that.data.titleName
        })
      }
    }
    else{
      if (which[2] == length) {
        wx.showToast({
          title: '已经是最后一页！',
          icon: 'none',
          duration: 2000
        })
      }
      else {
        which[2] = which[2] + 1;
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
            that.setData({
              titleName: that.data.menuList[which[2]].title
            })
            wx.setNavigationBarTitle({
              title: that.data.titleName
            })
            WxParse.wxParse('arti', 'html', that.data.menuList[which[2]].content, that, 5);
          }
        })
        that.setData({
          argument: which,
        })
        that.setData({
          titleName: that.data.menuList[that.data.argument[2]].title
        })
        wx.setNavigationBarTitle({
          title: that.data.titleName
        })
        WxParse.wxParse('arti', 'html', that.data.menuList[that.data.argument[2]].content, that, 5);
        that.setData({
          currentSelect: ""
        })
        wx.getStorage({
          key: "button_" + that.data.argument[0] + "_" + that.data.argument[1] + "_" + that.data.argument[2] + "_" + that.data.argument[3],
          success: function (res) {
            console.log(res.data)
            that.setData({
              currentSelect: res.data
            })
          },
        })
      }
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