// pages/home/home.js
Page({
  data: {
    subject: [
      { name: "英语", url: "/pages/icon/english.png",unique:"english"},
      { name: "数学", url: "/pages/icon/mathematics.png", unique: "mathematics"},
      { name: "语文", url: "/pages/icon/chinese.png", unique: "chinese"},
      { name: "化学", url: "/pages/icon/chemistry.png", unique: "chemistry"},
      { name: "物理", url: "/pages/icon/physics.png", unique: "physics"},
      { name: "生物", url: "/pages/icon/biology.png", unique: "biology"},
      { name: "地理", url: "/pages/icon/geography.png", unique: "geography"},
      { name: "政治", url: "/pages/icon/zhengzhi.png", unique: "zhengzhi"},
      { name: "历史", url: "/pages/icon/time.png", unique: "time"},
    ]
  },
  toSubject: function(event){
      console.log(event.currentTarget.dataset.id);
      if(event.currentTarget.dataset.id=='english'){
        wx.navigateTo({
          url: '../Secondary_menu/Secondary_menu?subject=english',
        })
      }
      else if (event.currentTarget.dataset.id == 'mathematics'){
        wx.navigateTo({
          url: '../Secondary_menu/Secondary_menu?subject=mathematics',
        })
      }
      else if (event.currentTarget.dataset.id == 'chinese') {
        wx.navigateTo({
          url: '../Secondary_menu/Secondary_menu?subject=chinese',
        })
      } else if (event.currentTarget.dataset.id == 'chemistry') {
        wx.navigateTo({
          url: '../Secondary_menu/Secondary_menu?subject=chemistry',
        })
      } else if (event.currentTarget.dataset.id == 'physics') {
        wx.navigateTo({
          url: '../Secondary_menu/Secondary_menu?subject=physics',
        })
      } else if (event.currentTarget.dataset.id == 'biology') {
        wx.navigateTo({
          url: '../Secondary_menu/Secondary_menu?subject=biology',
        })
      } else if (event.currentTarget.dataset.id == 'geography') {
        wx.navigateTo({
          url: '../Secondary_menu/Secondary_menu?subject=geography',
        })
      } else if (event.currentTarget.dataset.id == 'zhengzhi') {
        wx.navigateTo({
          url: '../Secondary_menu/Secondary_menu?subject=zhengzhi',
        })
      } else if (event.currentTarget.dataset.id == 'time') {
        wx.navigateTo({
          url: '../Secondary_menu/Secondary_menu?subject=time',
        })
      }
  }
})