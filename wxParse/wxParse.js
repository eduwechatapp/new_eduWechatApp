/**
 * author: Di (微信小程序开发工程师)
 * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)
 *               垂直微信小程序开发交流社区
 * 
 * github地址: https://github.com/icindy/wxParse
 * 
 * for: 微信小程序富文本解析
 * detail : http://weappdev.com/t/wxparse-alpha0-1-html-markdown/184
 */

/**
 * utils函数引入
 **/
import showdown from './showdown.js';
import HtmlToJson from './html2json.js';
/**
 * 配置及公有属性
 **/
var realWindowWidth = 0;
var realWindowHeight = 0;
wx.getSystemInfo({
  success: function (res) {
    realWindowWidth = res.windowWidth
    realWindowHeight = res.windowHeight
  }
});

/**
 * 主函数入口区
 **/
function wxParse(bindName, type, data, target, imagePadding) {
  const page = target;
  let transData = {}; // 存放转化后的数据
  if (type === 'html') {
    transData = HtmlToJson.html2json(data, bindName);
  } else if (type === 'md' || type === 'markdown') {
    const converter = new showdown.Converter();
    const html = converter.makeHtml(data);
    transData = HtmlToJson.html2json(html, bindName);
  }
  transData.view = {};
  transData.view.imagePadding = 0;
  if (typeof (imagePadding) !== 'undefined') {
    transData.view.imagePadding = imagePadding;
  }
  const bindData = {};
  bindData[bindName] = transData;
  that.setData(bindData)
  that.wxParseImgLoad = wxParseImgLoad;
  that.wxParseImgTap = wxParseImgTap;
}

function wxParseArr(bindName, type, data, target, imagePadding) {
  const page = target;
  let transData = {}; // 存放转化后的数据
  if (type === 'html') {
    transData = HtmlToJson.html2json(data, bindName);
  } else if (type === 'md' || type === 'markdown') {
    const converter = new showdown.Converter();
    const html = converter.makeHtml(data);
    transData = HtmlToJson.html2json(html, bindName);
  }
  transData.view = {};
  transData.view.imagePadding = 0;
  if (typeof (imagePadding) !== 'undefined') {
    transData.view.imagePadding = imagePadding;
  }
  const bindData = {};
  bindData[bindName] = transData;
  that.setData(bindData)
  that.wxParseImgLoad = wxParseImgLoad;
  that.wxParseImgTap = wxParseImgTap;
}


// 图片点击事件
function wxParseImgTap(e) {
  var that = this;
  var nowImgUrl = e.target.dataset.src;
  var tagFrom = e.target.dataset.from;
  if (typeof (tagFrom) != 'undefined' && tagFrom.length > 0) {
    wx.previewImage({
      current: nowImgUrl, // 当前显示图片的http链接
      urls: that.data[tagFrom].imageUrls // 需要预览的图片http链接列表
    })
  }
}

/**
 * 图片视觉宽高计算函数
 **/
function wxParseImgLoad(e) {
  const tagFrom = e.target.dataset.from;
  const idx = e.target.dataset.idx;
  if (typeof (tagFrom) !== 'undefined' && tagFrom.length > 0) {
    calMoreImageInfo(e, idx, this, tagFrom)
  }
}

// 获取计算图片视觉最佳宽高
function calMoreImageInfo(e, idx, page, bindName) {
  const temData = page.data[bindName];
  if (!temData || temData.images.length === 0) {
    return;
  }
  const temImages = temData.images;
  // var recal = wxAutoImageCal(e.detail.width, e.detail.height,that,bindName); 
  const recal = { imageWidth: e.detail.width, imageheight: e.detail.height };
  const index = temImages[idx].index;
  let key = `${bindName}`;
  for (const i of index.split('.')) {
    key += `.nodes[${i}]`;
  }
  const keyW = key + '.width';
  const keyH = key + '.height';
  const options = {
    [keyW]: recal.imageWidth,
    [keyH]: recal.imageheight,
  };
  console.log(options);
  page.setData(options);
}

// 计算视觉优先的图片宽高
function wxAutoImageCal(originalWidth, originalHeight, that, bindName) {
  //获取图片的原始长宽
  var windowWidth = 0, windowHeight = 0;
  var autoWidth = 0, autoHeight = 0;
  var results = {};
  var padding = that.data[bindName].view.imagePadding;
  windowWidth = realWindowWidth - 2 * padding;
  windowHeight = realWindowHeight;
  //判断按照那种方式进行缩放
  // console.log("windowWidth" + windowWidth);
  if (originalWidth > windowWidth) {//在图片width大于手机屏幕width时候
    autoWidth = windowWidth;
    // console.log("autoWidth" + autoWidth);
    autoHeight = (autoWidth * originalHeight) / originalWidth;
    // console.log("autoHeight" + autoHeight);
    results.imageWidth = autoWidth;
    results.imageheight = autoHeight;
  } else {//否则展示原来的数据
    results.imageWidth = originalWidth;
    results.imageheight = originalHeight;
  }
  return results;
}

function wxParseTemArray(temArrayName, bindNameReg, total, that) {
  const array = [];
  const temData = that.data;
  const obj = null;
  for (let i = 0; i < total; i++) {
    const simArr = temData[bindNameReg + i].nodes;
    array.push(simArr);
  }
  that.setData({
    [temArrayName]: array,
  });
}

/**
 * 配置emojis
 * 
 */

function emojisInit(reg = '', baseSrc = "/wxParse/emojis/", emojis) {
  HtmlToJson.emojisInit(reg, baseSrc, emojis);
}

module.exports = {
  wxParse: wxParse,
  wxParseTemArray: wxParseTemArray,
  emojisInit: emojisInit
}


