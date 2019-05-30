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
    currentTap: 0,
    noData: false,
    currentPage:0
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
    //没有数据的时候显示提示
    if (this.data.contentList.length === 0){
      await this.Set({
        noData: true
      })
    }
    else{
      await this.Set({
        noData: false
      })
    }
    response.data.forEach((value, index) => {
      WxParse.wxParse(`content[${index}]`, 'html', value.content, this);
    });
  },

  async fetchListData() {
    return new Promise(resolve => {
      wx.request({
        url: `https://www.vaskka.com/mp/exercise/list/test/${this.data.subject}/${this.data.yiji}/${this.data.erji}/${this.data.type[this.data.currentTap]}/false/5/${this.data.currentPage}`,
        success(response) {
          resolve(response.data);
        },
      });
    });
  },
  async fetchTypeData() {
    return new Promise(resolve => {
      wx.request({
        url: `https://www.vaskka.com/mp/exercise/type/test/${this.data.subject}`,
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
      show: false,
      currentPage: 0
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
    //没有数据的时候显示提示
    if (this.data.contentList.length === 0) {
      await this.Set({
        noData: true
      })
    }
    else {
      await this.Set({
        noData: false
      })
    }
    response.data.forEach((value, index) => {
      WxParse.wxParse(`content[${index}]`, 'html', value.content, this);
    });
    wx.hideLoading();
  },
  async changePage(e){
    var that = this
    console.log(e)
    var type = e.currentTarget.dataset.type
    if(type=="next"){
      that.setData({
        currentPage: that.data.currentPage + 1
      })
    }
    else{
      if (that.data.currentPage==0){
        app.toast('已经是第一页了');
        return 
      }
      else{
        that.setData({
          currentPage: that.data.currentPage - 1
        })
      }
    }
    const response = await that.fetchListData();
    wx.showLoading({
      title: '加载ing',
    })
    console.log(response)
    if (response.data.length == 0) {
      app.toast('没有更多数据了')
      that.setData({
        currentPage: that.data.currentPage - 1
      })
      wx.hideLoading()
      return
    }
    else {
      await that.Set({
        contentList: response.data,
      });
    }
    wx.hideLoading()
    response.data.forEach((value, index) => {
      WxParse.wxParse(`content[${index}]`, 'html', value.content, this);
    });
  }
});
