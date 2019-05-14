Page({
  data:{
    listName:[],
    subject:'',
    module:'',
    storage:[],

  },
  onLoad:function(options){
    //console.log(options)
    var that = this;
    if(options.arg=='知识点'){
      wx.request({
        url: 'https://www.vaskka.com/mp/'+options.sub+'/knowledge/mapping/get', 
        header: {
          "Accept": "*/*" 
        },
        success: function (res) {
          //console.log(res.data.data)
          that.setData({
            listName: res.data.data,
            subject: options.sub,
            module: options.arg
          })
          //console.log(that.data.listName);
        }
      })
      }
    if(options.arg=='归纳总结'){
      wx.request({
        url: 'https://www.vaskka.com/mp/'+options.sub+'/summary/mapping/get',
        header: {
          "Accept": "*/*"
        },
        success: function (res) {
          //console.log(res.data.data)
          that.setData({
            listName: res.data.data,
            subject: options.sub,
            module: options.arg
          })
          //console.log(that.data.listName);
        }
      })
    }
    if(options.arg=='专题'){
      wx.request({
        url: 'https://www.vaskka.com/mp/'+options.sub+'/topic/mapping/get',
        header: {
          "Accept": "*/*"
        },
        success: function (res) {
          //console.log(res.data.data)
          that.setData({
            listName: res.data.data,
            subject: options.sub,
            module: options.arg
          })
          //console.log(that.data.listName);
        }
      })
    }
    if(options.arg=='答题模版'){
      wx.request({
        url: 'https://www.vaskka.com/mp/'+options.sub+'/template/mapping/get',
        header: {
          "Accept": "*/*"
        },
        success: function (res) {
          //console.log(res.data.data)
          that.setData({
            listName: res.data.data,
            subject: options.sub,
            module: options.arg
          })
          //console.log(that.data.listName);
        }
      })
    }
    if(options.arg=='需要留意'){
      var key = new Array();
      var key_index = new Array();
      var string;
      var that = this;
      var temp;
      var length = 0;
      var count = 0;
      wx.getStorageInfo({
        success: function(res) {
          key = res.keys;
          console.log(key);
          for (var i = 0; i < key.length; i++) {
            string = key[i].split('_');
            //console.log(string[0]+string[1])
            if(string[0]=="attention"&&string[1]=="english"){
              key_index[count] = i;
              count++;
            }
          }
          count = 0;
          console.log(key_index)
          console.log(key[key_index[2]])
          for(var i = 0;i<key_index.length;i++){
            wx.getStorage({
              key: key[key_index[i]],
              success: function(res) {
                console.log(res["data"]["title"])
                //console.log(typeof res["data"]["title"])
                that.data.listName[count]=res["data"]["title"]
                
                that.data.storage[count]=res["data"]
                count++;
              },
            })
          }
          
          that.setData({
            module:"需要留意"
          })
        },
      })
      
    }
  },
  toInnerList:function(event){
    var id = event.currentTarget.dataset.id;
    //console.log(this.data.module);
    wx.navigateTo({
      url: '../inner_list/inner_list?array=' + [this.data.subject, id,this.data.module],
    })
  }
})
