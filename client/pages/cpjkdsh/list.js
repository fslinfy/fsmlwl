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
    var jkdmx = item.jkdmx;

    jkdmx.forEach(function (item2, index2) {
      item2.jcsl = Api.slrenderer(item2.jcsl);
      item2.jczl = Api.slrenderer(item2.jczl);
    })
    item['jkdmx'] = jkdmx;
  });
  that.setData({
    lists: obj
  })
  wx.hideLoading();
};

Page({
  data: {
    hidden: true,
    lists:[],
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
  edit: function (e) {
    if (!Api.checkTime()) return;
    var that = this;
    var obj = e.currentTarget.dataset.obj;
    if (obj.id == undefined) return;

    var objstr = JSON.stringify(obj);
    var url = 'edit/edit?act=0&shbz=ywsh&obj=' + objstr;
    
    wx.navigateTo({
      url: url
    })
  },

  fetchData: function () {
    var that = this;
    wx.showLoading({
      title: 'loading...',
    })

    Api.queryData(this,
      {
        act: "cpjkdlist",
        loc: "cpjkdmsh",
        kh:0,
        khid:0,
        startdate:'',
        enddate:'',
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

  },
  hiddenBtn: function (e) {
    this.setData({
      hiddenBoolean: true
    })
  },
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
  }

})


