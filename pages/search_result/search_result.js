const app = getApp();

const Data = {
  searchValue: '',
};

Page({
  data: {
    contentList: [],
  },

  onLoad(options) {
    const { searchValue } = options;
    this.fetchData(searchValue);
    Data.searchValue = searchValue;
  },

  async fetchData(key) {
    await app.toast('加载中', 'loading');

    const response = await app.post(`/search/simple/test/${key}/5/0`);
    await app.hideToast();

    if (response.data.every(e => e.dataList.length === 0)) {
      this.onNoResult();
      return;
    }

    this.setData({
      contentList: response.data,
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

  onPageScroll(e) {
    this.setData({
      scrollTop: e.scrollTop,
    });
  },

  toMore(e) {
    app.route('./more/more', {
      searchValue: Data.searchValue,
      subjectName: e.currentTarget.dataset.subject,
    });
  },

  toContent(e) {
    const { index, subject: subjectName } = e.currentTarget.dataset;
    const list = this.data.contentList;
    for (let i = 0; i < list.length; i++) {
      if (list[i].subject === subjectName) {
        app.fetchContent = async function(_index) {
          const url = `/search/simple/test/${Data.searchValue}/1/${_index}`;
          const response = await app.post(url);
          let dataList = [];
          response.data.some(e => {
            if (e.subject === subjectName) {
              dataList = e.dataList;
            }
          });
          return dataList;
        };
        app.route('../content/content', { index, subjectName });
        return;
      }
    }
  },
});
