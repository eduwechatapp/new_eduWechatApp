const app = getApp();

const Data = {
  searchValue: '',
  searchMode: '',
};

Page({
  data: {
    articleList: [],
    subjectName: '',
    cindex: 0,
  },

  onLoad(options) {
    Data.searchValue = options.searchValue;
    Data.searchMode = options.searchMode;
    this.setData({
      contentIndex: options.index,
      subjectName: options.subjectName,
    });
  },

  async fetchData(index) {
    let subjectUnique = '';
    app.globalData.subjectEnum.some(e => {
      if (e.name === this.data.subjectName) {
        subjectUnique = e.unique;
      }
    });
    const url = `/search/detail/test/${subjectUnique}/1/${index}`;
    const data = Data.searchMode == 0 ? { title: Data.searchValue } : { content: Data.searchValue };

    const response = await app.post(url, {}, data);

    this.setData({
      articleList: response.data.dataList,
    });
  },

  async changePage(e) {
    const { index } = e.detail;
    if (index < 0) {
      app.toast('已经是第一页了');
      return;
    }
    const response = await this.fetchData(index);
  },
});
