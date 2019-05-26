const app = getApp();

const Data = {
  searchValue: '',
  subjectName: '',
  searchMode: '',
  page: 0,
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

    if (response.data.dataList.length > 0) {
      Data.page = e.detail.page;
    }

    this.setData({
      list: response.data.dataList,
    });
  },

  toContent(e) {
    let { index } = e.detail;
    index = Data.page * 20 + index;
    app.route('./content/index', {
      index,
      subjectName: Data.subjectName,
      searchValue: Data.searchValue,
      searchMode: Data.searchMode,
    });
  },
});
