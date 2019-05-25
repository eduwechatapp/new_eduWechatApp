const app = getApp();

const Data = {
  pageSize: 20,
  subjectName: '',
  searchValue: '',
};

Page({
  data: {
    menuList: [],
    currentPage: 0,
    total: 1,
  },

  Set(option) {
    return new Promise(res => {
      this.setData(option, res);
    });
  },

  onLoad(options) {
    Data.subjectName = options.subjectName;
    Data.searchValue = options.searchValue;
    this.fetchData(0).then(list => {
      app.toast('加载成功!');
      this.Set({
        menuList: list,
        total: this.data.total + 1,
      });
    });
  },

  async fetchData(page) {
    await app.toast('加载中', 'loading');

    const api = `/search/simple/test/${Data.searchValue}/${Data.pageSize}/${page}`;
    const response = await app.post(api);
    await app.hideToast();

    for (let i = 0; i < response.data.length; i++) {
      if (response.data[i].subject === Data.subjectName) {
        return response.data[i].dataList;
      }
    }
  },

  async onPageChange(e) {
    const toPage = e.detail.current - 1;
    const list = await this.fetchData(toPage);

    if (list.length === 0) {
      app.toast('没有更多数据了');
      return;
    }
    app.toast('加载成功');

    this.Set({
      menuList: list,
      currentPage: toPage,
      total: this.data.total + 1,
    });
  },

  onNoResult() {
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
  },
  
  toContent(e) {
    const index = e.currentTarget.dataset.id + Data.pageSize * this.data.currentPage;
    app.fetchContent = async function(_index) {
      const url = `/search/simple/test/${Data.searchValue}/1/${_index}`;
      const response = await app.post(url);
      let dataList = [];
      response.data.some(d => {
        if (d.subject === Data.subjectName) {
          dataList = d.dataList;
        }
      });
      return dataList;
    }
    app.route('../../content/content', { index, subjectName: Data.subjectName });
  },
});
