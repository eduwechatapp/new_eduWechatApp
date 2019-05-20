import { route } from '../../utils/router';

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
    bannerList: ['https://vaskka.com/static/introduction.jpg', 'https://vaskka.com/static/notice.png'],
    searchMode: false,
    searchValue: '',
    currentTap: -1,
    currentModel: -1,
    model: [
      { name: '按标题搜索' },
      { name: '按内容搜索' },
    ],
    inputAnimation: {},
    cancelAnimation: {},
  },

  /**
   * 滑动swiper
   */
  swiperChange(e) {
    Data.swiperIndex = e.detail.current;
  },

  /**
   * 进入 swiper 页面
   */
  toSwiperPage() {
    wx.navigateTo({
      url: Data.swiperURLList[Data.swiperIndex],
    });
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
   * 退出搜索模式，展示切换动画，清空搜索关键词和搜索模式
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
      searchValue: '',
      inputAnimation: animation.export(),
      currentModel: -1,
      currentTap: -1,
    });
  },

  /**
   * 键盘输入时触发，更新 value
   */
  input(e) {
    this.setData({
      searchValue: e.detail.value,
    });
  },

  /**
   * 执行搜索，跳转至搜索结果页面
   */
  search() {
    if (this.data.currentModel === -1 && this.data.currentTap === -1) { // 简单搜索
      route('../search_result/search_result', {
        searchValue: this.data.searchValue,
      });
      return;
    }

    // 高级搜索
    if (this.data.currentTap === -1) { // 高级搜索时未选中科目
      wx.showModal({
        title: '提示',
        content: '请选择要查询的科目哦',
        showCancel: false,
      });
      return;
    }
    route('../inner_list/inner_list', {
      searchValue: this.data.searchValue,
      subject: this.data.currentTap,
      searchMode: this.data.currentModel,
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
