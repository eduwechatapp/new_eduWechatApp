Page({
  data:{
    listName:{
    },
    subject:''
  },
  onLoad:function(options){
    console.log(options)
    var that = this;
    if(options.arg=='知识点'){
      wx.request({
        url: 'http://129.204.216.249:8008/'+options.sub+'/knowledge/mapping/get', 
        header: {
          "Accept": "*/*" 
        },
        success: function (res) {
          console.log(res.data.data)
          that.setData({
            listName: res.data.data,
            subject: options.sub
          })
          console.log(that.data.listName);
        }
      })
      }
  },
  toInnerList:function(event){
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../inner_list/inner_list?sub=' + this.data.subject + '&which=' + id,
    })
  }
})
