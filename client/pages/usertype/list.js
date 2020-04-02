var Api = require("../../utils/api.js");

var callBackQuery = function (res, that) {
  that.setData({
    lists: res.data.rows,
    khid: wx.getStorageSync('current_khid')
  })
  wx.hideLoading();
};
Page({
  data: {
    hidden: true,
    khsystem: false,
    khid: wx.getStorageSync('current_khid')
  },
  add: function () {
    if (!Api.checkTime()) return;
    var url = 'edit/edit';
    wx.navigateTo({
      url: url
    });
  },
  edit: function (e) {
    if (!Api.checkTime()) return;
    var that = this;
    var obj = e.currentTarget.dataset.obj;


    //  if (obj.id == undefined) return;

    var objstr = JSON.stringify(obj);

    var url = 'edit/edit?obj=' + objstr;
    wx.navigateTo({
      url: url
    })
  },
  onShareAppMessage: function () {
    
    return {
      title: '微信小程序联盟',
      desc: '最具人气的小程序开发联盟!',
      path: 'pages/test/index'
    }
  },
  fetchData: function () {

    getApp().globalData.current_khid = wx.getStorageSync('current_khid');
    var that = this;
    if (getApp().globalData.current_khsystem == false) {
      if (getApp().globalData.current_lastdel < 1) {
        wx.showModal({
          showCancel: false,
          title: '注意',
          content: "没有此模块的管理权限！",
          success: function (res) {
            wx.navigateBack({
              delta: 2
            });
          }
        })
        return;
      }
    } else {
      getApp().globalData.current_khid = wx.getStorageSync('current_khid');
    }
    wx.showLoading({
      title: 'loading...',
    })
    var that = this;

    Api.queryData(this,
      {
        act: "usertypelist",
        khid: wx.getStorageSync('current_khid')
      }, callBackQuery
    );


  },
  onShow: function () {
    Api.checkTime(0);
    var vm = this;
    vm.fetchData();
  },
  onLoad: function () {
    var vm = this;
    vm.fetchData();
    wx.showShareMenu({
      withShareTicket: true
    });
  }
})


