var Api = require("../../utils/api.js");
var fun_base64 = require('../../utils/base64.js')
var utils = require('../../utils/util');
var calendar = require("../../utils/calendar.js");

var timestamp = Date.parse(new Date()) / 1000;
//加一天的时间：  
var n_to = 1000 * (timestamp - 24 * 60 * 60 * 7);
var startdate = ((new Date(n_to)).toISOString()).substring(0, 10);
var enddate = ((new Date()).toISOString()).substring(0, 10);
var khid = 0;
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
    rq1: startdate,
    rq2: enddate,
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
        act: "cpjkdwz",
        loc: "cpjkdwz",
        khid:0,
        startdate: that.data.rq1,
        enddate: that.data.rq2,
        ckid: getApp().globalData.current_l_id
      }, callBackQuery
    );
  },
  edit: function (e) {
    
    if (!Api.checkTime()) return;
    var that = this;
    var obj = e.currentTarget.dataset.obj;
    
    //if (obj.id == undefined) return;

    var objstr = JSON.stringify(obj);
    var url = 'edit/edit?khid='+obj.khid+'&khjc='+obj.khjc  + "&rq1=" + e.currentTarget.dataset.rq1 + "&rq2=" + e.currentTarget.dataset.rq2;
    wx.navigateTo({
      url: url
    })
  },
  onShow: function () {
    Api.checkTime(); 
    var vm = this;
    vm.fetchData();
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
    var vm = this;
    var obj = vm.data.datedata;
    obj["calendarHidden"] = true;
    if (vm.data.selectdate == 1) {
      vm.setData({
        rq1: e.currentTarget.dataset.date.value,
        datedata: obj
      });

    }
    else {
      vm.setData({
        rq2: e.currentTarget.dataset.date.value,
        datedata: obj
      });
    }
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
   if(! Api.checkTime()) return; 
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
        this.setData({
          rq1:startdate,
          rq2: enddate
        });
    this.fetchData();
  }
})


