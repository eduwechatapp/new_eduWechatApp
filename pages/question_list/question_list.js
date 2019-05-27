import WxParse from '../../wxParse/wxParse';
var WpJson = require('../../wxParse/html2json.js');

const app = getApp();

Page({
  data: {
    yiji: '',
    erji: '',
    subject: '',
    type:[],
    contentList: [],
    show: false,
    currentTap: 0
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
    const type = await this.fetchTypeData();
    await this.Set({
      type: type.data
    })
    const response = await this.fetchListData();
    await this.Set({
      contentList: response.data,
    });
    response.data.forEach((value, index) => {
      WxParse.wxParse(`content[${index}]`, 'html', value.content, this);
    });
  },

  async fetchListData() {
    return new Promise(resolve => {
      wx.request({
        url: `http://129.204.216.249:4000/exercise/list/test/${this.data.subject}/${this.data.yiji}/${this.data.erji}/${this.data.type[this.data.currentTap]}/false/5/0`,
        success(response) {
          resolve(response.data);
        },
      });
    });
  },
  async fetchTypeData() {
    return new Promise(resolve => {
      wx.request({
        url: `http://129.204.216.249:4000/exercise/type/test/${this.data.subject}`,
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
  show(){
    this.setData({
      show:true
    })
  },
  changeType(e){
    this.setData({
      currentTap: e.currentTarget.dataset.id
    })
  },
  async confirm(e){
    this.setData({
      show: false
    })
    wx.showLoading({
      title: '加载ing',
    })
    const type = await this.fetchTypeData();
    await this.Set({
      type: type.data
    })
    const response = await this.fetchListData();
    await this.Set({
      contentList: response.data,
    });
    response.data.forEach((value, index) => {
      WxParse.wxParse(`content[${index}]`, 'html', value.content, this);
    });
    wx.hideLoading();
  }
});
