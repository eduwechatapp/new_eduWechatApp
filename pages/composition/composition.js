const app = getApp();
Page({
  data:{
    current:'upload',
    tabs: [
      {
        key: 'envelope',
        title: '批改反馈',
        content: 'Content of tab 1',
      },
      {
        key: 'upload',
        title: '上传作文',
        content: 'Content of tab 2',
      },
      {
        key: 'option',
        title: '结对设置',
        content: 'Content of tab 3',
      },
    ],
    camera: false,
    showImage: false,
    show:true,
    showSavedPhoto: false,
    showArticle:false,
    ctx:{},
    src:'',
    key: 'upload',
    select: false,
    nickname: '志愿者',
    volunteer:{},
    leftAvatar:'',
    uid:'',
    showEdit:false,
    input:'',
    article:'',
    index_:'',
    comment:''
  },
  onLoad(){
    var that = this
    this.ctx = wx.createCameraContext()
    wx.request({
      url: `http://129.204.216.249:4000/article/student/get/all/volunteer/${app.globalData.openid}/99362`,
      success(res){
        console.log(res)

        that.setData({
          volunteer:res.data.data
        })
      }
    })
    wx.request({
      url: `http://129.204.216.249:4000/article/student/get/all/${app.globalData.openid}/99362/20/0`,
      success(res){
        that.setData({
          article: res.data.data
        })
      }
    })
  },
  onTabsChange(e) {
    console.log('onTabsChange', e)
    const { key } = e.detail
    const index = this.data.tabs.map((n) => n.key).indexOf(key)
    this.setData({
      key,
      index,
    })
  },
  onSwiperChange(e) {
    console.log('onSwiperChange', e)
    const { current: index, source } = e.detail
    const { key } = this.data.tabs[index]
    if (!!source) {
      this.setData({
        key,
        index,
      })
    }
  },
  takePhoto() {
    this.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath,
          camera: false,
          showImage: true
        })
      }
    })
  },
  callCamera(){
    this.setData({
      camera: true,
      show: false
    })
  },
  returnback(){
    this.setData({
      camera: true,
      showImage: false
    })
  },
  confirm(){
    this.setData({
      show: true,
      showImage: false
    })
  },
  cancel(){
    this.setData({
      camera: false,
      show: true,
      src:''
    })
  },
  showSavedPhoto(){
    this.setData({
      showSavedPhoto: true,
      show: false
    })
  },
  closePhoto(){
    this.setData({
      showSavedPhoto: false,
      show: true
    })
  },

  bindShowMsg() {
    this.setData({
      select: !this.data.select
    })
  },
  mySelect(e) {
    console.log(e)
    var name = e.currentTarget.dataset.item.name
    var avatar = e.currentTarget.dataset.item.url
    this.setData({
      nickname: name,
      leftAvatar: avatar,
      select: false,
      uid: e.currentTarget.dataset.item.uid
    })
  },
  pair(){
    wx.request({
      url: `http://129.204.216.249:4000/article/student/couple/volunteer/${app.globalData.openid}/99362/${this.data.uid}`,
      success(e){
        console.log(e)
        if(e.data.code==0){
          wx.showModal({
            title: '提示信息',
            content: '已经成功发送结对请求',
            showCancel:false
          })
        }
        else{
          wx.showModal({
            title: '提示信息',
            content: '发送请求出错！',
            showCancel: false
          })
        }
      }
    })
  },
  sentMsg(){
    var that = this
    this.setData({
      showEdit: true
    })

  },
  input(e){
    console.log(e)
    this.setData({
      input: e.detail.value
    })
  },
  cancel_edit(){
    this.setData({
      input:'',
      showEdit: false
    })
  },
  sent(){
    var that = this
    wx.showLoading({
      title: '发送中...',
    })
    wx.uploadFile({
      url: `http://129.204.216.249:4000/article/student/upload/${app.globalData.openid}/99362/${that.data.input}`, 
      filePath: that.data.src,
      name: 'file',
      success(res) {
        wx.hideLoading()
        const data = res.data
        console.log(res)
        var array = JSON.parse(res.data)
        if(array.code==0){
          wx.showModal({
            title: '提示消息',
            content: '作文已经成功发送！',
            showCancel: false,
            success: function(res) {
              that.setData({
                showEdit: false
              })
            },
          })
        }
        else{
          wx.showModal({
            title: '提示消息',
            content: '作文发送失败',
            showCancel: false,
            success: function (res) {
              that.setData({
                showEdit: false
              })
            },
          })
        }
      }
    })
  },
  seeMore(e) {
    console.log(e)
    var article = this.data.article
    if (article[e.currentTarget.dataset.id].reply!=null){
      this.setData({
        showArticle: true,
        index_: e.currentTarget.dataset.id,
        article_id: article[e.currentTarget.dataset.id]._id,
        comment: article[e.currentTarget.dataset.id].reply.content
      })
    }
    else{
      this.setData({
        showArticle: true,
        index_: e.currentTarget.dataset.id,
        article_id: article[e.currentTarget.dataset.id]._id,
        comment: '暂无评语'
      })
    }

  },
  cancel_article() {
    this.setData({
      showArticle: false
    })
  },

})