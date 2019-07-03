const app = getApp();

Page({
  data:{
    imageList:[
      "https://vaskka.com/static/bread.jpeg",
      "https://vaskka.com/static/beach.jpeg",
      "https://vaskka.com/static/heiwan.jpeg",
      "https://vaskka.com/static/noodle.jpeg",
      "https://vaskka.com/static/people.jpeg",
      "https://vaskka.com/static/redcar.jpeg"
    ],
    tapList:[],
    msgList:[],
    heart:["../icon/redheart.png","../icon/heart.png"],
    module:'',
    id:'',
    name:'',
    location:'',
    index:'',
    nodata: false,
    currentPage:0
  },

  onLoad:function(options){
    var that = this;
    this.setData({
      module: options.module,
    })
    wx.request({
      url: `https://www.vaskka.com/mp/message/get/${app.globalData.openid}/${that.data.module}/6/${that.data.currentPage}`,
      success(res){
        if(res.data.data.length == 0){
          that.setData({
            nodata: true
          })
        }
        const deal = str => {
          let s = `${str}`;
          if (s.includes('/')) {
            s = s.replace(/^[^\/]*\//, '');
            if (s.includes('/')) {
              s = s.replace(/\/.*$/, '');
            }
          }
          return s;
        };
        for(let i = 0;i<res.data.data.length;i++){
          res.data.data[i].createTime = res.data.data[i].createTime.slice(5).replace(/-/,"月")+"日"
          res.data.data[i].location = deal(res.data.data[i].location);
        }
        that.setData({
          msgList:res.data.data,
        })
        var taplist = new Array(that.data.msgList.length);
        taplist.fill(false)
        that.setData({
          tapList:taplist
        })
      }
    })
  },
  like:function(e){
    var id = e.currentTarget.dataset.id
    var index = "tapList["+id+"]"
    this.setData({
      [index]: !this.data.tapList[id]
    })
  },
  toDetail:function(e){
    var id = e.currentTarget.dataset.id
    app.route('../board_detail/board_detail', {
      id: this.data.msgList[id]._id,
      index: this.data.msgList[id].index
    });
  },
  toEdit:function(e){
    app.route('../msg_edit/msg_edit', {
      module: this.data.module
    });
  },
  async changePage(e) {
    var that = this
    console.log(e)
    var type = e.currentTarget.dataset.type
    if (type == "next") {
      that.setData({
        currentPage: that.data.currentPage + 1
      })
    }
    else {
      if (that.data.currentPage == 0) {
        app.toast('已经是第一页了');
        return
      }
      else {
        that.setData({
          currentPage: that.data.currentPage - 1
        })
      }
    }
    const response = await that.fetchListData();
    wx.showLoading({
      title: '加载ing',
    });
    if (response.data.length == 0) {
      wx.hideLoading()
      app.toast('没有更多数据了')
      that.setData({
        currentPage: that.data.currentPage - 1
      })
      return;
    } else {
      await that.Set({
        msgList: response.data,
      });
    }
    wx.hideLoading()
  },
  async fetchListData() {
    var that = this
    return new Promise(resolve => {
      wx.request({
        url: `https://www.vaskka.com/mp/message/get/${app.globalData.openid}/${that.data.module}/6/${that.data.currentPage}`,
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
});
