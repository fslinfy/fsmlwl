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
var khid = 0;
var callBackQuery = function (res, that) {
  var obj = res.data.rows;
  obj.forEach(function (item, index) {
    //item['cnote'] = item.cnote.split('&~~').join('\n');
    item['cnote'] = Api.field_decode(item.cnote);
    var gfdmx = item.gfdmx;

    gfdmx.forEach(function (item2, index2) {
      item2.jcsl = Api.slrenderer(item2.jcsl);
      item2.jczl = Api.slrenderer(item2.jczl);
    })
    item['gfdmx'] = gfdmx;
  });
  that.setData({
    lists: obj
  })
  wx.hideLoading();
};
var callBackkhmcQuery = function (res, that) {
  that.setData({
    khmclist: res.data.rows
  })
};
Page({
  data: {
    hidden: true,
    rq1: startdate,
    rq2: enddate,
    curkhid: getApp().globalData.current_khid,
    khmc: '',
    ckid:0 ,
    khid: 0,
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
        act: "cpgfdlist",
        loc: "cpgfdloc",
        kh:0,
        khid: that.data.khid,
        startdate: that.data.rq1,
        enddate: that.data.rq2,
        ckid: getApp().globalData.current_l_id
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
        act: "khmclist"
      }, callBackkhmcQuery
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
  
    khid = this.data.khid;
    this.setData({
      rq1:startdate,
      rq2: enddate
    });

    this.fetchData();
  },

  bindkhmcSelect: function (e) {
    var that = this;
    var list = that.data.khmclist;
//    var index = e.currentTarget.dataset.index;
    var obj = {};
    obj["selectTitle"] = "选择客户名称";
    obj["nameList"] = list;
    that.setData({
      selectType: "khmc"
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
      khmc: name,
      khid: id

    });
    select.hiddenSelectWindow(that);
  }
})


