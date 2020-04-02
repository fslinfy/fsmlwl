var fun_base64 = require('../../utils/base64.js')
var utils = require('../../utils/util');
//var calendar = require("../../utils/calendar.js");
var Api = require("../../utils/api.js");
var select = require("../../utils/selectName.js");

var callBackQuery = function(res, that) {
  var cpkc = res.data.cpkc;
  var khmclist = new Array();
  var khidstr = ","
  cpkc.forEach(function(item1, index1) {
    item1.forEach(function(item2, index2) {
      item2.sl = Api.slrenderer(item2.sl);
      item2.zl = Api.slrenderer(item2.zl);
      item2.kdsl = Api.slrenderer(item2.kdsl);
      item2.kdzl = Api.slrenderer(item2.kdzl);
      item2.kcsl = Api.slrenderer(item2.kcsl);
      item2.kczl = Api.slrenderer(item2.kczl);
      if (khidstr.indexOf(item2.khid) < 1) {
        var o = {
          'Id': item2.khid,
          'Name': item2.khmc
        };
        khmclist.push(o);
        khidstr = khidstr + "," + item2.khid;
      }
    })
  })
  that.setData({
    menus: res.data.ck,
    cpkc: cpkc,
    cpkc0: cpkc,
    curkhid: getApp().globalData.current_khid,
    curckid: getApp().globalData.current_l_id,
    activeBar: false,
    hiddenBoolean: true,
    options: {
      hiddenSelectWindow: true
    },
    datedata: {
      calendarHidden: true
    }
  })

  that.topBarInit();
  wx.hideLoading();
  if (!that.data.khmclist) {
    if (getApp().globalData.current_khid == 0) {
      that.setData({
        khmclist: khmclist
      })
    }
  }


};
var callBackkhmcQuery = function(res, that) {
  // that.setData({
  //    khmclist: res.data.rows
  // })
};
Page({
  data: {
    activeTabIndex: 0,
    activeBarIndex: 0,
    sumkcsl: 0,
    sumkczl: 0,
    search: '',
    khid: getApp().globalData.current_khid,
    ckid: getApp().globalData.current_l_id,
    curkhid: getApp().globalData.current_khid,
    curckid: getApp().globalData.current_l_id,
    activeBar: true,
    hidden: true,
    options: {
      hiddenSelectWindow: true
    },
    datedata: {
      calendarHidden: true
    }
  },
  onLoad: function() {


 
    this.setData({
      userlogin: getApp().globalData.userlogin
    })
    if (getApp().globalData.current_khid) {
      this.setData({
        khid: getApp().globalData.current_khid
      })
    }

    if (!getApp().globalData.userlogin) {
      return;
    }
    var vm = this;



  },

  add: function() {
    var that = this;
    var tid = that.data.curleftNav;

    var name = that.data.tabName;
    var url = 'edit/edit?CT_id=' + that.data.tabId + "&CT_name=" + name;
    wx.navigateTo({
      url: url
    });
  },
  evaSubmit: function(e) {
    if (!Api.checkTime()) return;
    Api.saveFormId(e.detail.formId, wx.getStorageSync('current_openid'));

    this.fetchData();
  },


  bindfilter: function(e) {
    var that = this;
    var s = e.detail.value;

    var cpkc0 = that.data.cpkc0;

    var newlist = [];
    var sumsl = 0;
    var sumzl = 0;
    var cpkc = [];
    cpkc0.forEach(function(item1, index1) {
      newlist = [];
      sumsl = 0;
      sumzl = 0;
      item1.forEach(function(item2, index2) {
        if (((item2.cpmc).indexOf(s) > -1) || ((item2.cdmc).indexOf(s) > -1) || ((item2.bzmc).indexOf(s) > -1) || ((item2.cpph).indexOf(s) > -1)) {
          item2.sl = Api.slrenderer(item2.sl);
          item2.zl = Api.slrenderer(item2.zl);
          item2.kdsl = Api.slrenderer(item2.kdsl);
          item2.kdzl = Api.slrenderer(item2.kdzl);
          item2.kcsl = Api.slrenderer(item2.kcsl);
          item2.kczl = Api.slrenderer(item2.kczl);
          sumsl = sumsl + parseFloat(item2.kcsl);
          sumzl = sumzl + parseFloat(item2.kczl);
          newlist.push(item2);
        }
      })
      cpkc.push(newlist);

      if (index1 == that.data.activeBarIndex) {
        that.setData({
          sumkcsl: Api.slrenderer(sumsl),
          sumkczl: Api.slrenderer(sumzl)
        })
      }

    })

    that.setData({
      cpkc: cpkc
    })


  },
  edit: function(e) {
    var that = this;
    var obj = e.currentTarget.dataset.obj;
    if (obj.S_id == undefined) return;
    var objstr = JSON.stringify(obj);
    var url = 'edit/edit?obj=' + objstr
    wx.navigateTo({
      url: url
    })
  },
  fetchData: function() {
    //if (!getApp().globalData.userlogin) return;

    wx.showLoading({
      title: 'loading...',
    })

    var that = this;
    Api.queryData(this, {
      act: "cpkcmenulist",
      khid: that.data.khid,
      ckid: getApp().globalData.current_l_id,
      active: 1
    }, callBackQuery);
  },




  onShow: function() {

    Api.checkTime();
    this.setData({
      userlogin: getApp().globalData.userlogin
    })


    if (!getApp().globalData.userlogin) {
      wx.navigateTo({
        url: "../index/index"
      })
      return;
    }

    this.fetchData();
  },

  topBarInit: function() {

    var vm = this;
    var obj = vm.data.topBarMenu;

    if (obj) {
      obj["menus"] = vm.data.menus;

      vm.setData({
        topBarMenu: obj
      });
    } else {
      obj = {};
      obj["activeBarIndex"] = 0;
      obj["menus"] = vm.data.menus;
      var span = wx.getSystemInfoSync().windowWidth / vm.data.menus.length + 'px';
      obj["itemWidth"] = vm.data.menus.length <= 5 ? span : '160rpx',
        vm.setData({
          activeBarIndex: 0,
          barMenu: "",
          topBarMenu: obj
        });

    }
    var res = vm.data.menus;
    var k = res[0];
    vm.setData({
      sumkcsl: k.sumkcsl,
      sumkczl: k.sumkczl

    });



  },

  changeTopBar: function(e) {
    Api.checkTime();
    var vm = this;
    var index = e.currentTarget.dataset.index;
    var obj = vm.data.topBarMenu;
    obj["activeBarIndex"] = index;
    var res = vm.data.menus;
    var k = res[index];
    vm.setData({
      activeBarIndex: index,
      barMenu: e.currentTarget.dataset.menu,
      activeTabIndex: 0,
      cpkc: vm.data.cpkc0,
      sumkcsl: k.sumkcsl,
      sumkczl: k.sumkczl,
      search: '',
      topBarMenu: obj
    });
  },


  bindkhmcSelect: function(e) {

    var that = this;
    var list = that.data.khmclist;



    var obj = {};
    obj["selectTitle"] = "选择客户名称";
    obj["nameList"] = list;
    that.setData({
      selectType: "khmc"
    });
    //console.log(obj);
    select.showSelectWindow(that, obj, false);

  },
  selectCancelBtn: function(e) {
    select.hiddenSelectWindow(this);

  },
  selectBtn: function(e) {
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