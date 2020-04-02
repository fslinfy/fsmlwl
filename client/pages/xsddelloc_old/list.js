var Api = require("../../utils/api.js");
var fun_base64 = require('../../utils/base64.js')
var utils = require('../../utils/util');
var calendar = require("../../utils/calendar.js");
var select = require("../../utils/selectName.js");

var timestamp = Date.parse(new Date()) / 1000;
//加一天的时间：  
var n_to = 1000 * (timestamp - 24 * 60 * 60 * 7);
var startdate = ((new Date(n_to)).toISOString()).substring(0, 10);
var enddate = ((new Date()).toISOString()).substring(0, 10);
var ckid = 0;
var callBackQuery = function (res, that) {
  var obj = res.data.rows;
  obj.forEach(function (item, index) {
   // item['cnote'] = item.cnote.split('&~~').join('\n');
    item['cnote'] = Api.field_decode(item.cnote);
//    item['sfr'] = Api.field_decode(item.sfr);
  //  item['cphm'] = Api.field_decode(item.cphm);
    var xsdmx = item.xsdmx;

    xsdmx.forEach(function (item2, index2) {
      item2.xssl = Api.slrenderer(item2.xssl);
      item2.xszl = Api.slrenderer(item2.xszl);
    })
    item['xsdmx'] = xsdmx;
  });
  that.setData({
    lists: obj
  })
  wx.hideLoading();
};
var callBackckmcQuery = function (res, that) {
  that.setData({
    ckmclist: res.data.rows
  })
};
Page({
  data: {
    hidden: true,
    rq1: startdate,
    rq2: enddate,
    ckmc: '',
    ckid: 0,
    hiddenBoolean: true,
    options: { hiddenSelectWindow: true },
    datedata: { calendarHidden: true }
  },

  fetchData: function () {
    var that = this;
    wx.showLoading({
      title: 'loading...',
    })
    Api.queryData(this,
      {
        act: "cpxsdlist",
        loc: "cpxsddelloc",
        ckid: that.data.ckid,
        startdate:startdate,
        enddate:enddate,
        khid: getApp().globalData.current_khid
      }, callBackQuery
    );
  },
  onShow: function () {
    Api.checkTime(); 
    var vm = this;
    vm.fetchData();
  },
  onLoad: function () {
    var vm = this;

    Api.queryData(this,
      {
        act: "ckmclist"
      }, callBackckmcQuery
    );
  },
  hiddenBtn: function (e) {
    this.setData({
      hiddenBoolean: true
    })
  },
  bindDateChange: function (e) {
    this.setData({
      selectdate: 1
    });
    calendar.init(this, 1);
  },
  bindDateChange1: function (e) {
    this.setData({
      selectdate: 2
    });
    calendar.init(this, 1);
  },

  //******  get date option   ************************ */
  preMonth: function () {
    calendar.preMonth();
  },
  nextMonth: function () {
    calendar.nextMonth();
  },
  selectDate: function (e) {
    calendar.selectDate(e, this);
  },
  CancelSelect: function (e) {
    var vm = this;
    var obj = vm.data.datedata;
    obj["calendarHidden"] = true;
    vm.setData({
      datedata: obj
    });
  },
  //******  get date option            end  ************************ */
  evaSubmit: function (e) {
    if (!Api.checkTime()) return; 
    Api.saveFormId(e.detail.formId, wx.getStorageSync('current_openid'));
   var d = e.detail.value.rq1;
    startdate =new Date(Date.parse(d.replace(/-/g, "/")));
    var timestamp = Date.parse(startdate) / 1000;
    var n_to = 1000 * (timestamp + 24 * 60 * 60 );
        startdate = ((new Date(n_to)).toISOString()).substring(0, 10);
         d = e.detail.value.rq2;
        enddate = new Date(Date.parse(d.replace(/-/g, "/")));
        timestamp = Date.parse(enddate) / 1000;
        n_to = 1000 * (timestamp + 24 * 60 * 60);
        enddate = ((new Date(n_to)).toISOString()).substring(0, 10);
   
    ckid = this.data.ckid;
    this.setData({
      rq1:startdate,
      rq2: enddate
    });

    this.fetchData();
  },

  bindckmcSelect: function (e) {
    var that = this;
    var list = that.data.ckmclist;
//    var index = e.currentTarget.dataset.index;
    var obj = {};
    obj["selectTitle"] = "选择仓库";
    obj["nameList"] = list;
    that.setData({
      selectType: "ckmc"
    });
    select.showSelectWindow(that, obj, false);
  },
  selectCancelBtn: function (e) {
    select.hiddenSelectWindow(this);

  },
  selectBtn: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var name = select.check(e, that);
    if (name == "true") return;
    var selecttype = that.data.selectType;
    var obj = that.data.obj;
    that.setData({
      ckmc: name,
      ckid: id

    });
    select.hiddenSelectWindow(that);
  }
})


