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

    const list = await this.fetchData(this.data.page);
    if (list.length === 0) {
      this.noResult();
      return;
    }
    this.setData({ list });
  },

  async fetchData(page) {
    app.toast('加载中');
    const dict = {
      '需要留意': 1,
      '重点关注': 2,
    };
    if (dict[Data.type] !== undefined) {
      const noteList = [];
      app.globalData.noteList[Data.subjectName].forEach(e => {
        if (e.importance === dict[Data.type]) {
          noteList.push(e);
        }
      });
      const list = [];
      const begin = page * 20
      for (let i = begin; i < noteList.length && i < begin + 20; i++) {
        list.push(noteList[i]);
      }
      app.hideToast();
      return list;
    }
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
    app.route('../content/index', {
      index,
    });
  },
});
