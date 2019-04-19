// pages/home/home.js
Page({
  data: {
    subject: [
      { name: "英语", url: "/pages/icon/英语.png", unique: "english" },
      { name: "数学", url: "/pages/icon/数学.png", unique: "mathematics" },
      { name: "语文", url: "/pages/icon/语文.png", unique: "chinese" },
      { name: "化学", url: "/pages/icon/化学.png", unique: "chemistry" },
      { name: "物理", url: "/pages/icon/物理.png", unique: "physics" },
      { name: "生物", url: "/pages/icon/生物.png", unique: "biology" },
      { name: "地理", url: "/pages/icon/地理.png", unique: "geography" },
      { name: "政治", url: "/pages/icon/政治.png", unique: "zhengzhi" },
      { name: "历史", url: "/pages/icon/历史.png", unique: "time" },
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
      { name: "政治", url: "/pages/icon/political.png", unique: "zhengzhi" },
      { name: "历史", url: "/pages/icon/history.png", unique: "time" },
    ],
    swiperIndex: 0,
    bannerList: ['http://pq1t2zu2n.bkt.clouddn.com/const/introduce.png', 'http://pq1t2zu2n.bkt.clouddn.com/const/notice.png']
  },
  //滑动swiper
  swiperChange: function (e) {
    this.setData({
      swiperIndex: e.detail.current
    })
  },
  // toSubject: function (event) {
  //   console.log(event.currentTarget.dataset.id);
  //   if (event.currentTarget.dataset.id == 'english') {
  //     wx.navigateTo({
  //       url: '../Secondary_menu/Secondary_menu?subject=english',
  //     })
  //   }
  //   else if (event.currentTarget.dataset.id == 'mathematics') {
  //     wx.navigateTo({
  //       url: '../Secondary_menu/Secondary_menu?subject=math',
  //     })
  //   }
  //   else if (event.currentTarget.dataset.id == 'chinese') {
  //     wx.navigateTo({
  //       url: '../Secondary_menu/Secondary_menu?subject=chinese',
  //     })
  //   } else if (event.currentTarget.dataset.id == 'chemistry') {
  //     wx.navigateTo({
  //       url: '../Secondary_menu/Secondary_menu?subject=chemistry',
  //     })
  //   } else if (event.currentTarget.dataset.id == 'physics') {
  //     wx.navigateTo({
  //       url: '../Secondary_menu/Secondary_menu?subject=physics',
  //     })
  //   } else if (event.currentTarget.dataset.id == 'biology') {
  //     wx.navigateTo({
  //       url: '../Secondary_menu/Secondary_menu?subject=biology',
  //     })
  //   } else if (event.currentTarget.dataset.id == 'geography') {
  //     wx.navigateTo({
  //       url: '../Secondary_menu/Secondary_menu?subject=geography',
  //     })
  //   } else if (event.currentTarget.dataset.id == 'zhengzhi') {
  //     wx.navigateTo({
  //       url: '../Secondary_menu/Secondary_menu?subject=political',
  //     })
  //   } else if (event.currentTarget.dataset.id == 'time') {
  //     wx.navigateTo({
  //       url: '../Secondary_menu/Secondary_menu?subject=history',
  //     })
  //   }
  // },

  toSubject: function (e) {
    var that = this,
      id = e.currentTarget.id,
      mainSubject = that.data.mainSubject,
      secSubject = that.data.secSubject,
      type = e.currentTarget.dataset.type,
      subject = ''

    if (type == 'main') {
      subject = mainSubject[id].unique   
    }
    else if(type == 'sec'){
      subject = secSubject[id].unique
    }
    wx.navigateTo({
      url: '../Secondary_menu/Secondary_menu?subject='+subject,
    })
  }
})