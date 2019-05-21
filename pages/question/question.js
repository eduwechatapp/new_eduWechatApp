Page({
  data:{
    showContent:[],
    srcPath:[
      "../icon/plus.png",
      "../icon/minus.png"
    ],
    list:[
      {
        title:"运动的描述",
        value:[
          "1111111111111111",
        ]
      },
      {
        title: "运动的描述",
        value: [
          "222222222222",
          
        ]
      },
      {
        title: "运动的描述",
        value: [
          "33333333333333"
        ]
      },
      {
        title: "运动的描述",
        value: [
          "44444444444444444"
        ]
      }
    ],
    currentTap:''
  },
  onLoad(e){
    var that = this;
    const array = new Array(that.data.list.length).fill(false)
    console.log(that.data.list.length)
    var list_temp = that.data.list
    for(let i = 0;i<that.data.list.length;i++){
      list_temp[i]["show"]  = false
      list_temp[i]["id"] = i
    }
    this.setData({
      showContent: array
    })
  },
  changeShow(e){
    console.log(e)
    var that = this;
    for(var i = 0;i<that.data.list.length;i++){
      if(e.currentTarget.dataset.id==that.data.list[i].id){
        var index = "list[" + e.currentTarget.dataset.id + "].show"
        if(that.data.list[i].show){
          that.setData({
            [index]:false
          })
        }
        else{
          that.setData({
            [index]:true
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
    wx.navigateTo({
      url: '../question_detail/question_detail',
    })
  }
})