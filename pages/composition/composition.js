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
    ctx:{},
    src:'',
    key: 'upload'
  },
  onLoad(){
    this.ctx = wx.createCameraContext()
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
  }
})