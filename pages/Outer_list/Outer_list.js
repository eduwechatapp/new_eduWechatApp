Page({
  data:{
    listName:[
    ]
  },
  onLoad:function(options){
    console.log(options)
    if(options.arg=='知识点' && options.sub=='english'){
      this.setData({
        listName:[
          "必修一词汇表与重点语法",
          "必修二词汇表与重点语法",
          "必修三词汇表与重点语法",
          "必修四词汇表与重点语法",
          "必修五词汇表与重点语法",
          "选修六词汇表与重点语法",
          "选修七词汇表与重点语法",
          "选修八词汇表与重点语法",
          "选修九词汇表与重点语法",
          "选修十词汇表与重点语法",
          "选修十一词汇表与重点语法",
        ]
      })
      }
    else if (options.arg == '专题' && options.sub == 'english'){
        this.setData({
          listName:[
            "阅读理解",
            "语法",
            "写作指导"
          ]
        })
      }
    else if (options.arg == '归纳总结' && options.sub == 'english'){
      this.setData({
        listName:[
          "高考知识点",
          "高考核心单词"
        ]
      })
    }
    else if(options.arg == ''){
      
    }
  }
})
