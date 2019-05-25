import WxParse from '../../wxParse/wxParse';

const app = getApp();

const Data = {
  importanceList: ['不放心上', '我须留意', '重点关注'],
  index: 0,
  url: '',
};

Page({
  data: {
    select: 1,
    ifPopUpShow: false,
    importanceText: '不放心上',
    importance: 0,
  },

  Set(options) {
    return new Promise(res => {
      this.setData(options, res);
    });
  },

  async onLoad(options) {
    const { index } = options;
    Data.index = parseInt(index);
    await app.toast('加载中');
    const list = await app.fetchContent(Data.index);
    await app.hideToast();
    if (list.length === 0) {
      console.error('content/onLoad');
      return;
    }
    WxParse.wxParse('article', 'html', list[0].content, this, 5);
  },

  changeState(e) {
    this.setData({
      importance: e.currentTarget.dataset.id,
      importanceText: Data.importanceList[e.currentTarget.dataset.id],
      ifPopUpShow: !this.data.ifPopUpShow,
    });
  },

  togglePopUp() {
    this.Set({
      ifPopUpShow: !this.data.ifPopUpShow,
    });
  },

  async prevPage() {
    if (Data.index === 0) {
      await app.toast('没有更多数据了');
      return;
    }
    await app.toast('加载中');
    const list = await app.fetchContent(Data.index - 1);
    await app.hideToast();
    if (list.length === 0) {
      await app.toast('没有更多数据了');
      return;
    }
    Data.index = Data.index - 1;
    WxParse.wxParse('article', 'html', list[0].content, this, 5);
  },

  async nextPage() {
    await app.toast('加载中');
    const list = await app.fetchContent(Data.index + 1);
    await app.hideToast();
    if (list.length === 0) {
      await app.toast('没有更多数据了');
      return;
    }
    Data.index = Data.index + 1;
    WxParse.wxParse('article', 'html', list[0].content, this, 5);
  },
});
