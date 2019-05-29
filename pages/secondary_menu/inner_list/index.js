const app = getApp();

const Data = {
  list: [],
  typeEng: '',
  subjectEng: '',
  which: '',
};

Page({
  data: {
    list: [],
    page: 0,
  },

  async onLoad(options) {
    const { typeEng, subjectEng, which } = options;
    Data.typeEng = typeEng;
    Data.subjectEng = subjectEng;
    Data.which = which;

    const list = await this.fetchData(this.data.page);
    if (list.length === 0) {
      this.noResult();
      return;
    }
    this.setData({ list });
  },

  Get(url) {
    return new Promise(resolve => wx.request({ url: `https://www.vaskka.com/mp${url}`, success: res => resolve(res.data) }));
  },

  async fetchData(page) {
    app.toast('加载中');
    const response = await app.api.secondary.getDataByMap(Data.subjectEng, Data.typeEng, Data.which, 20, page);
    app.hideToast();
    return response.data;
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
      typeEng: Data.typeEng,
      subjectEng: Data.subjectEng,
      which: Data.which,
      index,
    });
  },
});
