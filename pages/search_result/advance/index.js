const app = getApp();

const Data = {
  searchValue: '',
  subjectName: '',
  searchMode: '',
};

Page({
  data: {
    list: [],
    page: 0,
  },

  async onLoad(options) {
    Data.searchValue = options.searchValue;
    Data.searchMode = options.searchMode;
    Data.subjectName = options.subjectName;
    const list = await this.fetchData(this.data.page);
    if (list.length === 0) {
      this.noResult();
      return;
    }
    this.setData({ list });
  },

  async fetchData(page) {
    app.toast('加载中');
    let subjectUnique = '';
    app.globalData.subjectEnum.some(e => {
      if (e.name === Data.subjectName) {
        subjectUnique = e.unique;
      }
    });
    const url = `/search/detail/test/${subjectUnique}/20/${page}`;
    const data = Data.searchMode == 0 ? { title: Data.searchValue } : { content: Data.searchValue };

    const response = await app.post(url, {}, data);

    app.hideToast();
    return response.data.dataList;
  },

  noResult() {
    wx.showModal({
      title: '提示',
      content: '查询无结果，建议更换关键字再次搜索哦',
      showCancel: false,
      success(res) {
        if (res.confirm) {
          wx.navigateBack({
            delta: 1
          });
        }
      },
    });
  },

  async changePage(e) {
    const { page } = e.detail;
    if (page < 0) {
      app.toast('已经是第一页了');
      return;
    }
    const list = await this.fetchData(page);
    if (list.length === 0) {
      app.toast('没有更多数据了');
      return;
    }
    this.setData({ list, page });
  },

  toContent(e) {
    const index = this.data.page * 20 + e.detail.index;
    app.route('./content/index', {
      index,
      subjectName: Data.subjectName,
      searchValue: Data.searchValue,
      searchMode: Data.searchMode,
    });
  },
});
