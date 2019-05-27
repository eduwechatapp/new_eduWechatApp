const app = getApp();

const Data = {
  searchValue: '',
  searchMode: '',
};

Page({
  data: {
    articleList: [],
    subjectName: '',
    contentIndex: 0,
  },

  onLoad(options) {
    Data.searchValue = options.searchValue;
    Data.searchMode = options.searchMode;
    this.setData({
      contentIndex: options.index,
      subjectName: options.subjectName,
    });
  },

  async fetchData(e) {
    let subjectUnique = '';
    app.globalData.subjectEnum.some(e => {
      if (e.name === this.data.subjectName) {
        subjectUnique = e.unique;
      }
    });
    const url = `/search/detail/test/${subjectUnique}/1/${e.detail.index}`;
    const data = Data.searchMode == 0 ? { title: Data.searchValue } : { content: Data.searchValue };

    const response = await app.post(url, {}, data);

    this.setData({
      articleList: response.data.dataList,
    });
  },
});
