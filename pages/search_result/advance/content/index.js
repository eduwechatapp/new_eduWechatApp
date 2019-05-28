const app = getApp();

const Data = {
  searchValue: '',
  searchMode: '',
  subjectName: '',
};

Page({
  data: {
    article: {},
    subjectName: '',
    cindex: 0,
  },

  async onLoad(options) {
    const { subjectName, index: sindex, searchValue, searchMode } = options;
    const index = parseInt(sindex);
    Data.searchValue = searchValue;
    Data.subjectName = subjectName;
    Data.searchMode = searchMode;
    const response = await this.fetchData(index);
    this.setData({
      article: response[0],
      subjectName: subjectName,
      cindex: index,
    });
  },

  async fetchData(index) {
    let subjectUnique = '';
    app.globalData.subjectEnum.some(e => {
      if (e.name === Data.subjectName) {
        subjectUnique = e.unique;
      }
    });
    const mode = Data.searchMode == 0 ? 'title' : 'content';

    const response = await app.api.search.advance(Data.searchValue, 1, index, subjectUnique, mode);

    return response.data.dataList;
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
