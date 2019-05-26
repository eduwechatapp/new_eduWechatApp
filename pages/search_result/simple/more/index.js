const app = getApp();

const Data = {
  searchValue: '',
  subjectName: '',
};

Page({
  data: {
    list: [],
  },

  onLoad(options) {
    Data.searchValue = options.searchValue;
    Data.subjectName = options.subjectName;
  },

  async fetchData(e) {
    const response = await app.post(`/search/simple/test/${Data.searchValue}/20/${e.detail.page}`);
    for (let i = 0; i < response.data.length; i++) {
      if (response.data[i].subject === Data.subjectName) {
        this.setData({
          list: response.data[i].dataList,
        });
        return;
      }
    }
  },
});
