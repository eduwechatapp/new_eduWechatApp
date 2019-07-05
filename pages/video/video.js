const app = getApp();

const Data = {
  subjectName: '',
};

Page({
  data: {
    videoList: [],
  },

  onLoad(options) {
    ({
      subjectName: Data.subjectName,
    } = options);
  },

  async onShow() {
    await this.fetchData();
  },

  onNoResult() {
    wx.showModal({
      title: '提示',
      content: '该科目下暂无公开课视频哦',
      showCancel: false,
      success(res) {
        if (res.confirm) {
          wx.navigateBack({
            delta: 1
          });
        }
      },
    });
  },

  async fetchData() {
    const response = await app.api.video.fetchVideo(Data.subjectName, 20, 1);
    const videoList = response.data;
    if (videoList.length === 0) {
      this.onNoResult();
      return;
    }
    this.setData({ videoList });
  },

  toDetail(e) {
    const index = e.currentTarget.dataset.index;
    const { name, url } = this.data.videoList[index];
    app.route('/pages/video/detail/detail', { name, url, subjectName: Data.subjectName });
  },
});
