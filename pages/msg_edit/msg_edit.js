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
    content:''
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
    wx.showToast({
      title: '留言成功',
      icon: 'succes',
      duration: 700,
      mask: true
    })
    wx.navigateBack({
      delta: 1
    })
  }
})