Page({
  data:{
    menu: [
      { module: "知识点", url: "../icon/knowledge.png" },
      { module: "视频", url: "../icon/video.png" },
      { module: "专题", url: "../icon/zhuanti.png" },
      { module: "真题试卷", url: "../icon/exam.png" },
      { module: "归纳总结", url: "../icon/conclusion.png" },
      { module: "上次记录", url: "../icon/lastnote.png" },
      { module: "需要留意", url: "../icon/attention.png" },
      { module: "重点关注", url: "../icon/payAttention.png" },
      { module: "收藏", url: "../icon/star.png" },
    ],
    subject:"",
  },
  onLoad:function(options){
    console.log(options.subject)
    this.setData({
      subject:options.subject
    })
  },
  toList:function(event){
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../Outer_list/Outer_list?arg='+id +'&sub='+this.data.subject,
    })
  }
})
