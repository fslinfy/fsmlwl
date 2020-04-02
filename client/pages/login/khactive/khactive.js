//index.js
//获取应用实例
var that;
var khid=0;
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    khid: 0,
    khmc: '',
    vcode: '',
    second: '',
    userid:0 ,
    button_text: "发验证码到手机",
    smsphone: '',
    wxlogin:0,
    sendstatus: 0,
    username: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  checkboxChange: function (a) {
    this.setData({
      wxlogin: a.detail.value.length
    });
  },
  sendsms: function (e) {
     that = this;
     khid = e.detail.value.khid;
    var smsphone = e.detail.value.smsphone;

    //that.setData({
    //  second: 120,
    // sendstatus:1,
    //});

    // that.countdown();
    //return;
    wx.request({
      url: getApp().globalData.servsers + "/smskhactivevcode",
      header: { "Content-type": "text/html", "charset": "utf-8" },
      data: {
        khid: khid,
        smsphone: smsphone
      },
      success: function (res) {
        if (res.data.result == 'success') {

          getApp().globalData.current_khid = khid;
          wx.setStorageSync('current_khid', khid);

          that.setData({
            sendstatus: 1,
            second: 120,
            khid: khid,
            sendvcode: res.data.vcode,
            smsphone: smsphone
          });
          that.countdown();
        } else {
          wx.showModal({
            showCancel: false,
            title: '注意',
            content: res.data.result,
            success: function (res1) {
              //if (res.data.result=="此用户已激活！"){
              //    wx.navigateBack();
              //}
            }
          })
        }
      }
    })
  },
  syslogin: function (e) {
   that = this;
   khid = this.data.khid;
    var smsphone = this.data.smsphone;
    var vcode = e.detail.value.vcode;

    if (!e.detail.value.vcode) {
      wx.showModal({
        showCancel: false,
        title: '注意',
        content: '请输入验证码!'
      })
      return
    }
    if (e.detail.value.vcode!=that.data.sendvcode) {
      wx.showModal({
        showCancel: false,
        title: '注意',
        content: '输入验证码错误!'
      })
      return
    }
    that.setData({
      second: 0,
      button_text: '发验证码到手机'
    });
    
    
    getApp().globalData.current_khid=khid;
    getApp().globalData.current_khsystem = true;
    wx.setStorageSync('current_khid', khid);
    wx.navigateTo({
      url: '../../khusers/list?khsystem=true'
    })
  },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
  countdown: function () {
     that = this;
    var second = that.data.second
    if (second < 1) {
      that.setData({
        second: 0,
        sendstatus: 0,
        button_text: '发验证码到手机'

      });
      //clearTimeout(micro_timer);
      return;
    }
    var timer = setTimeout(function () {
      that.setData({
        second: that.data.second - 1,
        button_text: '发验证码到手机(' + (that.data.second - 1) + ')'
      });
      that.countdown();
    }
      , 1000)
  },
  onShow: function () {
    this.setData({
      userlogin: getApp().globalData.userlogin
    })
    this.fetchData();
  },
  onLoad: function () {
    this.setData({
      userid: wx.getStorageSync('current_userid'),
      username: wx.getStorageSync('current_username'),
      khid: wx.getStorageSync('current_khid'),
      khmc: wx.getStorageSync('current_khmc'),
      userlogin: app.globalData.userlogin,
      hasUserInfo: true
    })
    this.fetchData();
  },
  fetchData: function () {

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    this.setData({
      userid: wx.getStorageSync('current_userid'),
      khid: wx.getStorageSync('current_khid'),
    })


  },
  useractive: function () {

  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
