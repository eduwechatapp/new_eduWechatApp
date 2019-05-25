import WxParse from '../../wxParse/wxParse';

const app = getApp();

const Data = {
  importanceList: ['不放心上', '我须留意', '重点关注'],
  index: 0,
  url: '',
  subject: '',
  title: '',
  erji: '',
};

Page({
  data: {
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
    const { index, subject } = options;
    Data.index = parseInt(index);
    Data.subject = subject;
    await app.toast('加载中');
    const list = await app.fetchContent(Data.index);
    await app.hideToast();
    if (list.length === 0) {
      console.error('content/onLoad');
      return;
    }
    Data.title = list[0].title;
    Data.erji = list[0].erji;
    const article = list[0];
    this.checkImportance(article.title, article.erji);
    WxParse.wxParse('article', 'html', article.content, this, 5);
  },

  checkImportance(title, erji) {
    let importance = 0;
    app.globalData.noteList[Data.subject].some(e => {
      if (e.title === title && e.erji === erji) {
        importance = e.importance;
      }
    });
    console.log('importance', importance);
    this.Set({
      importance: importance,
      importanceText: Data.importanceList[importance],
    });
  },

  changeState(e) {
    const importance = e.currentTarget.dataset.id;
    if (importance === this.data.importance) {
      return;
    }
    this.setData({
      importance,
      importanceText: Data.importanceList[importance],
      ifPopUpShow: !this.data.ifPopUpShow,
    });
    const list = app.globalData.noteList[Data.subject];
    let hasFind = false;
    for (let i = 0; i < list.length; i++) {
      if (list[i].erji === Data.erji && list[i].title === Data.title) {
        hasFind = true;
        if (importance === 0) {
          list.splice(i, 1);
        } else {
          list[i].importance = importance;
        }
        break;
      }
    }
    if (!hasFind && importance !== 0) {
      list.push({
        title: Data.title,
        erji: Data.erji,
        importance,
      });
    }
    console.log(list);
    app.setStore('noteList', app.globalData.noteList);
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
    Data.title = list[0].title;
    Data.erji = list[0].erji;
    Data.index = Data.index - 1;
    this.checkImportance(list[0].title, list[0].erji);
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
    Data.title = list[0].title;
    Data.erji = list[0].erji;
    Data.index = Data.index + 1;
    this.checkImportance(list[0].title, list[0].erji);
    WxParse.wxParse('article', 'html', list[0].content, this, 5);
  },
});
