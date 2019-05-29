const app = getApp();

const Data = {
  subjectName: '',
  type: '',
};

Page({
  data: {
    article: {},
    subjectName: '',
    cindex: 0,
  },

  async onLoad(options) {
    const { type, subjectName, index: sindex } = options;
    Data.type = type;
    Data.subjectName = subjectName;
    const index = parseInt(sindex);
    const list = await this.fetchData(index);

    this.setData({
      cindex: index,
      subjectName: subjectName,
      article: list[0],
    });
  },

  async fetchData(index) {
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
    if (noteList.length > index) {
      const { data: article } = await app.api.notelist.fetchContent(Data.subjectName, noteList[index].title);
      console.log('article', article);
      return [article];
    }
    return [];
  },

  async changePage(e) {
    const { index } = e.detail;
    if (index < 0) {
      app.toast('已经是第一页了');
      return;
    }
    const response = await this.fetchData(index);
    if (response.length === 0) {
      app.toast('没有更多数据了');
      return;
    }
    this.setData({
      article: response[0],
      cindex: index,
    });
  },
});
