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
    const { searchValue, subject, searchMode } = options;
    if (subject === '-1' && searchMode === '-1') { // 简单搜索
      this.simpleSearch(searchValue);
    } else {
      this.advanceSearch(searchValue, subject, searchMode);
    }
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

  /**
   * 简单搜索
   */
  async simpleSearch(key) {
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

  /**
   * 高级搜索
   */
  async advanceSearch(key, subject, mode) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
    });

    let data;
    if (mode === '1') { // 按内容搜索
      data = { content: key };
    } else {
      data = { title: key };
    }

    const response = await post(`/search/detail/test/${Data.subjectEnum[subject]}/5/0`, {}, data);
    wx.hideToast();

    if (response.data.dataList.length === 0) {
      this.onNoResult();
      return;
    }

    this.setData({
      contentList: response.data,
    });

    globalData.contentList = response.data.contentList;
    wx.hideToast();
    wx.navigateTo({
      url: '../inner_list/inner_list?array=' + ['', response.data.contentList.subject, this.data.module]
    });
  },

  onPageScroll(e) {
    this.setData({
      scrollTop: e.scrollTop,
    });
  },

  toDetail(e) {
    console.log(e.currentTarget.dataset.name);
  },

  toText(e) {
    var that = this;
    console.log(e)
    that.setData({
      dataset_id: e.currentTarget.dataset.id,
      id: e.currentTarget.id
    })
    var i
    for (i = 0; i < 9; i++) {
      if (that.data.subjectLUT[i].sub == that.data.dataset_id) {
        that.setData({
          index: i
        })
      }
    }
    wx.navigateTo({
      url: '../content/content?array=' + [that.data.dataset_id, that.data.id, that.data.module] + '&text=' + [that.data.index, that.data.id, that.data.input]
    })
  }
});
