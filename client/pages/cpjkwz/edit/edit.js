var Api = require("../../../utils/api.js");
var fun_base64 = require('../../../utils/base64.js')
var utils = require('../../../utils/util');

var callBackQuery = function (res, that) {
  var obj = res.data.rows;
  var sumsl=0;
  var sumzl=0;
  obj.forEach(function (item, index) {
      item.jcsl = Api.slrenderer(item.jcsl);
      item.jczl = Api.slrenderer(item.jczl);
    sumsl = sumsl + item.jcsl;
    sumzl = sumzl + item.jczl; 
  });
  that.setData({
    lists: obj,
    sumsl:sumsl,
    sumzl:sumzl
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
    //var obj = options.obj;
    wx.setNavigationBarTitle({
      title: options.khjc
    })
    that.setData({
      rq1: options.rq1,
      rq2: options.rq2,
      khid: options.khid,
      khmc: options.khjc
    });
    Api.queryData(this,
      {
        act: "cpjkdwz",
        loc: "cpjkdwzmx",
        khid: options.khid,
        khmc: options.khmc,
        startdate: options.rq1,
        enddate: options.rq2,
        ckid: getApp().globalData.current_l_id
      }, callBackQuery
    );
  }
})


