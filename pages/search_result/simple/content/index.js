const app = getApp();

const Data = {
  searchValue: '',
  subjectName: '',
};

Page({
  data: {
    article: {},
    subjectName: '',
    cindex: 0,
  },

  async onLoad(options) {
    const { subjectName, index: sindex, searchValue } = options;
    const index = parseInt(sindex);
    Data.searchValue = searchValue;
    Data.subjectName = subjectName;
    const response = await this.fetchData(index);
    this.setData({
      article: response[0],
      subjectName: subjectName,
      cindex: index,
    });
  },

  async fetchData(index) {
    app.toast('加载中...');
    const response = await app.api.search.simple(Data.searchValue, 1, index);
    app.hideToast();

    for (let i = 0; i < response.data.length; i++) {
      if (response.data[i].subject === Data.subjectName) {
        return response.data[i].dataList;
      }
    }
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
});
