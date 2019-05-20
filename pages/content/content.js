const WxParse = require('../../wxParse/wxParse.js');
const app = getApp();

Page({
  data: {
  },

  onLoad() {
    WxParse.wxParse('article', 'html', app.globalData.content, this, 5);
    app.globalData.content = '';
  },
});
