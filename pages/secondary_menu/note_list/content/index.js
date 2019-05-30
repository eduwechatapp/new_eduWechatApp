const app = getApp();

const Data = {
  subjectName: '',
  type: '',
};

Page({
  data: {
    article: {},
    subjectName: '',
    cindex: 0,
  },

  async onLoad(options) {
    const { type, subjectName, index: sindex } = options;
    Data.type = type;
    Data.subjectName = subjectName;
    const index = parseInt(sindex);
    const list = await this.fetchData(index);

    if (app.globalData.lastView[Data.subjectName][type] === undefined) {
      app.globalData.lastView[Data.subjectName][type] = {};
    }
    app.globalData.lastView[Data.subjectName][type].title = list[0].title;
    app.setStore('lastView', app.globalData.lastView);

    this.setData({
      cindex: index,
      subjectName: subjectName,
      article: list[0],
    });
  },

  async fetchData(index) {
    const dict = {
      '需要留意': 1,
      '重点关注': 2,
    };
    const noteList = [];
    app.globalData.noteList[Data.subjectName].forEach(e => {
      if (e.importance === dict[Data.type]) {
        noteList.push(e);
      }
    });
    if (noteList.length > index) {
      app.toast('加载中...');
      const { data: article } = await app.api.notelist.fetchContent(Data.subjectName, noteList[index].title);
      app.hideToast();
      return [article];
    }
    return [];
  },

  async changePage(e) {
    const { index } = e.detail;
    if (index < 0) {
      app.toast('已经是第一页了');
      return;
    }
    const response = await this.fetchData(index);
    if (response.length === 0) {
      app.toast('没有更多数据了');
      return;
    }
    const article = response[0];
    app.globalData.lastView[Data.subjectName][type].title = article.title;
    app.setStore('lastView', app.globalData.lastView);
    this.setData({
      article,
      cindex: index,
    });
  },
});
