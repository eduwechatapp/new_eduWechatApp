// pages/home/home.js
Page({
  data: {
    sub_first: [
      { name: "语文", unique: "chinese" },
      { name: "数学",  unique: "math" },
      { name: "英语", unique: "english" },
    ],
    sub_second: [
      { name: "物理",  unique: "physics" },
      { name: "化学",  unique: "chemistry" },
      { name: "生物", unique: "biology" },
    ],
    sub_third: [
      { name: "政治", unique: "political" },
      { name: "历史", unique: "history" },
      { name: "地理",  unique: "geography" },
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
    bannerList: ['http://pq1t2zu2n.bkt.clouddn.com/const/introduce.png', 'http://pq1t2zu2n.bkt.clouddn.com/const/notice.png'],
    swiperList:['../introduction/introduction','../notice/notice'],
    titleName:"学霸の口袋高中",
    input_value:'搜索资料',
    showMask: false,

    animation_group:{
      className:'wux-animate--fadeIn',
      enter:true,
      exit: true,
      in:false
    },
    input:'',
    currentTap:'',
    currentModel:'',
    model:[
      {name:"按标题搜索",unique:"title"},
      {name:"按内容搜索",unique:"content"}
      ]
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
  onLoad:function(){
    var that = this;
    wx.setNavigationBarTitle({
      title: that.data.titleName
    })
  },
  toPage:function(e){
    var list = this.data.swiperList
    wx.navigateTo({
      url: list[this.data.swiperIndex],
    })
  },
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
  },
  showMask:function(){
    this.setData({
      ["animation_group.in"]:true,
      showMask: true,
    })
  },
  cancle:function(){
    this.setData({
      ["animation_group.in"]: false,
      showMask: false
    })
  },
  input:function(e){
    console.log(e.detail.value)
    this.setData({
      input: e.detail.value
    })
  },
  inputConfirm:function(e){
    this.search();
  },
  search:function(){
    var that = this;

  },
  switchStatus:function(e){
    if (e.currentTarget.dataset.id==this.data.currentTap){
      this.setData({
        currentTap:'cancle'
      })
    }
    else{
      this.setData({
        currentTap: e.currentTarget.dataset.id
      })
    }
    
  },
  switchModel: function (e) {
    if (e.currentTarget.dataset.id == this.data.currentModel){
      this.setData({
        currentModel: 'cancle'
      })
    }
    else{
      this.setData({
        currentModel: e.currentTarget.dataset.id
      })
    }
    
  },
})