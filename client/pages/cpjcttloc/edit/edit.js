var Api = require("../../../utils/api.js");
var fun_base64 = require('../../../utils/base64.js')
var utils = require('../../../utils/util');

var callBackQuery = function (res, that) {
  var obj = res.data.rows;
  var sumsl=0;
  var sumzl=0;
  obj.forEach(function (item, index) {
    sumsl = sumsl + Number(item.jcsl);
    sumzl = sumzl + Number(item.jczl); 
      item.jcsl = Api.slrenderer(item.jcsl);
      item.jczl = Api.slrenderer(item.jczl);
    
  });
  that.setData({
    lists: obj,
    sumsl:sumsl,
    sumzl:sumzl.toFixed(3)
  })
  wx.hideLoading();
};
Page({
  data: {
    hidden: true,

    sumsl:0,
    sumzl:0,
    
    hiddenBoolean: true,
    options: { hiddenSelectWindow: true },
    datedata: { calendarHidden: true }
  },
  onLoad: function (options) {
  
    var that = this;
    wx.showLoading({
      title: 'loading...',
    })
  
    wx.setNavigationBarTitle({
      title: options.khmc
    })
    that.setData({
      year: options.year,
      month: options.month,
      day: options.day,
      khid: options.khid,
      khmc: options.khmc
    });
    Api.queryData(this,
      {
        act: "cpjcttloc",
        loc: 'cpwz',
        khid: options.khid,
        year: that.data.year,
        month: that.data.month,
        day: that.data.day,
        ckid: getApp().globalData.current_l_id
      }, callBackQuery
    );
  }
})


