import { $wuxSelect } from '../../dist/index'
var app = getApp();
Page({
  data:{
    showContent:[],
    srcPath:[
      "../icon/plus.png",
      "../icon/minus.png"
    ],
    list:[],
    currentTap:'',
    title:'语文',
    value:'语文',
    subject: [
      '语文','数学','英语',
      '化学','物理','生物',
      '地理','历史','生物'
    ],
  },
  onLoad(e){
    wx.showLoading({
      title: '加载ing',
    })
    this.request("语文")
  },
  changeShow(e){
    var that = this;
    for(var i = 0;i<that.data.list.length;i++){
      if(e.currentTarget.dataset.id==that.data.list[i].id){
        var index = "list[" + e.currentTarget.dataset.id + "].show"
        if(that.data.list[i].show){
          that.setData({
            [index]:false,
            currentTap:null
          })
        }
        else{
          that.setData({
            [index]:true,
            currentTap: e.currentTarget.dataset.id
          })
        }
      }
      else{
        var index1 = "list[" + i + "].show"
        that.setData({
          [index1]: false
        })
      }
    }
  },
  toQuestion:function(e){
    var that = this;
    wx.navigateTo({
      url: `../question_list/question_list?yiji=${that.data.list[that.data.currentTap].title}&erji=${that.data.list[that.data.currentTap].children[e.currentTarget.dataset.id]}&subject=${that.data.title}`,
    })
  },
  onClick:function(e){
    var　that = this;
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
  request:function(title){

    var that = this;
    wx.request({//选择完学科以后请求学科题目列表
      url: 'http://129.204.216.249:4000/exercise/title/test/' + title,
      success(res) {
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