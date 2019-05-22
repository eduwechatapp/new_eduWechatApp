Page({
  data:{
    yiji:'',
    erji:'',
    subject:''
  },
  onLoad:function(options){
    var that = this;
    console.log(options)
    that.setData({
      yiji:options.yiji,
      erji:options.erji,
      subject: options.subject
    })
    wx.request({
      url: `http://129.204.216.249:4000/exercise/list/test/${that.data.subject}/${that.data.yiji}/${that.data.erji}/5/1`,
      success(res){
        console.log(res)
      }
    })
  }
})