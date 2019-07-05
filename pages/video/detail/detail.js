const app = getApp();

const Data = {
  subjectName: '',
};

Page({
  data: {
    name: '',
    url: '',
  },

  onLoad(options) {
    const { name, url, subjectName } = options;
    Data.subjectName = subjectName;
    this.setData({
      name,
      url,
    });
  },

  onShow() {
    if (app.globalData.lastView[Data.subjectName].公开课 === undefined) {
      app.globalData.lastView[Data.subjectName].公开课 = {
        title: this.data.name,
      };
    } else {
      app.globalData.lastView[Data.subjectName].公开课.title = this.data.name;
    }
    app.setStore('lastView', app.globalData.lastView);
  },
});
