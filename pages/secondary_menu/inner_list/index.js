const app = getApp();

const Data = {
  list: [],
  type: '',
};

Page({
  data: {
    list: [],
    txt: 'hello',
  },

  onLoad(options) {
    const { type, subjectName } = options;
    Data.type = type;

    const dict = {
      '需要留意': 1,
      '重点关注': 2,
    };
    if (dict[type] !== undefined) {
      const list = [];
      app.globalData.noteList[subjectName].forEach(e => {
        if (e.importance === dict[type]) {
          list.push(e);
        }
      });
      Data.list = list;
    }
  },

  fetchData(e) {
    // const { index } = e.detail;
    // const dict = {
    //   '需要留意': 1,
    //   '重点关注': 2,
    // };
    // if (dict[Data.type] !== undefined) {
    //   const list = [];
    //   for (let i = index; i < Data.list.length; i++) {
    //     list.push(Data.list[i]);
    //   }
    // }
  }
});
