// Const Data
const Data = {
  swiperURLList: ['../introduction/introduction', '../notice/notice'],
  swiperIndex: 0,
};

Page({
  data: {
    sub_first: [
      { name: "语文", unique: "yw" },
      { name: "数学",  unique: "sx" },
      { name: "英语", unique: "yy" },
    ],
    sub_second: [
      { name: "物理",  unique: "wl" },
      { name: "化学",  unique: "hx" },
      { name: "生物", unique: "sw" },
    ],
    sub_third: [
      { name: "政治", unique:"zz" },
      { name: "历史", unique: "ls" },
      { name: "地理",  unique: "dl" },
    ],
    mainSubject: [
      { name: "英语", url: "/pages/icon/english.png", unique: "english" },
      { name: "数学", url: "/pages/icon/math.png", unique: "math" },
      { name: "语文", url: "/pages/icon/chinese.png", unique: "chinese" },
    ],
    secSubject: [
      { name: "化学", url: "/pages/icon/chemistry.png", unique: "chemistry" },
      { name: "物理", url: "/pages/icon/physics.png", unique: "physics" },
      { name: "生物", url: "/pages/icon/biology.png", unique: "biology" },
      { name: "地理", url: "/pages/icon/geography.png", unique: "geography" },
      { name: "政治", url: "/pages/icon/political.png", unique: "political" },
      { name: "历史", url: "/pages/icon/history.png", unique: "history" },
    ],
    swiperIndex: 0,
    bannerList: ['https://vaskka.com/static/introduction.jpg', 'https://vaskka.com/static/notice.png'],
    swiperList:['../introduction/introduction','../notice/notice'],
    titleName:"学霸の口袋高中",
    input_value:'搜索资料',
    showMask: false,
    input: '',
    currentTap: 'cancle',
    currentModel: 'cancle',
    model:[
      { name: "按标题搜索", unique: "title" },
      { name: "按内容搜索", unique: "content" },
    ],
    inputAnimation: {},
    cancelAnimation: {},
  },

  //滑动swiper
  swiperChange(e) {
    Data.swiperIndex = e.detail.current;
  },

  onLoad() {
    const that = this;
    wx.setNavigationBarTitle({
      title: that.data.titleName,
    });
  },

  toPage(e) {
    wx.navigateTo({
      url: Data.swiperURLList[Data.swiperIndex],
    });
  },

  toSubject(e) {
    const that = this;
    const id = e.currentTarget.id;
    const mainSubject = that.data.mainSubject;
    const secSubject = that.data.secSubject;
    const type = e.currentTarget.dataset.type;
    let subject = '';

    if (type === 'main') {
      subject = mainSubject[id].unique;
    } else if (type === 'sec') {
      subject = secSubject[id].unique;
    }
    wx.navigateTo({
      url: `../Secondary_menu/Secondary_menu?subject=${subject}`,
    });
  },

  enterSearchMode() {
    const animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    });
    animation.width('570rpx').step();
    this.setData({
      inputAnimation: animation.export(),
    });
    setTimeout(() => {
      const an2 = wx.createAnimation({
        duration: 400,
        timingFunction: 'ease',
      });
      an2.opacity(1).step();
      this.setData({
        showMask: true,
        cancelAnimation: an2.export(),
      });
    }, 100);
  },

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
      showMask: false,
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

  switchStatus(e) {
    if (e.currentTarget.dataset.id === this.data.currentTap) {
      this.setData({
        currentTap: 'cancle',
      });
    } else {
      this.setData({
        currentTap: e.currentTarget.dataset.id,
      });
    }
  },

  switchModel(e) {
    if (e.currentTarget.dataset.id === this.data.currentModel) {
      this.setData({
        currentModel: 'cancle',
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
