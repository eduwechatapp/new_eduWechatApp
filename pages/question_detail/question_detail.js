import WxParse from '../../wxParse/wxParse';
Page({
  data:{
    detailInfo:{
      "yiji": "集合与常用逻辑用语",
      "erji": "集合与常用逻辑用语",
      "content": " <p>已知集合<img src=\"https://tiku.21cnjy.com/tikupic/7f/d5/7fad5f1345383cc451bfc9c5512187b6.png\" style=\"vertical-align:middle;\">，则  （ ）</p>", 
      "answer": "<p>B</p>", 
      "type": "单选题", 
      "analysis": {
        "q_analysis":"<p>由<img src=\"https://tiku.21cnjy.com/tikupic/28/d6/28dd6d3f542756dacc079bcf4e6506ad.png\"     style=\"vertical-align:middle;\"> ，所以集合<img src=\"https://tiku.21cnjy.com/tikupic/1f/c9/1fac903ec4b76119b786fd75fc9da3a3.png\" style=\"vertical-align:middle;\"> ，所以A∩B≠<img src=\"https://tiku.21cnjy.com/tikupic/36/be/36abe9afe2bb5c0a8c760b7af837d537.png\" style=\"vertical-align:middle;\"> <br>A∪B=R，故B正确，故选B",
      "exampoint":"本题考查集合的交集，并集的运算，集合与集合的关系<br>",
      "comment":"<p>解决本题的关键是解一元二次不等式，求出集合A</p>",
      },
      "choose":
        ["<p>A．A∩B=Æ</p>",
        "<p>B．A∪B=R</p>",
        "<p>C．B⊆A </p>",
        "<p>D．A⊆B</p>"],
      "answer_index": [1]
    }
  },
  onLoad:function(options){
    var that = this;
    WxParse.wxParse('content','html',that.data.detailInfo.content,that)
    var length = that.data.detailInfo.choose.length
    for (let i = 0; i < length;i++){
      WxParse.wxParse('choose'+i,'html',that.data.detailInfo.choose[i],that)
      if (i === length - 1) {
        WxParse.wxParseTemArray("choose", 'choose', length, that)
      }
    }
    WxParse.wxParse('exampoint','html',that.data.detailInfo.analysis.exampoint,that)
    WxParse.wxParse('analysis','html',that.data.detailInfo.analysis.q_analysis,that)
    WxParse.wxParse('answer','html',that.data.detailInfo.answer,that)
    WxParse.wxParse('comment', 'html', that.data.detailInfo.analysis.comment, that)
  }
})