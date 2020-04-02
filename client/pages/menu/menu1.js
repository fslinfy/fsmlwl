var Api = require("../../utils/api.js");
Page({
  data: {
    curNav: 1,
    curIndex: 0,
    menu: [],
    submenu: [
      [{
          Name: "登出",
          Page: "../index/index"
        },
        {
          Name: "用户登录日志",
          Page: "../logs/list"
        },
        {
          Name: "操作员资料管理",
          Page: "../khusers/list"
        }
        /*,
        {
          Name: "过车通知单申请",
          Page: "../wxgfdgl/edit"
        }
        ,
        {
          Name: "过车通知单审核",
          Page: "../wxgfdsh/list"
        }
        ,
        {
          Name: "过车通知单查询",
          Page: "../wxgfdloc/list"
        }
        ,
        {
          Name: "test",
          Page: "../cpckdgl/edit"
        }
        ,
        {
          Name: "过户通知单申请",
          Page: "../wxghdgl/list"
        }
        ,
        {
          Name: "过户通知单审核",
          Page: "../wxghdsh/list"
        }
        ,
        {
          Name: "过户通知单查询",
          Page: "../wxghdloc/list"
        }*/
          
      ]
    ],
    ckmenu: [
      [{
          Name: "登出",
          Page: "../index/index"
        },
        {
          Name: "用户登录日志",
          Page: "../logs/list"
        },
        {
          Name: "公司操作员维护",
          Page: "../khusers/list"
        }
         ,
        {
          Name: "用户组维护",
          Page: "../usertype/list"
        }
        ,
        {
          Name: "商品出库管理",
          Page: "../cpckdgl/edit"
        }
        /*,
        {
          Name: "商品进仓汇总",
          Page: "../cpjkwz/list"
        },
        {
          Name: "商品出仓汇总",
          Page: "../cpckwz/list"
        },
        {
          Name: "吞吐量统计",
          Page: "../cpjcttloc/list"
        }
        ,
        {
          Name: "test",
          Page: "../test/index"
        }*/
      ]
    ],
    userlogin: getApp().globalData.userlogin,
    loadData: false,
    title: '',
    hidden: false
  },
  onShow: function() {
    if (!Api.checkTime(0)) return;

    wx.setNavigationBarTitle({
      title: wx.getStorageSync('current_sysmc')
    })

    if (!Api.checkTime(0)) return;
    this.setData({
      userlogin: getApp().globalData.userlogin,
      title: wx.getStorageSync('current_sysmc')
    })
    this.fetchData();
  },
  edit: function(e) {
    if (!Api.checkTime()) return;
    var that = this;
    var obj = e.currentTarget.dataset.obj;
    var url = obj.Page;
    if (url == undefined) return;
    if (obj.Name == '登出') {
      getApp().globalData.userlogin = false;
      this.setData({
        userlogin: getApp().globalData.userlogin,
        title: wx.getStorageSync('current_sysmc')
      })
      wx.redirectTo({
        url: url
      })
    } else {
      wx.navigateTo({
        url: url
      })
    }
  },

  fetchData: function() {
    if (!getApp().globalData.userlogin) return;
    // if (this.data.loadData) return;
    var that = this;
    that.setData({
      hidden: false,
      loadData: true
    })
    if (getApp().globalData.current_khid == 0) {
      that.setData({
        menu: that.data.ckmenu
      })
    } else {
      that.setData({
        menu: that.data.submenu
      })

    }
  },
  onLoad: function() {
    this.setData({
      userlogin: getApp().globalData.userlogin
    })
    // this.fetchData();
  }
})