const app = getApp();

const Data = {
  currentPage: 0,
  pageSize: 20,
  subject: '',
  searchValue: '',
  searchMode: '',
};

Page({
  data: {
    menuList: [],
  },

  onLoad(options) {
    Data.subject = options.subject;
    Data.searchValue = options.searchValue;
    Data.searchMode = options.searchMode;
    this.fetchData();
  },

  toast(title, icon, duration) {
    return new Promise(resolve => {
      wx.showToast({
        title,
        icon,
        duration,
        success() {
          resolve();
        },
      });
    });
  },

  async fetchData() {
    await this.toast('加载中', 'none', 2000);
  
    const data = Data.searchMode === '1' ? { content: Data.searchValue } : { title: Data.searchValue };
    const url = `/search/detail/test/${app.globalData.subjectEnum[Data.subject].unique}/${Data.pageSize}/${Data.currentPage}`;
    const response = await app.post(url, {}, data);

    wx.hideToast();

    if (response.data.dataList.length === 0) {
      if (this.data.menuList.length === 0) {
        this.onNoResult();
        return;
      }

      await this.toast('没有更多数据了', 'none', 2000);
    }

    await this.toast('加载成功', 'success', 2000);

    this.setData({
      menuList: response.data.dataList.concat(this.data.menuList),
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

  refresh() {
    this.fetchData();
  },
});
