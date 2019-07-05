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
    '公开课': {
      module: '公开课',
      url: '../icon/video_1.png',
    },
  },
  subjectInfoEnum: {
    '语文': ['知识点', '专题', '归纳总结', '公开课'],
    '数学': ['知识点', '公开课'],
    '英语': ['知识点', '专题', '归纳总结', '公开课'],
    '物理': ['知识点', '公开课'],
    '化学': ['知识点', '公开课'],
    '生物': ['知识点', '公开课'],
    '政治': ['知识点', '归纳总结', '公开课'],
    '历史': ['知识点', '公开课'],
    '地理': ['知识点', '公开课'],
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
    const dict = { '需要留意': 0, '重点关注': 1 };
    const dict2 = { '数学': 0, '化学': 1, '物理': 2, '生物': 3, '地理': 4 };
    if (dict[type] !== undefined) {
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

    if (dict2[Data.subjectName] !== undefined) {
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
