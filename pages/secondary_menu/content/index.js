const app = getApp();

const Data = {
  subjectEng: '',
  typeEng: '',
  which: '',
};

Page({
  data: {
    article: {},
    subjectName: '',
    cindex: 0,
  },

  async onLoad(options) {
    const { typeEng, subjectEng, which, index: sindex } = options;
    const index = parseInt(sindex);
    Data.subjectEng = subjectEng;
    Data.typeEng = typeEng;
    Data.which = which;

    let subjectName = '';
    app.globalData.subjectEnum.some(e => {
      if (e.eng === subjectEng) {
        subjectName = e.name;
      }
    });

    const list = await this.fetchData(index);

    this.setData({
      cindex: index,
      subjectName: subjectName,
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
    this.setData({
      article: response[0],
      cindex: index,
    });
  },

  async fetchData(index) {
    app.toast('加载中...');
    const response = await app.api.secondary.getDataByMap(Data.subjectEng, Data.typeEng, Data.which, 1, index);
    app.hideToast();
    return response.data;
  },
});
