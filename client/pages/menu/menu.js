var Api = require("../../utils/api.js");
Page({
  data: {
    curNav: 1,
    curIndex: 0,
    menu: [],
    submenu: [[
      {
        Name: "开提货单",
        Page: "../xskd/list"
      },
      {
        Name: "提货单审核",
        Page: "../xsdsh/list"
      }
      ,
      {
        Name: "未提货明细",
        Page: "../xsdmfh/list"
      },
      {
        Name: "提货单查询",
        Page: "../xsdloc/list"
      },
      {
        Name: "已作废提货单查询",
        Page: "../xsddelloc/list"
      },
      {
        Name: "司机资料维护",
        Page: "../cphm/list"
      },
      {
        Name: "商品库存查询",
        Page: "../cpkc/list"
      },
      {
        Name: "商品入库查询",
        Page: "../jkdloc/list"
      }

    ]],
    ckmenu: [[
      {
        Name: "进仓业务审核",
        Page: "../cpjkdsh/list"
      },
      {
        Name: "进仓财务审核",
        Page: "../cpjkdcwsh/list"
      },
      {
        Name: "进仓明细查询",
        Page: "../cpjkdloc/list"
      },
      
      {
        Name: "过货明细查询",
        Page: "../cpgfdloc/list"
      },
      {
        Name: "出仓业务审核",
        Page: "../cpckdywsh/list"
      },
      {
        Name: "出仓仓管复核",
        Page: "../cpckdcksh/list"
      },
      {
        Name: "出仓单财务审核",
        Page: "../cpckdcwsh/list"
      },
      {
        Name: "出仓明细查询",
        Page: "../cpckdloc/list"
      },
      
      {
        Name: "未提货单查询",
        Page: "../xsdmfh/list"
      }


    ]],
    userlogin: getApp().globalData.userLogin,
    loadData: false,
    title:'',
    hidden: false
  },
  onShow: function () {
    if (!Api.checkTime(0)) return; 
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('current_sysmc') 
    })

  
    this.setData({
      userlogin: getApp().globalData.userlogin,
      title: wx.getStorageSync('current_sysmc') 
    })

    this.fetchData();
  },
  edit: function (e) {
    if (!Api.checkTime()) return;
    var that = this;
    var obj = e.currentTarget.dataset.obj;
    var url = obj.Page;
    if (url == undefined) return;
    wx.navigateTo({
      url: url
    })
  },

  fetchData: function () {
    
    if (!getApp().globalData.userlogin) return;
    //if (this.data.loadData) return;
    var that = this;
    that.setData({
      hidden: false,
      loadData: true,
      
    })
    if (getApp().globalData.current_khid==0){
    that.setData({
      menu: that.data.ckmenu
    })
    }else
    {

      that.setData({
        menu: that.data.submenu
      })
    }
    
    return;

  },
  onLoad: function () {


    this.setData({
      userlogin: getApp().globalData.userlogin
    })


    //this.fetchData();
     

  }
})