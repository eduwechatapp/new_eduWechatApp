const app = getApp();

const Data = {
  subjectEnum: {
    '语文': 'chinese',
    '数学': 'math',
    '英语': 'english',
    '物理': 'physics',
    '化学': 'chemistry',
    '生物': 'biology',
    '政治': 'political',
    '历史': 'history',
    '地理': 'geography',
  },
};

Page({
  data: {
    listName: [],
    subject: '',
    module: '',
    storage: [],
    wxml_type: '',
  },

  Get(url) {
    return new Promise(resolve => wx.request({ url: `https://www.vaskka.com/mp${url}`, success: res => resolve(res.data) }));
  },

  async onLoad(options) {
    const { subjectName } = options;
    const subjectEngName = Data.subjectEnum[subjectName];
    const type = options.type;

    let dict = {
      '知识点': 'knowledge',
      '归纳总结': 'summary',
      '专题': 'topic',
      '答题模版': 'template',
    };
    if (dict[type] !== undefined) {
      const response = await this.Get(`/${subjectEngName}/${dict[type]}/mapping/get`);
      this.setData({
        listName: response.data,
      });
      return;
    }

    dict = {
      '需要留意': 1,
      '重点关注': 2,
    };
    if (dict[type] !== undefined) {
      const list = [];
      app.globalData.noteList[subjectName].forEach(e => {
        if (e.importance === dict[type]) {
          list.push({
            titleName: e.title,
          });
        }
      });
      this.setData({
        listName: list,
      });
    }
  },

  toInnerList(event) {
    var id = event.currentTarget.dataset.id;
    //console.log(this.data.module);
    if (this.data.module == "需要留意" || this.data.module == "重点关注") {
      console.log(event)
      wx.navigateTo({
        url: '../content/content?array=' + [this.data.subject, id, this.data.module],
      })
    }
    else {
      console.log(event)
      wx.navigateTo({
        url: '../inner_list/inner_list?array=' + [this.data.subject, id, this.data.module],
      })
    }
  },
});
