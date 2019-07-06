const app = getApp();

const Data = {
  typeName: '',
  subjectName: '',
};

Page({
  data: {
    list: [],
    page: 0,
  },

  async onLoad(options) {
    ({
      typeName: Data.typeName,
      subjectName: Data.subjectName,
    } = options);

    const list = await this.fetchData(this.data.page);
    if (list.length === 0) {
      this.noResult();
      return;
    }
    this.setData({ list });
  },

  async fetchData(page) {
    app.toast('加载中');
    const response = await app.api.secondary.getTitle(app.subject(Data.subjectName).eng, Data.typeName, 20, page);
    app.hideToast();
    if (response.data === null) {
      return [];
    }
    return response.data.map(e => { return {title: e }; });
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
    const { title } = e.detail.data;
    app.route('../content/index', {
      typeName: Data.typeName,
      subjectEng: app.subject(Data.subjectName).eng,
      title,
    });
  },
});
