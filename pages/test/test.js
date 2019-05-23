import WxParse from '../../wxParse/wxParse';
var WpJson = require('../../wxParse/html2json.js');
Page({
  data:{
    htm: '<html>' +
      '<body><p>已知函数<img src="https://tiku.21cnjy.com/tikupic/3a/b8/3a9b8d2c362667f51f671c0db1b817b8.png" ' + 'style="vertical-align:middle;"/>向左平移<img src="https://tiku.21cnjy.com/tikupic/4a/88/4a3884cb02f1f6228ded7e411c345657.png" ' + 'style="vertical-align:middle;"/>个单位后，得到函数<img ' + 'src="https://tiku.21cnjy.com/tikupic/77/40/77e40e44ffd0743232fd709c12f6157e.png" style="vertical-align:middle;"/>，下列关于<img' + ' src="https://tiku.21cnjy.com/tikupic/77/40/77e40e44ffd0743232fd709c12f6157e.png" style="vertical-align:middle;"/>的说法正确的是' + '（ ）</p><div width="100%">A．图象关于点<img src="https://tiku.21cnjy.com/tikupic/f7/90/f71902c8aef489048c906b3d46a327f8.png" ' + 'style="vertical-align:middle;"/>中心对称</div><div width="100%">B．图象关于<img ' + 'src="https://tiku.21cnjy.com/tikupic/cd/45/cd3459fc3128b315347f323d0f70f6b3.png" style="vertical-align:middle;"/>轴对称' + '</div><div width="100%">C．在区间<img src="https://tiku.21cnjy.com/tikupic/63/75/636753b8f5e7589c81efd535cfc8f7f1.png" ' + 'style="vertical-align:middle;"/>单调递增</div><div width="100%">D．在<img ' +
      'src="https://tiku.21cnjy.com/tikupic/4c/ad/4c8adab589f40950e22847dd72fa91a0.png" style="vertical-align:middle;"/>单调递减</div>' +
      '</body>' +
      '</html>',


    html: '<html>'+
      '<body><p>已知函数<img src="https://tiku.21cnjy.com/tikupic/3a/b8/3a9b8d2c362667f51f671c0db1b817b8.png"'+' style="vertical-align:middle;" />向左平移<img src="https://tiku.21cnjy.com/tikupic/4a/88/4a3884cb02f1f6228ded7e411c345657.png" '+'style="vertical-align:middle;" />个单位后，得到函数<img '+'src="https://tiku.21cnjy.com/tikupic/77/40/77e40e44ffd0743232fd709c12f6157e.png" style="vertical-align:middle;" />，下列关于<img'+' src="https://tiku.21cnjy.com/tikupic/77/40/77e40e44ffd0743232fd709c12f6157e.png" style="vertical-align:middle;" />的说法正确的是'+'（ ）</p><table name="optionsTable" cellpadding="0" cellspacing="0" width="100%"><tr><td width="100%">A．图象关于点<img '+'src="https://tiku.21cnjy.com/tikupic/f7/90/f71902c8aef489048c906b3d46a327f8.png" style="vertical-align:middle;" />中心对称'+'</td></tr><tr><td width="100%">B．图象关于<img src="https://tiku.21cnjy.com/tikupic/cd/45/cd3459fc3128b315347f323d0f70f6b3.png"'+' style="vertical-align:middle;" />轴对称</td></tr><tr><td width="100%">C．在区间<img '+'src="https://tiku.21cnjy.com/tikupic/63/75/636753b8f5e7589c81efd535cfc8f7f1.png" style="vertical-align:middle;" />单调递增'+'</td></tr><tr><td width="100%">D．在<img src="https://tiku.21cnjy.com/tikupic/4c/ad/4c8adab589f40950e22847dd72fa91a0.png" '+'style="vertical-align:middle;" /></td></tr></table>'
     +' </body>'+
    '</html>',
    htmla: '<html>\n  <body><p>已知角θ的顶点与原点重合，始边与x轴的正半轴重合，终边在直线y＝2x上，则cos2θ＝（ ）</p><table '+'name=\"optionsTable\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tr><td width=\"25%\">A．－<img '+'src=\"https://tiku.21cnjy.com/tikupic/f4/7c/f4e7c22f5694dda3bc09dba853afc0d5.png\" style=\"vertical-align:middle;\"/></td><td '+'width=\"25%\">B．－<img src=\"https://tiku.21cnjy.com/tikupic/a3/ec/a38ec696f21ee4fab015dd9657aaa783.png\" '+'style=\"vertical-align:middle;\"/></td><td width=\"25%\">C．<img '+'src=\"https://tiku.21cnjy.com/tikupic/a3/ec/a38ec696f21ee4fab015dd9657aaa783.png\" style=\"vertical-align:middle;\"/></td> <td'+' width=\"25%\">D．<img src=\"https://tiku.21cnjy.com/tikupic/f4/7c/f4e7c22f5694dda3bc09dba853afc0d5.png\"'+' style=\"vertical-align:middle;\"/></td></tr></table>\n</body>\n</html>\n'
  },
  onLoad:function(){
    var that = this
    var htmlAry = []
    htmlAry = WpJson.html2json(that.data.htmla, 'returnData')
    console.log(htmlAry)
    that.setData({
      htmlAry: htmlAry
    })
    //var array = WxParse.wxParse('article', 'html', that.data.htmla, that)
    console.log(array)
  }
})