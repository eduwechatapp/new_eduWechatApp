const app = getApp();

const Data = {
  searchValue: '',
  subjectName: '',
  searchMode: '',
};

Page({
  data: {
    list: [],
  },

  onLoad(options) {
    Data.searchValue = options.searchValue;
    Data.searchMode = options.searchMode;
    Data.subjectName = options.subjectName;
  },

  async fetchData(e) {
    let subjectUnique = '';
    app.globalData.subjectEnum.some(e => {
      if (e.name === Data.subjectName) {
        subjectUnique = e.unique;
      }
    });
    const url = `/search/detail/test/${subjectUnique}/20/${e.detail.page}`;
    const data = Data.searchMode == 0 ? { title: Data.searchValue } : { content: Data.searchValue };

    const response = await app.post(url, {}, data);

    this.setData({
      list: response.data.dataList,
    });
  },
});
