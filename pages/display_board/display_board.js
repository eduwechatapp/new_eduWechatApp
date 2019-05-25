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
    heart:["../icon/redheart.png","../icon/heart.png"]
  },
  onLoad:function(options){
    console.log(options)
    var taplist = new Array(this.data.imageList.length)
    taplist.fill(false)
    this.setData({
      tapList:taplist
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
      id: id
    });
  }
})