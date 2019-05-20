const host = 'https://www.vaskka.com/mp';

/**
 * POST请求，
 * URL：接口
 * postData：参数，json类型
 * doSuccess：成功的回调函数
 * doFail：失败的回调函数
 */
function request(url, postData, doSuccess, doFail) {
  wx.request({
    //项目的真正接口，通过字符串拼接方式实现
    url: host + url,
    header: {
      "content-type": "application/json;charset=UTF-8"
    },
    data: postData,
    method: 'POST',
    success: function(res) {
      //参数值为res.data,直接将返回的数据传入
      doSuccess(res.data);
    },
    fail: function() {
      doFail();
    },
  })
}

//GET请求，不需传参，直接URL调用，
function getData(url, doSuccess, doFail) {
  wx.request({
    url: host + url,
    header: {
      "content-type": "application/json;charset=UTF-8"
    },
    method: 'GET',
    success: function(res) {
      doSuccess(res.data);
    },
    fail: function() {
      doFail();
    },
  });
}

//webSocket
function webSocket(url) {
  wx.connectSocket({
    url: ws + url
  })
}

module.exports.request = request;
module.exports.getData = getData;
module.exports.webSocket = webSocket;
