Page({
  data:{
    menu: [
      
    ],
    subject:"",
  },
  onLoad:function(options){
    var that = this;
    console.log(options.subject)
    that.setData({
      subject:options.subject
    })
    if (options.subject == 'english' || options.subject == 'chinese'){
      that.setData({
        menu:[
          { module: "知识点", url: "../icon/knowledge.png" },
          //{ module: "视频", url: "../icon/video.png" },
          { module: "专题", url: "../icon/zhuanti.png" },
          //{ module: "真题试卷", url: "../icon/exam.png" },
          { module: "归纳总结", url: "../icon/conclusion.png" },
          //{ module: "上次记录", url: "../icon/lastnote.png" },
          { module: "需要留意", url: "../icon/attention.png" },
          { module: "重点关注", url: "../icon/payAttention.png" },
          //{ module: "收藏", url: "../icon/star.png" },
        ]
      })
    }
    if (options.subject == 'math' || options.subject == 'history') {
      that.setData({
        menu: [
          { module: "知识点", url: "../icon/knowledge.png" },
          //{ module: "视频", url: "../icon/video.png" }, 
          //{ module: "真题试卷", url: "../icon/exam.png" },
          //{ module: "上次记录", url: "../icon/lastnote.png" },
          { module: "需要留意", url: "../icon/attention.png" },
          { module: "重点关注", url: "../icon/payAttention.png" },
          //{ module: "收藏", url: "../icon/star.png" },
        ]
      })
    }
    if (options.subject == 'geography' ) {
      that.setData({
        menu: [
          { module: "知识点", url: "../icon/knowledge.png" },
          //{ module: "视频", url: "../icon/video.png" },
          { module: "专题", url: "../icon/zhuanti.png" },
          //{ module: "真题试卷", url: "../icon/exam.png" },
          { module: "归纳总结", url: "../icon/conclusion.png" },
          { module: "答题模版", url: "../icon/template.png" },
          //{ module: "上次记录", url: "../icon/lastnote.png" },
          { module: "需要留意", url: "../icon/attention.png" },
          { module: "重点关注", url: "../icon/payAttention.png" },
          //{ module: "收藏", url: "../icon/star.png" },
        ]
      })
    }
    if (options.subject == 'political') {
      that.setData({
        menu: [
          { module: "知识点", url: "../icon/knowledge.png" },
          //{ module: "视频", url: "../icon/video.png" },
          //{ module: "真题试卷", url: "../icon/exam.png" },
          { module: "归纳总结", url: "../icon/conclusion.png" },
          //{ module: "上次记录", url: "../icon/lastnote.png" },
          { module: "需要留意", url: "../icon/attention.png" },
          { module: "重点关注", url: "../icon/payAttention.png" },
          //{ module: "收藏", url: "../icon/star.png" },
        ]
      })
    }
    if (options.subject == 'physics') {
      that.setData({
        menu: [
          { module: "知识点", url: "../icon/knowledge.png" },
          //{ module: "视频", url: "../icon/video.png" },
          //{ module: "真题试卷", url: "../icon/exam.png" },
          //{ module: "上次记录", url: "../icon/lastnote.png" },
          { module: "需要留意", url: "../icon/attention.png" },
          { module: "重点关注", url: "../icon/payAttention.png" },
          //{ module: "收藏", url: "../icon/star.png" },
        ]
      })
    }
    if (options.subject == 'chemistry') {
      that.setData({
        menu: [
          { module: "知识点", url: "../icon/knowledge.png" },
          //{ module: "视频", url: "../icon/video.png" },
          //{ module: "真题试卷", url: "../icon/exam.png" },
          { module: "答题模版", url: "../icon/template.png" },
          //{ module: "上次记录", url: "../icon/lastnote.png" },
          { module: "需要留意", url: "../icon/attention.png" },
          { module: "重点关注", url: "../icon/payAttention.png" },
          //{ module: "收藏", url: "../icon/star.png" },
        ]
      })
    }
    if (options.subject == 'biology') {
      that.setData({
        menu: [
          { module: "知识点", url: "../icon/knowledge.png" },
          //{ module: "视频", url: "../icon/video.png" },
          //{ module: "真题试卷", url: "../icon/exam.png" },
          //{ module: "上次记录", url: "../icon/lastnote.png" },
          { module: "需要留意", url: "../icon/attention.png" },
          { module: "重点关注", url: "../icon/payAttention.png" },
          //{ module: "收藏", url: "../icon/star.png" },
        ]
      })
    }
  },
  toList:function(event){
    var id = event.currentTarget.dataset.id
    console.log(id)
    if(id=="需要留意"||id=="重点关注"){
      wx.navigateTo({
        url: '../Outer_storage_list/Outer_storage_list?arg=' + id + '&sub=' + this.data.subject,
      })
    }
    else{
      wx.navigateTo({
        url: '../Outer_list/Outer_list?arg=' + id + '&sub=' + this.data.subject,
      })
    }
   
  }
})
