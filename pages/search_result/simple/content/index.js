const app = getApp();

const Data = {
  searchValue: '',
};

Page({
  data: {
    articleList: [],
    subjectName: '',
    contentIndex: 0,
  },

  onLoad(options) {
    Data.searchValue = options.searchValue;
    this.setData({
      contentIndex: options.index,
      subjectName: options.subjectName,
    });
  },

  async fetchData(e) {
    const index = e.detail.index;
    const response = await app.post(`/search/simple/test/${Data.searchValue}/1/${index}`);
    for (let i = 0; i < response.data.length; i++) {
      if (response.data[i].subject === this.data.subjectName) {
        this.setData({
          articleList: response.data[i].dataList,
        });
        return;
      }
    }
  },
});
