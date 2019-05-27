const app = getApp();

const Data = {
  subjectEng: '',
  typeEng: '',
  which: '',
};

Page({
  data: {
    article: {},
    subjectName: '',
    contentIndex: 0,
  },

  async onLoad(options) {
    const { typeEng, subjectEng, which, index } = options;
    Data.subjectEng = subjectEng;
    Data.typeEng = typeEng;
    Data.which = which;

    let subjectName = '';
    app.globalData.subjectEnum.some(e => {
      if (e.eng === subjectEng) {
        subjectName = e.name;
      }
    });

    const list = await this.fetchData(index);

    this.setData({
      contentIndex: index,
      subjectName: subjectName,
      article: list[0],
    });
  },

  Get(url) {
    return new Promise(resolve => wx.request({ url: `https://www.vaskka.com/mp${url}`, success: res => resolve(res.data) }));
  },

  noMore() {
    app.toast('没有更多数据了');
  },

  async fetchData(page) {
    app.toast('加载中');
    const response = await this.Get(`/${Data.subjectEng}/${Data.typeEng}/get/test/${Data.which}/1/${page}`);
    app.hideToast();
    return response.data;
  },
});
