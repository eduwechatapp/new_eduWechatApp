import {
  $wuxSelect
} from '../../dist/index'
var app = getApp();
Page({
  data: {
    showContent: [],
    srcPath: [
      "../icon/plus.png",
      "../icon/minus.png"
    ],
    list: [],
    currentTap: '',
    title: '语文',
    value: '语文',
    subject: [
      '语文', '数学', '英语',
      '化学', '物理', '生物',
      '地理', '历史', '生物'
    ],
    contentHeight: 0,
  },
  onLoad(e) {
    wx.showLoading({
      title: '加载ing',
    })
    this.request("语文")
  },
  changeShow(e) {
    const id = e.currentTarget.dataset.id;
    const tranHO = 'transition: height .5s ease, opacity .5s .1s ease;';
    const tranOH = 'transition: height .5s .1s ease, opacity .5s ease;';
    const tout = `${tranOH}height: 0; opacity: 0;`;
    const tin = `${tranHO}height: 100rpx; opacity: 1;`;
    this.data.list.forEach((v, i) => {
      const name = `list[${i}].show`;
      if (v.show) {
        this.setData({
          [`list[${i}].style`]: tout,
        });
        setTimeout(() => {
          this.setData({
            [name]: false,
          });
        }, 550);
        return;
      }
      if (v.id != id) {
        return;
      }
      this.setData({
        [name]: true,
        currentTap: id,
      }, () => {
        this.setData({
          [`list[${i}].style`]: tin,
        });
      });
    });
  },
  toQuestion: function(e) {
    var that = this;
    wx.navigateTo({
      url: `../question_list/question_list?yiji=${that.data.list[that.data.currentTap].title}&erji=${that.data.list[that.data.currentTap].children[e.currentTarget.dataset.id]}&subject=${that.data.title}`,
    })
  },
  onClick: function(e) {
    var　 that = this;
    $wuxSelect('#wux-select').open({
      value: that.data.value,
      options: that.data.subject,
      onConfirm: (value, index, options) => {
        if (index !== -1) {
          that.setData({
            value: value,
            title: options[index],
          })
          wx.showLoading({
            title: '加载ing'
          })
          that.request(that.data.title)

        }
      },
    })
  },
  request: function(title) {

    var that = this;
    wx.request({ //选择完学科以后请求学科题目列表
      url: `https://www.vaskka.com/mp/exercise/title/${app.globalData.openid}/${title}`,
      success(res) {
        res.data.data.forEach(e => {
          e.style = 'opacity: 0; height: 0;';
        });
        that.setData({
          list: res.data.data
        })
        const array = new Array(that.data.list.length).fill(false)
        var list_temp = that.data.list
        for (let i = 0; i < that.data.list.length; i++) {
          list_temp[i]["show"] = false
          list_temp[i]["id"] = i
        }
        that.setData({
          showContent: array
        })
        wx.hideLoading()
      }
    })
  }
})