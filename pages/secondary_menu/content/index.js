const app = getApp();

const Data = {
  subjectEng: '',
  title: '',
  typeName: '',
};

function splitContent(s) {
  const size = 100000;
  if (s.length > size) {
    return [s.substring(0, size), ...splitContent(s.substring(size))];
  } else {
    return [s];
  }
}

Page({
  data: {
    article: {},
    subjectName: '',
    cindex: 0,
  },

  async onLoad(options) {
    const { subjectEng, title, typeName } = options;
    Data.subjectEng = subjectEng;
    Data.title = title;
    Data.typeName = typeName;

    const article = await this.fetchData(subjectEng, title);
    const content = splitContent(article.content);
    article.content = [];

    const subjectName = app.subject(subjectEng).name;
    if (app.globalData.lastView[subjectName][typeName] === undefined) {
      app.globalData.lastView[subjectName][typeName] = {};
    }
    app.globalData.lastView[subjectName][typeName].title = article.title;
    app.setStore('lastView', app.globalData.lastView);

    this.setData({
      subjectName: subjectName,
      article,
    });
    content.forEach((c, i) => {
      this.setData({
        [`article.content[${i}]`]: c,
      });
    });
  },

  noMore() {
    app.toast('没有更多数据了');
  },

  async changePage(e) {
    const { index } = e.detail;
    if (index < 0) {
      app.toast('已经是第一页了');
      return;
    }
    const article = await this.fetchData(index);
    console.log(response);
    if (response.length === 0) {
      app.toast('没有更多数据了');
      return;
    }
    const subjectName = app.subject(Data.subjectEng).name;
    app.globalData.lastView[subjectName][Data.typeName].title = article.title;
    app.setStore('lastView', app.globalData.lastView);
    this.setData({
      article,
    });
  },

  async fetchData(subjectEng, title) {
    app.toast('加载中...');
    const response = await app.api.secondary.getContent(subjectEng, title);
    app.hideToast();
    return response.data;
  },
});
