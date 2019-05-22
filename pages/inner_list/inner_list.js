const app = getApp();

const Data = {
  pageSize: 20,
  subject: '',
  searchValue: '',
  searchMode: '',
};

Page({
  data: {
    menuList: [],
    currentPage: 0,
    total: 1,
  },

  Set(option) {
    return new Promise(res => {
      this.setData(option, res);
    });
  },

  onLoad(options) {
    Data.subject = options.subject;
    Data.searchValue = options.searchValue;
    Data.searchMode = options.searchMode;
    this.fetchData(0).then(data => {
      // 如果返回的数据长度为 0，提示用户更换搜索条件
      if (data.dataList.length === 0) {
        this.onNoResult();
        return;
      }
      app.toast('加载成功!');
      this.Set({
        menuList: data.dataList,
        total: this.data.total + 1,
      });
    });
  },

  async fetchData(page) {
    const subject = app.globalData.subjectEnum[Data.subject].unique;
    const pageSize = Data.pageSize;
    const url = `/search/detail/test/${subject}/${pageSize}/${page}`;
    const data = Data.searchMode === '1' ? { content: Data.searchValue } : { title: Data.searchValue };

    const response = await app.post(url, {}, data);

    return response.data;
  },

  async onPageChange(e) {
    const toPage = e.detail.current - 1;
    const { dataList: menuList } = await this.fetchData(toPage);

    if (menuList.length === 0) {
      app.toast('没有更多数据了');
      return;
    }
    app.toast('加载成功');

    this.Set({
      menuList,
      currentPage: toPage,
      total: this.data.total + 1,
    });
  },

  onNoResult() {
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
});
