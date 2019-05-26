const app = getApp();

const Data = {
  subjectEnum: {
    '语文': 'chinese',
    '数学': 'math',
    '英语': 'english',
    '物理': 'physics',
    '化学': 'chemistry',
    '生物': 'biology',
    '政治': 'political',
    '历史': 'history',
    '地理': 'geography',
  },
};

Page({
  data: {
    listName: [],
    subject: '',
    module: '',
    storage: [],
    wxml_type: '',
  },

  Get(url) {
    return new Promise(resolve => wx.request({ url: `https://www.vaskka.com/mp${url}`, success: res => resolve(res.data) }));
  },

  async onLoad(options) {
    const subjectEngName = Data.subjectEnum[options.subjectName];
    const type = options.type;
    if (type === '知识点') {
      const response = await this.Get(`/${subjectEngName}/knowledge/mapping/get`);
      this.setData({
        listName: response.data,
      });
    }
    if (type === '归纳总结') {
      const response = await this.Get(`/${subjectEngName}/summary/mapping/get`);
      this.setData({
        listName: response.data,
      });
    }
    if (type === '专题') {
      const response = await this.Get(`/${subjectEngName}/topic/mapping/get`);
      this.setData({
        listName: response.data,
      });
    }
    if (type === '答题模版') {
      const response = await this.Get(`/${subjectEngName}/template/mapping/get`);
      this.setData({
        listName: response.data,
      });
    }
    if (type === '需要留意') {
      var key = new Array();
      var key_index = new Array();
      var string;
      var that = this;
      var length = 0;
      var count = 0;
      var temp_listName = new Array();
      var temp_storage = new Array();
      var storage_value;
      wx.getStorageInfo({
        success: function (res) {
          key = res.keys;
          //console.log(key);
          for (var i = 0; i < key.length; i++) {
            string = key[i].split('_');
            //console.log(string)
            if (string[0] == "attention" && string[1] == options.sub) {
              key_index[count] = i;
              count++;
            }
          }
          count = 0;
          console.log(key_index)
          console.log(key[key_index[2]])
          for (var i = 0; i < key_index.length; i++) {

            storage_value = wx.getStorageSync(key[key_index[i]])
            console.log(storage_value)
            temp_listName.push(storage_value["title"])
            temp_storage.push(storage_value)
          }
          that.setData({
            listName: temp_listName,
            storage: temp_storage,
            module: options.arg,
            subject: options.sub,
            wxml_type: "storage"
          })
        },
      })

    }
    if (type === '重点关注') {
      var key = new Array();
      var key_index = new Array();
      var string;
      var that = this;
      var length = 0;
      var count = 0;
      var temp_listName = new Array();
      var temp_storage = new Array();
      var storage_value;
      wx.getStorageInfo({
        success: function (res) {
          key = res.keys;
          //console.log(key);
          for (var i = 0; i < key.length; i++) {
            string = key[i].split('_');
            //console.log(string)
            if (string[0] == "focus" && string[1] == options.sub) {
              key_index[count] = i;
              count++;
            }
          }
          count = 0;
          console.log(key_index)
          console.log(key[key_index[2]])
          for (var i = 0; i < key_index.length; i++) {

            storage_value = wx.getStorageSync(key[key_index[i]])
            console.log(storage_value)
            temp_listName.push(storage_value["title"])
            temp_storage.push(storage_value)
          }
          that.setData({
            listName: temp_listName,
            storage: temp_storage,
            module: options.arg,
            subject: options.sub,
            wxml_type: "storage"
          })
        },
      })
    }
  },

  toInnerList(event) {
    var id = event.currentTarget.dataset.id;
    //console.log(this.data.module);
    if (this.data.module == "需要留意" || this.data.module == "重点关注") {
      console.log(event)
      wx.navigateTo({
        url: '../content/content?array=' + [this.data.subject, id, this.data.module],
      })
    }
    else {
      console.log(event)
      wx.navigateTo({
        url: '../inner_list/inner_list?array=' + [this.data.subject, id, this.data.module],
      })
    }
  },
});
