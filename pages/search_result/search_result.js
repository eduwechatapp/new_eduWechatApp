const app = getApp();

const Data = {
  searchValue: '',
};

Page({
  data: {
    subject: '',
    model: '',
    search: '',
    contentList: [],
    scrollTop: 0,
    dataset_id: '',
    id: '',
    module: '搜索',
    subjectLUT: [
      { sub: "数学", index: 0 },
      { sub: "语文", index: 1 },
      { sub: "英语", index: 2 },
      { sub: "物理", index: 3 },
      { sub: "化学", index: 4 },
      { sub: "生物", index: 5 },
      { sub: "地理", index: 6 },
      { sub: "历史", index: 7 },
      { sub: "政治", index: 8 },
    ],
    index: '',
  },

  onLoad(options) {
    const { searchValue } = options;
    this.fetchData(searchValue);
    Data.searchValue = searchValue;
  },

  async fetchData(key) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
    });

    const response = await app.post(`/search/simple/test/${key}/5/0`);
    wx.hideToast();

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

  toDetail(e) {
    const list = app.globalData.subjectEnum;
    let subject = '';
    for (let i = 0; i < list.length; i++) {
      if (list[i].name === e.currentTarget.dataset.name) {
        subject = list[i].index;
      }
    }

    app.route('../inner_list/inner_list', {
      searchValue: Data.searchValue,
      searchMode: 0,
      subject,
    });
  },

  toContent(e) {
    const { index, subject } = e.currentTarget.dataset;
    const list = this.data.contentList;
    for (let i = 0; i < list.length; i++) {
      if (list[i].subject === subject) {
        app.globalData.content = list[i].dataList[index].content;
        app.route('../content/content');
        return;
      }
    }
  },
});
