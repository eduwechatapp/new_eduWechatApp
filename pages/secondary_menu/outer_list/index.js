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
  typeEnum: {
    '知识点': 'knowledge',
    '归纳总结': 'summary',
    '专题': 'topic',
    '答题模版': 'template',
  },
  subjectEng: '',
  typeEng: '',
};

Page({
  data: {
    listName: [],
  },

  Get(url) {
    return new Promise(resolve => wx.request({ url: `http://129.204.216.249:4000${url}`, success: res => resolve(res.data) }));
  },

  async onLoad(options) {
    const { subjectName, type } = options;
    const subjectEng = Data.subjectEnum[subjectName];
    const typeEng = Data.typeEnum[type];
    Data.typeEng = typeEng;
    Data.subjectEng = subjectEng;

    const response = await this.Get(`/${subjectEng}/${typeEng}/mapping/get`);
    this.setData({
      listName: response.data,
    });
  },

  toInnerList(event) {
    const which = event.currentTarget.dataset.which;
    app.route('../inner_list/index', {
      subjectEng: Data.subjectEng,
      which,
      typeEng: Data.typeEng,
    });
  },
});
