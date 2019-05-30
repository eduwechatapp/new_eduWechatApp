const app = getApp()
Page({
  data:{
    imageList:[
      "https://vaskka.com/static/bread.jpeg",
      "https://vaskka.com/static/beach.jpeg",
      "https://vaskka.com/static/heiwan.jpeg",
      "https://vaskka.com/static/noodle.jpeg",
      "https://vaskka.com/static/people.jpeg",
      "https://vaskka.com/static/redcar.jpeg"
    ],
    tapList:[],
    msgList:[],
    heart:["../icon/redheart.png","../icon/heart.png"],
    module:'',
    id:'',
    name:'',
    location:'',
    index:''

  },
  onLoad:function(options){
    var that = this
    console.log(options)
    var taplist = new Array(this.data.imageList.length)
    taplist.fill(false)
    this.setData({
      tapList:taplist,
      module: options.module
    })
    wx.request({
      url: `https://www.vaskka.com/mp/message/get/${app.globalData.openid}/${this.data.module}/20/0`,
      success(res){
        for(let i = 0;i<res.data.data.length;i++){
          res.data.data[i].createTime = res.data.data[i].createTime.slice(5).replace(/-/,"月")+"日"
        }
        console.log(res.data.data)
        that.setData({
          msgList:res.data.data
        })
      }
    })
  },
  like:function(e){
    var id = e.currentTarget.dataset.id
    var index = "tapList["+id+"]"
    this.setData({
      [index]: !this.data.tapList[id]
    })
  },
  toDetail:function(e){
    var id = e.currentTarget.dataset.id
    app.route('../board_detail/board_detail', {
      id: this.data.msgList[id]._id,
      index: this.data.msgList[id].index
    });
  },
  toEdit:function(e){
    app.route('../msg_edit/msg_edit', {
      module: this.data.module
    });
  }
})