var globalData = getApp()
Page({
  data:{
    subject:'',
    model:'',
    search:'',
    contentList:[],
    scrollTop:0,
    dataset_id:'',
    id:'',
    module:'搜索',
    show:true,
    subjectLUT:[
      { sub: "数学", index: 0 },
      { sub: "语文", index: 1 },
      { sub: "英语", index: 2 },
      { sub: "物理", index: 3 },
      { sub: "化学", index: 4 },
      { sub: "生物", index: 5 },
      { sub: "地理", index: 6 },
      { sub: "历史", index: 7 },
      { sub: "政治", index: 8 }
    ],
    index:''
  },
  onLoad:function(options){
    var that = this;
    var str = options.array;
    var array = str.split(',');
    console.log(array)
    if(array[1]=="cancel" && array[2]=="cancel"){//简单搜索
      wx.showToast({
        title: '加载ing',
        icon: 'loading'
      })
      wx.request({
        url: 'https://www.vaskka.com/mp/search/simple/'+'test/'+array[0]+'/5/0',
        method:'POST',
        header: {
          "Accept": "application/json"
        },
        success: function (res) {
          wx.hideToast();
          console.log(res.data.data)
          
          that.setData({
            contentList: res.data.data,
            input: array[0]
          })
          if (that.data.contentList.length == 0) {
            wx.showModal({
              title: '提示',
              content: '查询无结果，建议更换关键字再次搜索哦',
              showCancel: false,
              success(res) {
                if (res.confirm) {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              }
            })
          }
          globalData.simpleList = res.data.data
         
          //console.log(res.data.data.content);
          //console.log("content:"+that.data.menuList[0].content);
        }
      })
    }
    else{//复杂搜索
      var detail
      if(array[2]=="title"){
        detail={
          "title" : array[0]
          }
      }
      if (array[2] == "content") {
        detail = {
          "content": array[0]
        }
      }
      console.log(detail)
      wx.showToast({
        title: '加载ing',
        icon: 'loading'
      })
      wx.request({
        url: 'https://www.vaskka.com/mp/search/detail/' + 'test/' + array[1] + '/100/0',
        method: 'POST',
        data:detail,
        header: {
          "Accept": "application/json"
        },
        success: function (res) {
          
          console.log(res.data.data)
          that.setData({
            contentList: res.data.data,
            input: array[0],
            show:false
          })
          globalData.contentList = that.data.contentList
          var contentListString = JSON.stringify(that.data.contentList.dataList)
          wx.hideToast()
        wx.navigateTo({
          url: '../inner_list/inner_list?array=' + ['', that.data.contentList.subject, that.data.module]
        })
          //console.log(res.data.data.content);
          //console.log("content:"+that.data.menuList[0].content);
        }
      })
    }
  },
  onPageScroll(e) {
    this.setData({
      scrollTop: e.scrollTop,
    })
  },
  toText:function(e){
    var that = this;
    console.log(e)
    that.setData({
      dataset_id: e.currentTarget.dataset.id,
      id:e.currentTarget.id
    })
    var i
    for(i=0;i<9;i++){
      if(that.data.subjectLUT[i].sub==that.data.dataset_id){
        that.setData({
          index: i
        })
      }
    }
    wx.navigateTo({
      url: '../content/content?array=' + [that.data.dataset_id, that.data.id, that.data.module] + '&text=' + [that.data.index, that.data.id,that.data.input]
    })
  }
})