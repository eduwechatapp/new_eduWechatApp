const app = getApp();

Page({
  data: {
    list: [],
  },

  async fetchData(e) {
    const subjectUnique = 'yy';
    const pageSize = 20;
    const url = `/search/detail/test/${subjectUnique}/${pageSize}/${e.detail.page}`;
    const data = { title: 'Unit' };

    const response = await app.post(url, {}, data);

    this.setData({
      list: response.data.dataList,
    });
  },
});
