const app = getApp();

const Data = {
  inital: true,
  page: 0,
  type: '',
};

Component({
  properties: {
    list: null,
  },

  data: {
    listData: [],
  },

  lifetimes: {
    ready() {
      this.loadData(Data.page);
    },

    detached() {
      this.setData({
        listData: [],
      });
      Data.inital = true;
      Data.page = 0;
      Data.type = '';
    },
  },

  observers: {
    list(e) {
      if (Data.inital) {
        Data.inital = false;
        return;
      }
      if (e.length === 0) {
        if (Data.page === 0) {
          wx.showModal({
            title: '提示',
            content: '查询无结果，建议更换关键字再次搜索哦',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                });
              }
            },
          });
          return;
        }
        this.noMore();
        return;
      }
      if (Data.type === 'prev') {
        Data.page--;
      } else if (Data.type === 'next') {
        Data.page++;
      }
      this.setData({
        listData: this.data.list,
      });
      app.toast('加载成功!');
    },
  },

  methods: {
    noMore() {
      app.toast('没有更多数据了');
    },

    loadData(page) {
      app.toast('加载中');
      this.triggerEvent('load', { page }, {});
    },

    changePage(e) {
      const type = e.currentTarget.dataset.type;
      if (type === 'prev' && Data.page === 0) {
        this.noMore();
        return;
      }
      let page = Data.page;
      type === 'prev' ? page-- : page++;
      this.loadData(page);
      Data.type = type;
    },
  },
});
