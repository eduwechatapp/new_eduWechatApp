const app = getApp()
Page({
  data:{
    showMessage: false,
    name:'',
    content:'',
    mid:'',
    article:'',
    showEdit:false,
    index:'',
    show: true,
    input:'',
    article_id:''
  },
  onLoad(){
    var that = this
    wx.request({
      url: 'http://129.204.216.249:4000/article/volunteer/get/article/test1/11379/99362/20/0',
      success(res){
        console.log(res)
        that.setData({
          article: res.data.data
        })
      }
    })
  },
  showPairMessage(){
    var that = this
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: `http://129.204.216.249:4000/article/volunteer/get/unread/test1/11379`,
      success(res){
        console.log(res)
        if(res.data.code==0&&res.data.data.length==0){
          wx.hideLoading();
          wx.showToast({
            title: '没有未读消息噢',
          })
        }
        else if(res.data.code==0&&res.data.data.length!=0){
          wx.hideLoading();
          that.setData({
            showMessage: true,
            name: res.data.data[0].fromName,
            content: res.data.data[0].content,
            mid: res.data.data[0]._id
          })
        }
        else{
          wx.hideLoading();
          wx.showToast({
            title: '读取错误！',
          })
        }
      }
    })
  },
  cancel(){
    var that = this
    wx.request({
      url: `http://129.204.216.249:4000/article/volunteer/couple/cancel/test1/11379/${this.data.mid}`,
      success(res){
        console.log(res)
        if(res.data.code==0){
          wx.showModal({
            title: '提示消息',
            content: '您拒绝了该学生的结对请求',
            showCancel:false,
            success(e){
              that.setData({
                showMessage: false
              })
            }
          })
        }
        else{
          wx.showToast({
            title: '拒绝失效，请重试',
          })
          that.setData({
            showMessage: false
          })
        }
      }
    })
  },
  confirm(){
    var that = this
    wx.request({
      url: `http://129.204.216.249:4000/article/volunteer/couple/confirm/test1/11379/${this.data.mid}`,
      success(res) {
        console.log(res)
        if (res.data.code == 0) {
          wx.showModal({
            title: '提示消息',
            content: '您同意了该学生的结对请求',
            showCancel: false,
            success(e) {
              that.setData({
                showMessage: false
              })
            }
          })
        }
        else {
          wx.showToast({
            title: '操作出错，请重试',
          })
          that.setData({
            showMessage: false
          })
        }
      }
    })
  },
  seeMore(e){
    console.log(e)
    var article = this.data.article
    this.setData({
      showEdit: true,
      index: e.currentTarget.dataset.id,
      article_id: article[e.currentTarget.dataset.id]._id
    })
  },
  cancel_edit(){
    this.setData({
      showEdit: false
    })
  },
  showSavedPhoto() {
    this.setData({
      showSavedPhoto: true,
      show: false
    })
  },
  closePhoto() {
    this.setData({
      showSavedPhoto: false,
      show: true
    })
  },
  input(e){
    this.setData({
      input: e.detail.value
    })
  },
  sent(){
    var that = this
    var body={}
    body.content = that.data.input
    wx.showLoading({
      title: '正在发送...',
    })
    wx.request({
      url: `http://129.204.216.249:4000/article/volunteer/mark/test1/11379/${that.data.article_id}`,
      method:'POST',
      data:body,
      success(res){
        wx.hideLoading()
        console.log(res)
        if(res.data.code==0){
          wx.showToast({
            title: '发送成功',
          })
          that.setData({
            showEdit:false
          })
        }
      }
    })
  }
})