//index.js
//获取应用实例
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
    wxlogin:1,
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
    var that = this;
    var khid = e.detail.value.khid;
    var userid = e.detail.value.userid;
    var smsphone = e.detail.value.smsphone;

    //that.setData({
    //  second: 120,
    // sendstatus:1,
    //});

    // that.countdown();
    //return;
    wx.request({
      url: getApp().globalData.servsers + "/smsactivevcode",
      header: { "Content-type": "text/html", "charset": "utf-8" },
      data: {
        act:'usersactive',
        wxactive: 1,
        khid: khid,
        userid: userid,
        smsphone: smsphone
      },
      success: function (res) {
        if (res.data.result == 'success') {
          that.setData({
            sendstatus: 1,
            second: 120,
            khid: khid,
            sendvcode: res.data.vcode,
            userid: userid,
            smsphone: smsphone
          });
          that.countdown();
        } else {
          //that.setData({
          //  sendstatus:1
          //});
          //wx.showToast({
          //  title: res.data.result,
          //  icon: 'loading',
          //  duration: 2000
          //})
          wx.showModal({
            showCancel: false,
            title: '注意',
            content: res.data.result,
            success: function (res1) {
              if (res.data.result=="此用户已激活！"){
                  wx.navigateBack();
              }
            }
          })



        }
      }
    })
  },
  syslogin: function (e) {
    var that = this;
    var khid = this.data.khid;
    var userid = this.data.userid;
    var smsphone = this.data.smsphone;
    var vcode = e.detail.value.vcode;
    var psw1 = e.detail.value.password1;
    var psw2 = e.detail.value.password2;

    //console.log(khid, userid, smsphone, vcode, psw1, psw2);
    // return;

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
    if ((!psw1) || ((!psw2))) {
      wx.showModal({
        showCancel: false,
        title: '注意',
        content: '请输入用户新密码!'
      })

      return
    }
    if (psw1 != psw2) {
      wx.showModal({
        showCancel: false,
        title: '注意',
        content: '前后两次输入密码不一致!'
      })
      return
    }
    that.setData({
      second: 0,
      button_text: '发验证码到手机'
    });

    wx.request({
      url: getApp().globalData.servsers + "/checklogin",
      header: { "Content-type": "text/html", "charset": "utf-8" },
      data: {
        act: "vipuseractive",
        khid: khid,
        userid: userid,
        password: psw1,
        vcode: vcode,
        wxlogin: that.data.wxlogin,
        openid: wx.getStorageSync('current_openid'),
        nickName: that.data.userInfo.nickName
      },
      success: function (res) {
        //Api.saveResoult(res);


        var obj = res.data.data;
        if (obj.userid > 0) {
          wx.setStorageSync('current_userid', obj.userid);
          wx.setStorageSync('current_username', obj.username);
          if (obj.khid>0){
             wx.setStorageSync('current_khid', that.data.khid);
             wx.setStorageSync('current_khmc', obj.khmc);
             wx.setStorageSync('current_L_id', 0);
             wx.setStorageSync('current_ckmc', '');
          }
          else
          {
             wx.setStorageSync('current_khid',0);
             wx.setStorageSync('current_khmc', '');
          }

          wx.setStorageSync('current_lidstring', obj.lidstring);
          wx.setStorageSync('wxlogin', that.data.wxlogin);

          getApp().globalData.current_khsystem = false;
          getApp().globalData.current_userid = obj.userid;
          getApp().globalData.current_username = obj.username;
          getApp().globalData.current_edit = obj.edit;
          getApp().globalData.current_sh = obj.sh;
          getApp().globalData.current_del = obj.del;
          getApp().globalData.current_lastdel = obj.lastdel;
          getApp().globalData.userlogin = true;
          
          that.setData({
            userid: wx.getStorageSync('current_userid'),
            username: wx.getStorageSync('current_username'),
            khmc: wx.getStorageSync('current_khmc'),
            khid: wx.getStorageSync('current_khid'),
            userlogin: true,
            hasUserInfo: true
          })

          wx.navigateBack({
            delta: 2
          });

          //    wx.redirectTo({
          //    url: "../tabbarmenu/menu1"
          //  });

        }
        else {
          current_login: false;
          var msg = obj.username;
          wx.showModal({
            showCancel: false,
            title: '注意!',
            content: msg
          })
          return
        }
      }
    })

  },
  countdown: function () {
    var that = this;
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
