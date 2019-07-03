const app = getApp();

Page({
  data: {
    imageList: [
      "https://vaskka.com/static/table.jpeg",
      "https://vaskka.com/static/world.jpeg",
      "https://vaskka.com/static/bluecar.jpeg",
      "https://vaskka.com/static/flower.jpeg",
      "https://vaskka.com/static/picture.jpeg"
    ],
    textList: ["天文", "地理", "人文", "科技", "生命"]
  },
  toBoard(e) {
    app.route('../display_board/display_board', {
      module: this.data.textList[e.currentTarget.dataset.id],
    });
  },
});
