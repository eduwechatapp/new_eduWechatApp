const app = getApp();

Page({
  toPractice() {
    app.route('/pages/question/question');
  },
  toVideo() {
    app.route('/pages/video/video');
  },
});
