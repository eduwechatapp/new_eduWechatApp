const app = getApp();

const Data = {
  menuListEnum: {
    '知识点': {
      module: '知识点',
      url: '../icon/light.png',
    },
    '专题': {
      module: '专题',
      url: '../icon/topic.png',
    },
    '归纳总结': {
      module: '归纳总结',
      url: '../icon/conclusion.png',
    },
    '答题模版': {
      module: '答题模版',
      url: '../icon/template.png',
    },
    '视频': {
      module: '视频',
      url: '../icon/video.png',
    },
    '真题试卷': {
      module: '真题试卷',
      url: '../icon/exam.png',
    },
    '上次记录': {
      module: '上次记录',
      url: '../icon/lastnote.png',
    },
    '需要留意': {
      module: '需要留意',
      url: '../icon/attention.png',
    },
    '重点关注': {
      module: '重点关注',
      url: '../icon/payAttention.png',
    },
    '收藏': {
      module: '收藏',
      url: '../icon/star.png',
    },
  },
  subjectInfoEnum: {
    '语文': ['知识点', '专题', '归纳总结'],
    '数学': ['知识点'],
    '英语': ['知识点', '专题', '归纳总结'],
    '物理': ['知识点'],
    '化学': ['知识点'],
    '生物': ['知识点'],
    '政治': ['知识点', '归纳总结'],
    '历史': ['知识点'],
    '地理': ['知识点'],
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

  onShow() {
    const menu = [];
    Data.subjectInfoEnum[Data.subjectName].forEach(e => {
      menu.push(Data.menuListEnum[e]);
    });
    const noteList = app.globalData.noteList[Data.subjectName];
    if (noteList.length > 0) {
      if (noteList.some(e => e.importance === 1)) {
        menu.push(Data.menuListEnum['需要留意']);
      }
      if (noteList.some(e => e.importance === 2)) {
        menu.push(Data.menuListEnum['重点关注']);
      }
    }
    const lastView = app.globalData.lastView;
    menu.forEach(e => {
      if (lastView[Data.subjectName][e.module] !== undefined) {
        e.lastView = lastView[Data.subjectName][e.module].title;
        if (e.lastView.length > 12) {
          e.lastView = e.lastView.substring(0, 9) + '...';
        }
        return;
      }
      e.lastView = '未开始';
    });
    this.setData({
      menu,
    });
  },

  toDetail(event) {
    const type = event.currentTarget.dataset.type;
    let dict = { '需要留意': 0, '重点关注': 1 };
    if (dict[type] !== undefined) {
      app.route('./note_list/index', {
        type,
        subjectName: Data.subjectName,
      });
      return;
    } else

    dict = { '数学': 0, '化学': 1, '物理': 2, '生物': 3 };
    if (dict[Data.subjectName] !== undefined) {
      app.route('./inner_list/index', {
        type,
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
