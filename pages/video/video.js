const app = getApp();

Page({
  data: {
    videoList: [],
  },

  async onShow() {
    await this.fetchData();
  },

  async fetchData() {
    const response = await app.api.video.fetchVideo('english', 20, 1);
    console.log(response);
    // this.setData({ videoList });
  },

  toDetail(e) {
    const index = e.currentTarget.dataset.index;
    const { title, src } = this.data.videoList[index];
    app.route('/pages/video/detail/detail', { title, src });
  },
});
