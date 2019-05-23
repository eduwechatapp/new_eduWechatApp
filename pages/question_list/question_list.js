import WxParse from '../../wxParse/wxParse';
var WpJson = require('../../wxParse/html2json.js');

const app = getApp();

Page({
  data: {
    yiji: '',
    erji: '',
    subject: '',
    contentList: [],
  },

  Set(options) {
    return new Promise(res => {
      this.setData(options, res);
    });
  },

  async onLoad(options) {
    await this.Set({
      yiji: options.yiji,
      erji: options.erji,
      subject: options.subject,
    });
    const response = await this.fetchData();
    await this.Set({
      contentList: response.data,
    });
    response.data.forEach((value, index) => {
      WxParse.wxParse(`content[${index}]`, 'html', value.content, this);
    });
  },

  async fetchData() {
    return new Promise(resolve => {
      wx.request({
        url: `http://129.204.216.249:4000/exercise/list/test/${this.data.subject}/${this.data.yiji}/${this.data.erji}/5/1`,
        success(response) {
          resolve(response.data);
        },
      });
    });
  },

  toDetail(e) {
    const id = this.data.contentList[e.currentTarget.dataset.id].id;
    wx.navigateTo({
      url: `../question_detail/question_detail?id=${id}&subject=${this.data.subject}`,
    });
  },
});
