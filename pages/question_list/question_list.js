import WxParse from '../../wxParse/wxParse';
Page({
  data:{
    yiji:'',
    erji:'',
    subject:'',
    contentList:''
  },
  onLoad:function(options){
    var that = this;
    var array = new Array();
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
        that.setData({
          contentList: res.data.data
        })
        
        that.data.contentList.forEach(function(value,index){
          console.log(value.content)
          array.push(value.content)
        })
        console.log(array)
        for (let i = 0; i < array.length; i++) {
          WxParse.wxParse('array' + i, 'html', array[i], that);
          if (i === array.length - 1) {
            WxParse.wxParseTemArray("array", 'array', array.length, that)
          }
        }
      }
    })
  }
})