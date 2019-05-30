import WxParse from '../../wxParse/wxParse';

const app = getApp();

const Data = {
  importanceList: ['不放心上', '我须留意', '重点关注'],
  title: '',
  inital: true,
};

Component({
  properties: {
    article: null,
    subject: null, // Name
    cindex: null,
  },

  data: {
    ifPopUpShow: false,
    importanceText: '不放心上',
    importance: 0,
  },

  lifetimes: {
    detached() {
      Data.inital = true;
      this.setData({
        ifPopUpShow: false,
        importanceText: '不放心上',
        importance: 0,
      });
    },
  },

  observers: {
    article(e) {
      if (Data.inital) {
        Data.inital = false;
        return;
      }
      Data.title = e.title;
      wx.setNavigationBarTitle({
        title: e.title,
      });
      this.checkImportance(e.title);
      WxParse.wxParse('articleParse', 'html', e.content, this, 5);
    },
  },

  methods: {
    Set(options) {
      return new Promise(res => {
        this.setData(options, res);
      });
    },

    checkImportance(title) {
      let importance = 0;
      app.globalData.noteList[this.data.subject].some(e => {
        if (e.title === title) {
          importance = e.importance;
        }
      });
      this.Set({
        importance: importance,
        importanceText: Data.importanceList[importance],
      });
    },

    changeState(e) {
      const importance = e.currentTarget.dataset.id;
      if (importance === this.data.importance) {
        this.setData({
          ifPopUpShow: !this.data.ifPopUpShow,
        });
        return;
      }
      this.setData({
        importance,
        importanceText: Data.importanceList[importance],
        ifPopUpShow: !this.data.ifPopUpShow,
      });
      const list = app.globalData.noteList[this.data.subject];
      let hasFind = false;
      for (let i = 0; i < list.length; i++) {
        if (list[i].title === Data.title) {
          hasFind = true;
          if (importance === 0) {
            list.splice(i, 1);
          } else {
            list[i].importance = importance;
          }
          break;
        }
      }
      if (!hasFind && importance !== 0) {
        list.push({
          title: Data.title,
          importance,
        });
      }
      app.setStore('noteList', app.globalData.noteList);
    },

    togglePopUp() {
      this.Set({
        ifPopUpShow: !this.data.ifPopUpShow,
      });
    },

    changePage(e) {
      const type = e.currentTarget.dataset.type;
      let index = type === 'prev' ? -1 : 1;
      index += this.data.cindex;
      this.triggerEvent('changepage', { index }, {});
    },

    noMore() {
      app.toast('没有更多数据了');
    },
  },
});
