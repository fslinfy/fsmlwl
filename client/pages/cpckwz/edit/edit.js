var Api = require("../../../utils/api.js");
var fun_base64 = require('../../../utils/base64.js')
var utils = require('../../../utils/util');

var callBackQuery = function (res, that) {
  var obj = res.data.rows;
  var sumsl=0;
  var sumzl=0;
  obj.forEach(function (item, index) {
      item.ccsl = Api.slrenderer(item.ccsl);
      item.cczl = Api.slrenderer(item.cczl);
    sumsl = sumsl + Number( item.ccsl);
    sumzl = sumzl + Number(item.cczl); 
  });
  that.setData({
    lists: obj,
    sumsl: Api.slrenderer(sumsl),
      sumzl: Api.slrenderer(sumzl)
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
      rq1: options.startdate,
      rq2: options.enddate,
      khid: options.khid,
      khmc: options.khjc
    });
    Api.queryData(this,
      {
        act: "cpckdwz",
        loc: "cpckdwzmx",
        khid: options.khid,
        khmc: options.khmc,
        startdate: options.startdate,
        enddate: options.enddate,
        ckid: getApp().globalData.current_l_id
      }, callBackQuery
    );
  }
})


