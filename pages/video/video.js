const app = getApp();

Page({
  data: {
    videoList: [],
  },

  async onShow() {
    await this.fetchData();
  },

  async fetchData() {
    const videoList = [{
      title: '疯狂动物城',
      src: 'https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    }];
    this.setData({ videoList });
  },

  toDetail(e) {
    const index = e.currentTarget.dataset.index;
    const { title, src } = this.data.videoList[index];
    app.route('/pages/video/detail/detail', { title, src });
  },
});
