Page({
  data: {
    listName: '',
    subject: '',
    module: '',
    storage: [],

  },
  onLoad: function (options) {
    //console.log(options)
    var that = this;
   
    if (options.arg == '需要留意') {
      var key = new Array();
      var key_index = new Array();
      var string;
      var that = this;
      var res_temp;
      var res_temp_s;
      var length = 0;
      var count = 0;
      var temp_listName = new Array();
      var temp_storage = new Array();
      var storage_value;
      wx.getStorageInfo({
        success: function (res) {
          key = res.keys;
          console.log(key);
          for (var i = 0; i < key.length; i++) {
            string = key[i].split('_');
            //console.log(string[0]+string[1])
            if (string[0] == "attention" && string[1] == "english") {
              key_index[count] = i;
              count++;
            }
          }
          count = 0;
          console.log(key_index)
          console.log(key[key_index[2]])
          for (var i = 0; i < key_index.length; i++) {
            /*wx.getStorageSync({
              key: key[key_index[i]],
              success: function (res) {
                console.log(res)
                res_temp = res["data"]["title"]
                res_temp_s = res["data"]
                console.log(res_temp)
              },
            })*/
            storage_value = wx.getStorageSync(key[key_index[i]])
            console.log(storage_value)
            temp_listName.push(storage_value["title"])
            temp_storage.push(storage_value)
            //count++;
          }

          var array_test = new Array();
          array_test.push("必修一")
          array_test.push("必修二")
          console.log(temp_listName)
          console.log(array_test)
          console.log(temp_storage)
          that.setData({
            listName: temp_listName,
            storage:temp_storage,
            module: "需要留意"
          })
        },
      })

    }
  },
  toInnerList: function (event) {
    var id = event.currentTarget.dataset.id;
    //console.log(this.data.module);
    wx.navigateTo({
      url: '../inner_list/inner_list?array=' + [this.data.subject, id, this.data.module],
    })
  }
})
