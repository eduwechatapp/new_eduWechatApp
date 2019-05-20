const app = getApp();

Page({
  data: {
    menuList: [],
  },

  onLoad(options) {
    const { subject, searchValue, searchMode } = options;
    this.fetchData(subject, searchValue, searchMode);
  },

  async fetchData(subject, searchValue, searchMode) {
    const data = searchMode === '1' ? { content: searchValue } : { title: searchValue };
    const response = await app.post(`/search/detail/test/${app.globalData.subjectEnum[subject].unique}/10/0`, {}, data);
    
    if (response.data.dataList.length === 0) {
      this.onNoResult();
      return;
    }

    this.setData({
      menuList: response.data.dataList,
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
