var Api = require("../../utils/api.js");

var callBackQuery = function (res, that) {
  console.log('res=');
  console.log('res=', res.data.rows);
  that.setData({
    lists: res.data.rows,
    khid: wx.getStorageSync('current_khid')
  })
  wx.hideLoading();

//*********************************** */

  var obj = res.data.rows;
  var obj1 = res.data.rows;
  var menu = [];
  var m = '';
  var p = ''
  var tp;
  var result = [];
  var result1 = [];
  obj.forEach(function (item, index) {
    if (item.typename != tp) {
      tp = item.typename;
      result1.push({ "typename": tp });
    }
  })
  //console.log(result1);
  tp = '';
  result1.forEach(function (item, index) {

    result = [];
    obj1.forEach(function (item2, index2) {
      if (item.typename == item2.typename) {
        result.push(item2);
      }
    })
    m = { 'typename': item.typename, "users": result };
    menu.push(m)
  })
  that.setData({
    userslist: menu
  })
//******************************************** */
};
Page({
  data: {
    hidden: true,
    khsystem: false,
    khid: wx.getStorageSync('current_khid')
  },
  add: function () {
    if (!Api.checkTime()) return; 
    var url = 'edit/edit?khsystem=' + this.data.khsystem;
    wx.navigateTo({
      url: url
    });
  },
  edit: function (e) {
    if (!Api.checkTime()) return; 
    var that = this;
    var obj = e.currentTarget.dataset.obj;


    if (obj.id == undefined) return;
    
    var objstr = JSON.stringify(obj);
    
    var url = 'edit/edit?obj=' + objstr+'&khsystem='+that.data.khsystem;
    wx.navigateTo({
      url: url
    })
  },

  fetchData: function () {
    
    getApp().globalData.current_khid = wx.getStorageSync('current_khid');
    var that = this;
    console.log(getApp().globalData.current_lastdel, getApp().globalData.current_khsystem);
    if (getApp().globalData.current_khsystem==false) {
      if (getApp().globalData.current_lastdel < 1) {
        wx.showModal({
          showCancel: false,
          title: '注意',
          content: "没有此模块的管理权限！",
          success: function (res) {
            wx.navigateBack({
              delta: 2
            });
            return;
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
    
   
    Api.queryData(that,
      {
        act: "khuserslist",
        khid: wx.getStorageSync('current_khid')
      }, callBackQuery
    );


  },
  onShow: function () {
    Api.checkTime(0);
    var vm = this;
    vm.fetchData();
  },
  onLoad: function (options) {
    var vm = this;
    console.log('options.khsystyem', options.khsystem);
    if (options.khsystem){
      getApp().globalData.current_khsystem=true;
      vm.setData({
        systemlastdel:1,
        khsystem: getApp().globalData.current_khsystem
      })  
    }
    else
    {
      getApp().globalData.current_khsystem=false;
      vm.setData({
        systemlastdel: wx.getStorageSync('current_lastdel'),
        khsystem: getApp().globalData.current_khsystem
      })
    }
    
    
    vm.fetchData();
    
  }

})


