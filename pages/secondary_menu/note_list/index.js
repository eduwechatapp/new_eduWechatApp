const app = getApp();

const Data = {
  list: [],
  type: '',
  subjectName: '',
};

Page({
  data: {
    list: [],
    page: 0,
  },

  async onLoad(options) {
    const { type, subjectName } = options;
    Data.type = type;
    Data.subjectName = subjectName;
  },

  async onShow() {
    /**
     * onShow 时如果 data.page !== 0, 则表示是从 content 目录返回
     * 回来的, 此时由于 list.length === 0, 表示用户在 content 目录更改
     * 了 article 的 importance, 那么就为用户显示最后一页。
     */
    await this.Set({ list: [] });
    const toLastPage = async page => {
      const list = await this.fetchData(page);
      if (list.length === 0) {
        if (page === 0) {
          this.noResult();
          return;
        }
        toLastPage(page - 1);
        return;
      }
      this.setData({ list, page });
    }
    await toLastPage(this.data.page);
  },

  Set(options) {
    return new Promise(resolve => {
      this.setData(options, resolve);
    });
  },

  async fetchData(page) {
    const dict = {
      '需要留意': 1,
      '重点关注': 2,
    };
    const noteList = [];
    app.globalData.noteList[Data.subjectName].forEach(e => {
      if (e.importance === dict[Data.type]) {
        noteList.push(e);
      }
    });
    const list = [];
    const begin = page * 20;
    for (let i = begin; i < noteList.length && i < begin + 20; i++) {
      list.push(noteList[i]);
    }
    return list;
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
      type: Data.type,
      subjectName: Data.subjectName,
    });
  },
});
