const app = getApp();

const Data = {
  subjectEng: '',
  subjectName: '',
  typeEng: '',
  type: '',
  which: '',
  typeEnum: {
    'knowledge': '知识点',
    'summary': '归纳总结',
    'topic': '专题',
    'template': '答题模版',
  },
};

Page({
  data: {
    article: {},
    subjectName: '',
    cindex: 0,
  },

  async onLoad(options) {
    const { typeEng, subjectEng, index: sindex } = options;
    const index = parseInt(sindex);
    Data.subjectEng = subjectEng;
    Data.typeEng = typeEng;
    Data.type = Data.typeEnum[typeEng];

    app.globalData.subjectEnum.some(e => {
      if (e.eng === subjectEng) {
        Data.subjectName = e.name;
      }
    });

    const list = await this.fetchData(index);

    if (app.globalData.lastView[Data.subjectName][Data.type] === undefined) {
      app.globalData.lastView[Data.subjectName][Data.type] = {};
    }
    app.globalData.lastView[Data.subjectName][Data.type].title = list[0].title;
    app.setStore('lastView', app.globalData.lastView);

    this.setData({
      cindex: index,
      subjectName: Data.subjectName,
      article: list[0],
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
    const response = await this.fetchData(index);
    if (response.length === 0) {
      app.toast('没有更多数据了');
      return;
    }
    app.globalData.lastView[Data.subjectName][Data.type].title = response[0].title;
    app.setStore('lastView', app.globalData.lastView);
    this.setData({
      article: response[0],
      cindex: index,
    });
  },

  async fetchData(index) {
    app.toast('加载中...');
    const response = await app.api.secondary.getData(Data.subjectEng, Data.typeEng, 1, index);
    app.hideToast();
    return response.data;
  },
});
