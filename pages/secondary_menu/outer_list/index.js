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

export default Page({
  data: {
    listName: [],
  },

  async onLoad(options) {
    const { subjectName, type } = options;
    const subjectEng = Data.subjectEnum[subjectName];
    const typeEng = Data.typeEnum[type];
    Data.typeEng = typeEng;
    Data.subjectEng = subjectEng;

    const response = await app.api.secondary.map(subjectEng, typeEng);
    this.setData({
      listName: response.data,
    });
  },

  toInnerList(event) {
    const which = event.currentTarget.dataset.which;
    app.route('./inner_list/index', {
      subjectEng: Data.subjectEng,
      which,
      typeEng: Data.typeEng,
    });
  },
});
