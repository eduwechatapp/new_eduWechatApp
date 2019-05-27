import WxParse from '../../wxParse/wxParse';

const app = getApp();

const Data = {
  importanceList: ['不放心上', '我须留意', '重点关注'],
  title: '',
  erji: '',
  inital: true,
  type: '', // Using for pagination
  index: 0,
};

Component({
  properties: {
    list: null,
    subject: null, // Name
    index: null,
  },

  data: {
    ifPopUpShow: false,
    importanceText: '不放心上',
    importance: 0,
  },

  lifetimes: {
    ready() {
      this.loadData(Data.index);
    },

    detached() {
      Data.inital = true;
      Data.type = '';
      this.setData({
        ifPopUpShow: false,
        importanceText: '不放心上',
        importance: 0,
      });
    },
  },

  observers: {
    list(e) {
      if (Data.inital) {
        Data.inital = false;
        return;
      }
      if (e.length === 0) {
        this.noMore();
        return;
      }
      if (Data.type === 'prev') {
        Data.index--;
      } else if (Data.type === 'next') {
        Data.index++;
      }
      const article = e[0];
      Data.erji = article.erji;
      Data.title = article.title;
      this.checkImportance(article.title, article.erji);
      WxParse.wxParse('article', 'html', article.content, this, 5);
      app.toast('加载成功!');
    },

    index(e) {
      Data.index = e;
    },
  },

  methods: {
    loadData(index) {
      app.toast('加载中');
      this.triggerEvent('load', { index }, {});
    },

    Set(options) {
      return new Promise(res => {
        this.setData(options, res);
      });
    },

    checkImportance(title, erji) {
      let importance = 0;
      app.globalData.noteList[this.data.subject].some(e => {
        if (e.title === title && e.erji === erji) {
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
        if (list[i].erji === Data.erji && list[i].title === Data.title) {
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
          erji: Data.erji,
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
      if (type === 'prev' && Data.index == 0) {
        this.noMore();
        return;
      }
      let index = Data.index;
      type === 'prev' ? index-- : index++;
      this.loadData(index);
      Data.type = type;
    },
    
    noMore() {
      app.toast('没有更多数据了');
    },
  },
});
