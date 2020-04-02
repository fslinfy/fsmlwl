var Api = require("../../utils/api.js");
var fun_base64 = require('../../utils/base64.js')
var utils = require('../../utils/util');

var select = require("../../utils/selectName.js");

var timestamp = Date.parse(new Date()) / 1000;
//加一天的时间：  
var n_to = 1000 * (timestamp - 24 * 60 * 60 * 7);
var startdate = ((new Date(n_to)).toISOString()).substring(0, 10);
var enddate = ((new Date()).toISOString()).substring(0, 10);
var khid = 0;
var callBackQuery = function (res, that) {
  var obj = res.data.rows;
  var datamsg =" 没有单据待审核！";
  obj.forEach(function (item, index) {
    datamsg='';
    item['cnote'] = Api.field_decode(item.cnote);
    var ckdmx = item.ckdmx;

    ckdmx.forEach(function (item2, index2) {
      item2.jcsl = Api.slrenderer(item2.jcsl);
      item2.jczl = Api.slrenderer(item2.jczl);
    })
    item['ckdmx'] = ckdmx;
  });
  that.setData({
    lists: obj,datamsg:datamsg
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
    hidden: true, datamsg: '',
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
        act: "cpckdlist",
        loc: "cpckdcksh",
        kh:0,
        khid: that.data.khid,
        startdate:null,
        enddate:null,
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

  edit: function (e) {
    if (!Api.checkTime()) return;
    var that = this;
    var obj = e.currentTarget.dataset.obj;
    if (obj.id == undefined) return;
    var objstr = JSON.stringify(obj);
    var url = '../cpckdywsh/edit/edit?act=0&shbz=cksh&obj=' + objstr;

    wx.navigateTo({
      url: url
    })
  },

  
  hiddenBtn: function (e) {
    this.setData({
      hiddenBoolean: true
    })
  },
  evaSubmit: function (e) {

   if(! Api.checkTime()) return; 
    Api.saveFormId(e.detail.formId, wx.getStorageSync('current_openid'));
    khid = this.data.khid;
    this.fetchData();
  },

  bindkhmcSelect: function (e) {
    var that = this;
    var list = that.data.khmclist;
    //var index = e.currentTarget.dataset.index;
   
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
    this.fetchData();
  }
})


