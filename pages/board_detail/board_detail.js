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
    index:'',
    infoList:[],
    id:'',
    show: false,
    inputShow: false,
    disabled:true,
    comment:'',
    bottom:''
  },
  onLoad:function(options){
    var that = this
    console.log(options)
    this.setData({
      index:options.index,
      id: options.id
    })
    wx.request({
      url: `https://www.vaskka.com/mp/message/detail/${app.globalData.openid}/${this.data.id}`,
      success(res){
        res.data.data.createTime = res.data.data.createTime.slice(5).replace(/-/, "月") + "日"
        that.setData({
          infoList: res.data.data
        })
      }
    })
    wx.request({
      url: `https://www.vaskka.com/mp/message/reply/get/${app.globalData.openid}/${this.data.id}`,
      success(res){
        that.setData({
          commentList:res.data.data 
        })
      }
    })
  },
  show(e){
    this.setData({
      show: !this.data.show
    })
  },
  hideShow(e){
    this.setData({
      show:false,
      inputShow: false,
      disabled: true
    })
  },
  writeComment(e){
    this.setData({
      show: false,
      inputShow: true
    })

  },
  input(e){
    this.setData({
      comment: e.detail.value
    })
    if(this.data.comment!=''){
      this.setData({
        disabled: false
      })
    }
    else{
      this.setData({
        disabled: true
      })
    }
  },
  catch(e){
    //空函数阻止tap冒泡
  },
  sent(e){
    var that = this
    var body = {}
    body.time=""
    body.name=""
    body.content=this.data.comment
    wx.request({
      url: `https://www.vaskka.com/mp/message/reply/create/reply/${app.globalData.openid}/${this.data.id}`,
      method:'POST',
      data:body,
      success(res){
        var array = that.data.commentList
        array.push(body)
        that.setData({
          show: false,
          inputShow: false,
          disabled: true,
          commentList: array
        })
        
      }
    })
  },
  focus: function (e) {
    var that = this;
    that.setData({
      bottom: e.detail.height
    })
  },
})