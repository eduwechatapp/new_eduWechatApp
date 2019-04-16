Page({
  data:{
    listName:{
    },
    subject:'',
    module:'',
  },
  onLoad:function(options){
    console.log(options)
    var that = this;
    if(options.arg=='知识点'){
      wx.request({
        url: 'http://129.204.216.249:4000/'+options.sub+'/knowledge/mapping/get', 
        header: {
          "Accept": "*/*" 
        },
        success: function (res) {
          console.log(res.data.data)
          that.setData({
            listName: res.data.data,
            subject: options.sub,
            module: options.arg
          })
          console.log(that.data.listName);
        }
      })
      }
    if(options.arg=='归纳总结'){
      wx.request({
        url: 'http://129.204.216.249:4000/'+options.sub+'/summary/mapping/get',
        header: {
          "Accept": "*/*"
        },
        success: function (res) {
          console.log(res.data.data)
          that.setData({
            listName: res.data.data,
            subject: options.sub,
            module: options.arg
          })
          console.log(that.data.listName);
        }
      })
    }
    if(options.arg=='专题'){
      wx.request({
        url: 'http://129.204.216.249:4000/'+options.sub+'/topic/mapping/get',
        header: {
          "Accept": "*/*"
        },
        success: function (res) {
          console.log(res.data.data)
          that.setData({
            listName: res.data.data,
            subject: options.sub,
            module: options.arg
          })
          console.log(that.data.listName);
        }
      })
    }
    if(options.arg=='答题模版'){
      wx.request({
        url: 'http://129.204.216.249:4000/'+options.sub+'/template/mapping/get',
        header: {
          "Accept": "*/*"
        },
        success: function (res) {
          console.log(res.data.data)
          that.setData({
            listName: res.data.data,
            subject: options.sub,
            module: options.arg
          })
          console.log(that.data.listName);
        }
      })
    }
  },
  toInnerList:function(event){
    var id = event.currentTarget.dataset.id;
    console.log(this.data.module);
    wx.navigateTo({
      url: '../inner_list/inner_list?array=' + [this.data.subject, id,this.data.module],
    })
  }
})
