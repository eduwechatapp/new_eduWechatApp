// Const Data
const Data = {
  swiperURLList: ['../introduction/introduction', '../notice/notice'],
  swiperIndex: 0,
};

Page({
  data: {
    subjects: [
      { name: "英语", img: "/pages/icon/english.png" },
      { name: "数学", img: "/pages/icon/math.png" },
      { name: "语文", img: "/pages/icon/chinese.png" },
      { name: "化学", img: "/pages/icon/chemistry.png" },
      { name: "物理", img: "/pages/icon/physics.png" },
      { name: "生物", img: "/pages/icon/biology.png" },
      { name: "地理", img: "/pages/icon/geography.png" },
      { name: "政治", img: "/pages/icon/political.png" },
      { name: "历史", img: "/pages/icon/history.png" },
    ],
    swiperIndex: 0,
    bannerList: ['https://vaskka.com/static/introduction.jpg', 'https://vaskka.com/static/notice.png'],
    searchMode: false,
    input: '',
    currentTap: -1,
    currentModel: -1,
    model: [
      { name: '按标题搜索' },
      { name: '按内容搜索' },
    ],
    inputAnimation: {},
    cancelAnimation: {},
  },

  //滑动swiper
  swiperChange(e) {
    Data.swiperIndex = e.detail.current;
  },

  /**
   * 进入搜索模式，展示切换动画
   */
  enterSearchMode() {
    const animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    });
    animation.width('570rpx').step();
    this.setData({
      searchMode: true,
      inputAnimation: animation.export(),
    });
    setTimeout(() => {
      const an2 = wx.createAnimation({
        duration: 400,
        timingFunction: 'ease',
      });
      an2.opacity(1).step();
      this.setData({
        cancelAnimation: an2.export(),
      });
    }, 200);
  },

  /**
   * 退出搜索模式，展示切换动画
   */
  cancelInput() {
    const an2 = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    });
    an2.opacity(0).step();
    const animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    });
    animation.width('700rpx').step();
    this.setData({
      cancelAnimation: an2.export(),
      searchMode: false,
      inputAnimation: animation.export(),
    });
  },

  input(e) {
    console.log('home.js, 108', e.detail.value);
    this.setData({
      input: e.detail.value,
    });
  },

  inputConfirm() {
    this.search();
  },

  search() {
    const that = this;
    wx.navigateTo({
      url: '../search_result/search_result?array=' + [that.data.input, that.data.currentTap, that.data.currentModel],
    });
  },

  /**
   * 切换选择科目按钮选中状态
   */
  switchStatus(e) {
    if (e.currentTarget.dataset.id === this.data.currentTap) {
      this.setData({
        currentTap: -1,
      });
    } else {
      this.setData({
        currentTap: e.currentTarget.dataset.id,
      });
    }
  },

  /**
   * 切换选择搜索模式的按钮的选中状态
   */
  switchModel(e) {
    if (e.currentTarget.dataset.id === this.data.currentModel) {
      this.setData({
        currentModel: -1,
        modelStatus: true,
      });
    } else {
      this.setData({
        currentModel: e.currentTarget.dataset.id,
        modelStatus: false,
      });
    }
  },
});
