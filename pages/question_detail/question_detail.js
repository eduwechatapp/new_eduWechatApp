import WxParse from '../../wxParse/wxParse';
Page({
  data:{
    detailInfo:{},
    id:'',
    haveExamPoint: false,
    haveAnalysis: false,
    haveAnswer: false,
    haveComment: false
  },
  async onLoad(options) {
    await this.Set({
      id: options.id,
      subject: options.subject,
    });
    const response = await this.fetchData();
    await this.Set({
      detailInfo: response.data,
    });
    var that = this;
    WxParse.wxParse('content', 'html', that.data.detailInfo.content, that)
    var length = that.data.detailInfo.choose.length
    for (let i = 0; i < length; i++) {
      WxParse.wxParse('choose' + i, 'html', that.data.detailInfo.choose[i], that)
      if (i === length - 1) {
        WxParse.wxParseTemArray("choose", 'choose', length, that)
      }
    }
    if (that.data.detailInfo.analysis.question_point != null){
      await this.Set({
        haveExamPoint: true,
      });
      WxParse.wxParse('exampoint', 'html', that.data.detailInfo.analysis.question_point, that)
    }
    if (that.data.detailInfo.analysis.question_analysis != null) {
      await this.Set({
        haveAnalysis: true,
      });
      WxParse.wxParse('analysis', 'html', that.data.detailInfo.analysis.question_analysis, that)
    }
    if (that.data.detailInfo.answer != null) {
      await this.Set({
        haveAnswer: true,
      });
      WxParse.wxParse('answer', 'html', that.data.detailInfo.answer, that)
    }
    if (that.data.detailInfo.analysis.question_comment != null) {
      await this.Set({
        haveComment: true,
      });
      WxParse.wxParse('comment', 'html', that.data.detailInfo.analysis.question_comment, that)
    }
    
  },
  async fetchData() {
    return new Promise(resolve => {
      wx.request({
        url: `https://www.vaskka.com/mp/exercise/detail/test/${this.data.subject}/${this.data.id}`,
        success(response) {
          resolve(response.data);
        },
      });
    });
  },
  Set(options) {
    return new Promise(res => {
      this.setData(options, res);
    });
  },
})