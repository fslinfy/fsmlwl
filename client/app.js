//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
  onLaunch: function () {
    // 展示本地存储能力
 
    qcloud.setLoginUrl(config.service.loginUrl);
  
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    var code="";
    var nickname="";
   
    // 登录
    wx.login({
      success: res => {
        code=res.code;
        //console.log(" login ", res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.getUserInfo({
          success: res => {
            //console.log("login getuserinfo ", res);
            wx.setStorageSync('current_nickName', res.userInfo.nickName);
            this.getOpenId(code, res.userInfo.nickName);
          },
          fail: res => {
            //console.log("getuserinfo fail", res);
          }
        })
     }
    })
    // 获取用户信息

    wx.getSetting({
      success: res => {
        //console.log("getsetting ", res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              //console.log("getsetting  getUserInfo", res);
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })


  },
  userInfoReadyCallback: function (rec) {
    //console.log("userInfoReadyCallback");
  },
  getOpenId: function (code,name) {
    if (code.length==0) return ;
    if (name.length == 0) return;
    wx.request({
      url: getApp().globalData.servsers + "/mysqlwxaction",
      header: { "Content-type": "text/html", "charset": "utf-8" },
      data: {
        act: "getopenid",
        code:code,
        nickname:name
      },
      success: function (res) {
        //console.log("openid res:", res);
        if (res.data.success){
         // console.log('openid',res.data.openid);
          wx.setStorageSync('current_openid', res.data.openid);
        }
      }
    })
  },
 
  globalData: {
    config:config,
    servsers: config.service.host + "/weapp",
    userInfo: { userName: 'admin', userId: 1 },
    current_E_code: "1",
    current_l_id:0 ,
    current_ckmc:'',
    current_sysmc: '',
    current_edit: false,
    current_sh: false,
    current_khsystem:false,
    current_khjc:"",
    current_khmc:"",
    current_username: wx.getStorageSync('current_username'),
    current_del: false,
    current_lastdel: false,
    userlogin: false,
    current_khid: 0,
    systemType: "",
    userPermissions: "",
    deviceWidth: 375,
    deviceHeight: 603

  }
})


