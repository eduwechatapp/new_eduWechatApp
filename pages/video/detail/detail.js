Page({
  data: {
    title: '',
    src: '',
  },

  onLoad(options) {
    const { title, src } = options;
    this.setData({
      title,
      src,
    });
  },
});
