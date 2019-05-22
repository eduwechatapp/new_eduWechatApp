import WxParse from '../../wxParse/wxParse';
Page({
  data:{
    yiji:'',
    erji:'',
    subject:'',
    contentList:'',
    html:'<html>'+
  '<body><p>已知函数<img src="https://tiku.21cnjy.com/tikupic/3a/b8/3a9b8d2c362667f51f671c0db1b817b8.png" '+'style="vertical-align:middle;"/>向左平移<img src="https://tiku.21cnjy.com/tikupic/4a/88/4a3884cb02f1f6228ded7e411c345657.png" '+'style="vertical-align:middle;"/>个单位后，得到函数<img '+'src="https://tiku.21cnjy.com/tikupic/77/40/77e40e44ffd0743232fd709c12f6157e.png" style="vertical-align:middle;"/>，下列关于<img'+' src="https://tiku.21cnjy.com/tikupic/77/40/77e40e44ffd0743232fd709c12f6157e.png" style="vertical-align:middle;"/>的说法正确的是'+'（ ）</p><<div width="100%">A．图象关于点<img src="https://tiku.21cnjy.com/tikupic/f7/90/f71902c8aef489048c906b3d46a327f8.png" '+'style="vertical-align:middle;"/>中心对称</div><div width="100%">B．图象关于<img '+'src="https://tiku.21cnjy.com/tikupic/cd/45/cd3459fc3128b315347f323d0f70f6b3.png" style="vertical-align:middle;"/>轴对称'+'</div><div width="100%">C．在区间<img src="https://tiku.21cnjy.com/tikupic/63/75/636753b8f5e7589c81efd535cfc8f7f1.png" '+'style="vertical-align:middle;"/>单调递增</div><div width="100%">D．在<img '+
'src="https://tiku.21cnjy.com/tikupic/4c/ad/4c8adab589f40950e22847dd72fa91a0.png" style="vertical-align:middle;"/>单调递减</div>'+
'</body>'+
'</html>'
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