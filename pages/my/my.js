import {
  $wuxActionSheet
} from '../../dist/index';

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
      title: '基本信息设置',
      function: 'toInfoChange',
      params: 'score'
    }],
    infoList1 :[{
      imageUrl: '../../pages/icon/clean.png',
      title: '清除缓存',
      function: 'clean',
      params: 'clean'
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
      buttons.unshift({
        text: e
      });
    });
    const _target = type === 'major' ? 'info.major' : 'info.grade';
    const that = this;
    $wuxActionSheet().showSheet({
      theme: 'wx',
      titleText: '请选择',
      buttons,
      buttonClicked(index, item) {
        that.setData({
          [_target]: item.text,
        });
        wx.setStorage({
          key: _target,
          data: item.text,
        })
        return true;
      },

    });


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var major = "info.major"
    var grade = "info.grade"
    var that = this
    wx.getStorage({
      key: 'info.major',
      success(res) {
        that.setData({
          [major]:res.data
        })
      }
    })
    wx.getStorage({
      key: 'info.grade',
      success(res) {
        that.setData({
          [grade]: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  toInfoChange: function(e) {
    var params = e.detail.params
    wx.navigateTo({
      url: '../info_change/info_change?type=' + params,
      success: (result) => {

      },
      fail: () => {},
      complete: () => {}
    });

  },

  toFeedback: function() {
    wx.navigateTo({
      url: '../feedback/feedback'
    })
  },
  clean:function(e){
    var that = this
    wx.showModal({
      title: '警告',
      content: '您对文章的标记还有个人信息将会失效，确定继续吗？',
      success(res){
        if(res.confirm){
          wx.clearStorageSync()
          that.setData({
            ["info.major"]:"请选择科目",
            ["info.grade"]:"请选择年级"
          })
        }
      }
    })
    
  }
})