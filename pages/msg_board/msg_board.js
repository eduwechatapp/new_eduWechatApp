const app = getApp();
Page({
  data:{
    imageList:[
      "https://vaskka.com/static/table.jpeg",
      "https://vaskka.com/static/world.jpeg",
      "https://vaskka.com/static/bluecar.jpeg",
      "https://vaskka.com/static/flower.jpeg",
      "https://vaskka.com/static/picture.jpeg"
    ],
    textList:["考试压力","你的梦想","未来选择","女生空间","不开心事"]
  },
  toBoard:function(e){
    app.route('../display_board/display_board', {
      module: this.data.textList[e.currentTarget.dataset.id],
    });
  }
})