import WxParse from '../../wxParse/wxParse';

const app = getApp();

Page({
  data: {
    select: 0,
  },

  onLoad() {
    WxParse.wxParse('article', 'html', app.globalData.content, this, 5);
    app.globalData.content = '';
  },

  changeState(e) {
    this.setData({
      select: e.currentTarget.dataset.id,
    });
  },
});
