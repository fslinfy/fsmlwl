var Api = require("../../utils/api.js");
var fun_base64 = require('../../utils/base64.js')
var utils = require('../../utils/util');

var select = require("../../utils/selectName.js");

var timestamp = Date.parse(new Date()) / 1000;
//加一天的时间：  
var n_to = 1000 * (timestamp - 24 * 60 * 60 * 7);
var startdate = ((new Date(n_to)).toISOString()).substring(0, 10);
var enddate = ((new Date()).toISOString()).substring(0, 10);
var today=new Date();


var year=today.getFullYear();
var month = today.getMonth()+1;
var day='';



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
    year:year,
    month:month,
    day:day,
    cpwz:0,
    hiddenBoolean: true,
    options: { hiddenSelectWindow: true },
    datedata: { calendarHidden: true }
  },
  fetchData: function () {
    var that = this;
    wx.showLoading({
      title: 'loading...',
    })
    var wzbz='khwz';
    if (that.data.cpwz)
    {
      wzbz = 'cpwz';
    }

    Api.queryData(this,
      {
        act: "cpjcttloc",
        loc: wzbz,
        khid:0,
        year: that.data.year,
        month: that.data.month,
        day: that.data.day,
        ckid: getApp().globalData.current_l_id
      }, callBackQuery
    );
  },
  edit: function (e) {
    
    if (!Api.checkTime()) return;
    var that = this;
    if (that.data.cpwz) return;
    var obj = e.currentTarget.dataset.obj;
    var objstr = JSON.stringify(obj);
    var url = 'edit/edit?khid=' + obj.id + '&khmc=' + obj.mc + "&year=" + e.currentTarget.dataset.year + "&month=" + e.currentTarget.dataset.month + "&day=" + e.currentTarget.dataset.day;
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
  selectcpwzBtn: function (e) {
    this.setData({
      cpwz:!this.data.cpwz
    })
  },
  evaSubmit: function (e) {
   if(! Api.checkTime()) return; 
    if (e.detail.value.year==''){
      wx.showModal({
        showCancel: false,
        title: '注意',
        content: "请输入统计年度！",
        success: function (res) {
            return;
        }
      })
      return ;
    }

    Api.saveFormId(e.detail.formId, wx.getStorageSync('current_openid'));
    this.setData({
      year: e.detail.value.year,
      day: e.detail.value.day
    })
    

    this.fetchData();
  },


  bindmonthSelect: function (e) {
    var that = this;
    var list = [{ 'Id': '', Name: '' }, { 'Id': '01', Name: '01' }, { 'Id': '02', Name: '02' }, { 'Id': '03', Name: '03' }
      , { 'Id': '04', Name: '04' }, { 'Id': '05', Name: '05' }, { 'Id': '06', Name: '06' }, { 'Id': '07', Name: '07' }, { 'Id': '08', Name: '08' }, { 'Id': '09', Name: '09' }, { 'Id': '10', Name: '10' }, { 'Id': '11', Name: '11' }, { 'Id': '12', Name: '12' }] ;
    //var index = e.currentTarget.dataset.index;
    var obj = {};
    obj["selectTitle"] = "选择月份";
    obj["nameList"] = list;
    that.setData({
      selectType: "month",
      
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
      
      month: id

    });
    select.hiddenSelectWindow(that);
    
  }



})


