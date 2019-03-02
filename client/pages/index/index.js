//index.js
//获取应用实例

var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var Api = require("../../utils/api.js");
var util = require("../../utils/util.js");
const app = getApp()
var that=null;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: true,
    khid: 0,
    khmc: '',
    userid: 0,
    userlogin: false,
    wxloginmodel: false,
    wxlogin: false,

    username: '',
    wxname: "",
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  wxloginactive: function () {
    this.setData({
      wxloginmodel: !this.data.wxloginmodel,
      wxname: wx.getStorageSync('current_nickName')// that.data.userInfo.nickName
    })

  },
  syslogin: function (e) {
    wx.redirectTo({
      url: '../login/index',
    })
    return;
  },
  onShow: function () {

    this.setData({
      userlogin: getApp().globalData.userlogin
    })
    this.fetchData();


    //  if (getApp().globalData.userlogin) {
    //   wx.redirectTo({
    //    url: '../menu/menu',
    //  })


    // }
  },
  onLoad: function () {
    //current_khid=630;
    this.setData({
      userid: wx.getStorageSync('current_userid'),
      username: wx.getStorageSync('current_username'),
      khid: wx.getStorageSync('current_khid'),
      khmc: wx.getStorageSync('current_khmc'),
      userlogin: app.globalData.userlogin,
      wxname: wx.getStorageSync('current_nickName')// that.data.userInfo.nickName

    })

    this.fetchDa
  },
  fetchData: function () {
    var that = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else
      if (this.data.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo;
            that.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
      }
    that.setData({
      wxname: wx.getStorageSync('current_nickName'),
      wxlogin: wx.getStorageSync('current_wxlogin')// that.data.userInfo.nickName
    })


  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,

      hasUserInfo: true
    })
  }
})
