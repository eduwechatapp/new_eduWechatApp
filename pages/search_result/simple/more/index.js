const app = getApp();

const Data = {
  searchValue: '',
  subjectName: '',
  page: 0,
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
        if (response.data[i].dataList.length > 0) {
          Data.page = e.detail.page;
        }
        return;
      }
    }
  },

  toContent(e) {
    let { index } = e.detail;
    index = Data.page * 20 + index;
    app.route('./content/index', { index, subjectName: Data.subjectName, searchValue: Data.searchValue });
  },
});
