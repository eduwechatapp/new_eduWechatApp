import data from './data.js'
var app = getApp()
Page({
  data:{
    imageList: [
      "https://vaskka.com/static/bread.jpeg",
      "https://vaskka.com/static/beach.jpeg",
      "https://vaskka.com/static/heiwan.jpeg",
      "https://vaskka.com/static/noodle.jpeg",
      "https://vaskka.com/static/people.jpeg",
      "https://vaskka.com/static/redcar.jpeg"
    ],
    index:0,
    date:'2019-05-26',
    show:false,
    currentSelect:0,
    name:'',
    title:'',
    content:'',
    visible: false,
    location:'',
    options: data,
    value:''
  },
  onLoad(option){
    this.setData({
      type: option.module
    })
  },
  onOpen() {
    this.setData({ visible: true })
  },
  onClose() {
    this.setData({ visible: false })
  },
  onChange(e) {
    this.setData({ location: e.detail.options.map((n) => n.label).join('/') })
    console.log('onChange', e.detail)
  },
  bindDateChange:function(e){
    this.setData({
      date:e.detail.value
    })
  },
  showImageSelect:function(e){
    this.setData({
      show:!this.data.show
    })
  },
  changeImage:function(e){
    console.log(e)
    this.setData({
      currentSelect: e.currentTarget.dataset.id,
    })
    setTimeout(()=>this.setData({
      show: false
    }),200)
  },
  inputName:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  inputTitle: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  inputContent: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  finish:function(e){
    if(this.data.name==""){
      wx.showModal({
        title: '提示',
        content: '您还没输入昵称哦',
        showCancel: false,
      });
      return;
    }
    if(this.data.title==""){
      wx.showModal({
        title: '提示',
        content: '您还没输入留言标题哦',
        showCancel: false,
      });
      return;
    }
    if (this.data.content == "") {
      wx.showModal({
        title: '提示',
        content: '您还没输入留言内容哦',
        showCancel: false,
      });
      return;
    }

    if (this.data.location == "") {
      wx.showModal({
        title: '提示',
        content: '您还没选择您的地址哦',
        showCancel: false,
      });
      return;
    }
    wx.showToast({
      title: '留言成功',
      icon: 'succes',
      duration: 700,
      mask: true
    })
    var body={};
    body.index = this.data.currentSelect
    body.type = this.data.type
    body.time = this.data.date
    body.location = this.data.location
    body.name = this.data.name
    body.title = this.data.title
    body.content = this.data.content
    wx.request({
      url: `https://www.vaskka.com/mp/message/create/${app.globalData.openid}`,
      method:'POST',
      data:body,
      success(res){
        console.log(res)
      }
    })
    //获取页面栈并且更新前一个页面的数据
    var pages = getCurrentPages();
    if (pages.length > 1) {
      //上一个页面实例对象
      var prePage = pages[pages.length - 2];
      var options={module:this.data.type}
      prePage.onLoad(options)
    }
    wx.navigateBack({
      delta: 1
    })
  }
})