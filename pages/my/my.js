import { $wuxActionSheet } from '../../dist/index';

const MajorEnum = [
  '文科',
  '理科',
];

const GradeEnum = [
  '高一',
  '高二',
  '高三',
];

Page({
  data: {
    infoList: [{
      imageUrl: '../../pages/icon/score.png',
      title: '模考分数区间',
      function: 'toInfoChange',
      params: 'score'
    }],
    funcList: [{
      imageUrl: '../../pages/icon/feedback.png',
      title: '功能建议',
      function: 'toFeedback'
    }, {
      imageUrl: '../../pages/icon/debug.png',
      title: 'BUG反馈',
      function: 'toFeedback'
    }],
    info: {
      major: '请选择科目',
      grade: '请选择年级',
    },
  },

  choose(e) {
    const type = e.currentTarget.dataset.type;
    const buttons = [];
    const _enum = type === 'major' ? MajorEnum : GradeEnum;
    _enum.forEach(e => {
      buttons.unshift({ text: e });
    });
    const that = this;
    $wuxActionSheet().showSheet({
      theme: 'wx',
      titleText: '请选择',
      buttons,
      buttonClicked(index, item) {
        const _target = type === 'major' ?
          { 'info.major': item.text } :
          { 'info.grade': item.text };
        that.setData(_target);
        return true;
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  toInfoChange: function (e) {
    var params = e.detail.params
    wx.navigateTo({
      url: '../info_change/info_change?type=' + params,
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });

  },

  toFeedback: function () {
    wx.navigateTo({
      url: '../feedback/feedback'
    })
  }
})