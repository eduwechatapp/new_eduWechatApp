import { post } from '../../utils/request';

const globalData = getApp();

const Data = {
  subjectEnum: ['yy', 'sx', 'yw', 'hx', 'wl', 'sw', 'dl', 'zz', 'ls'],
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
    const that = this;
    const { searchValue } = options;
    this.fetchData(searchValue);
  },

  async fetchData(key) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
    });

    const response = await post(`/search/simple/test/${key}/5/0`);
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
    wx.navigateTo({
      url: '../inner_list/inner_list',
    });
  },

  toText(e) {
    const that = this;
    console.log(e);
    this.setData({
      dataset_id: e.currentTarget.dataset.id,
      id: e.currentTarget.id,
    });
    for (let i = 0; i < 9; i++) {
      if (that.data.subjectLUT[i].sub == that.data.dataset_id) {
        that.setData({
          index: i,
        });
      }
    }
    wx.navigateTo({
      url: '../content/content?array=' + [that.data.dataset_id, that.data.id, that.data.module] + '&text=' + [that.data.index, that.data.id, that.data.input]
    });
  },
});
