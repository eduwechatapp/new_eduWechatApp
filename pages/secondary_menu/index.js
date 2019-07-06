const app = getApp();

const Data = {
  iconUrlList: [
    '../icon/attention.png',
    '../icon/payAttention.png',
    '../icon/star.png',
    '../icon/light.png',
    '../icon/conclusion.png',
    '../icon/video_1.png',
    '../icon/topic.png',
    '../icon/template.png',
    '../icon/video.png',
    '../icon/exam.png',
    '../icon/lastnote.png',
  ],
  subjectWithOldInterface: {
    语文: ['知识点', '专题', '归纳总结', '公开课'],
    英语: ['知识点', '专题', '归纳总结', '公开课'],
    政治: ['知识点', '归纳总结', '公开课'],
    历史: ['知识点', '公开课'],
  },
  subjectName: '',
};

Page({
  data: {
    menu: [],
    subjectName: '',
    lastView: '',
  },

  onLoad(options) {
    const { subjectName } = options;
    Data.subjectName = subjectName;
  },

  async onShow() {
    let m = [];
    if (Data.subjectName in Data.subjectWithOldInterface) {
      m = Data.subjectWithOldInterface[Data.subjectName];
    } else {
      ({
        data: m,
      } = await app.api.secondary.getYiji(app.subject(Data.subjectName).eng));
    }
    m = m.concat(['需要留意', '重点关注']);
    const menu = [];
    m.forEach((e, index) => {
      const obj = {
        module: e,
        url: Data.iconUrlList[index % Data.iconUrlList.length],
      };
      const lastView = app.globalData.lastView;
      if (lastView[Data.subjectName][e] !== undefined) {
        obj.lastView = lastView[Data.subjectName][e].title;
        if (obj.lastView.length > 12) {
          obj.lastView = obj.lastView.substring(0, 9) + '...';
        }
      } else {
        obj.lastView = '未开始';
      }
      menu.push(obj);
    });
    this.setData({ menu });
  },

  toDetail(event) {
    const type = event.currentTarget.dataset.type;
    if (['需要留意', '重点关注'].includes(type)) {
      app.route('./note_list/index', {
        type,
        subjectName: Data.subjectName,
      });
      return;
    } else

    if (type === '公开课') {
      app.route('/pages/video/video', {
        subjectName: Data.subjectName,
      });
    } else

    if (['数学', '化学', '物理', '生物', '地理'].includes(Data.subjectName)) {
      app.route('./inner_list/index', {
        typeName: type,
        subjectName: Data.subjectName,
      });
    } else

    {
      app.route('./outer_list/index', {
        type,
        subjectName: Data.subjectName,
      });
    }
  },
});
