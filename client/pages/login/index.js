//index.js
//获取应用实例

var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var Api = require("../../utils/api.js");
var util = require("../../utils/util.js");
const app = getApp()
  
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    khid: 0,
    khmc: '',
    userid: 0,
    userlogin: false,
    cklogin:false,
    wxloginmodel: false,
    wxlogin: false,
    username: '',
    password:'',
    wxname: "",
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  useractive: function () {
  
    wx.navigateTo({
      url: 'useractive/useractive'
    })

  },
  khactive: function () {
  
    wx.navigateTo({
      url: 'khactive/khactive'
    })

  },

  wxloginactive: function () {
    this.setData({
      cklogin: !this.data.cklogin,
      wxname: wx.getStorageSync('current_nickName')// that.data.userInfo.nickName
    })

  },
  syslogin: function (e) {

  


    Api.saveFormId(e.detail.formId, wx.getStorageSync('current_openid'));


    var that = this;
    var khid = e.detail.value.khid;
    if (khid=='') khid=0;
    var khmc = e.detail.value.khmc;
    if (that.data.cklogin)
    {
       khid=0;
       khmc='';
    }
    var userid = e.detail.value.username;
    if (!e.detail.value.username) {
      wx.showModal({
        showCancel: false,
        title: '注意',
        content: '请输入用户名称或用户ID!'
      })
      return
    }
    if (!e.detail.value.password) {
      wx.showModal({
        showCancel: false,
        title: '注意',
        content: '请输入用户密码!'
      })
      return
    }
    
    var openid = wx.getStorageSync('current_openid');
    
    var nickname = wx.getStorageSync('current_nickName');
    if ((nickname == undefined) || (nickname == 'undefined')) {
      nickname = "";
    }
    var guid = nickname;
    var url = getApp().globalData.servsers + "/checklogin";
    wx.request({
      url: url,
      header: { "Content-type": "text/html", "charset": "utf-8" },
      data: {
        act: "sysuserlogin",
        khid: khid,
        L_id: wx.getStorageSync('current_l_id'),
        username: userid,
        userid: wx.getStorageSync('current_openid'),
        guid:guid,
        openid: openid,
        password: e.detail.value.password,
        nickName: nickname
      },
      success: function (res) {


        var obj = res.data.data;
        console.log(obj);
        if (obj.userid > 0) {
          var userInfo = {};
          if (obj.khid > 0) {
            wx.setStorageSync('current_ckid',0);
            getApp().globalData.current_l_id=0;
            wx.setStorageSync('current_khid', obj.khid);
            wx.setStorageSync('current_khmc', obj.khmc);
            wx.setStorageSync('current_khjc', obj.khjc);
            wx.setStorageSync('current_sysmc', obj.khmc);
            getApp().globalData.current_sysmc = obj.khmc;
            wx.setStorageSync('current_cklogin',0);
            wx.setStorageSync('current_lastdel', obj.lastdel);
          }
          else {
            wx.setStorageSync('current_cklogin', 0);
            wx.setStorageSync('current_khid', 0);
            wx.setStorageSync('current_khmc', '');
            wx.setStorageSync('current_khjc', '');
            wx.setStorageSync('current_lastdel', obj.lastdel);
            wx.setStorageSync('current_lidstring', obj.lidstring);

            wx.request({
              url: getApp().globalData.servsers + "/Mysqlwxaction",
              header: { "Content-type": "text/html", "charset": "utf-8" },
              data: {
                act: "getckmclist",
                L_id: wx.getStorageSync('current_l_id'),
                username: userid,
                userid: wx.getStorageSync('current_openid'),
                guid: guid,
                openid: openid,
                lidstring: obj.lidstring

              },
              success: function (res) {
                var ckobj = res.data.rows;

                if (ckobj.length == 1) {
               
                  wx.setStorageSync('current_l_id', ckobj[0].ckid);
                  wx.setStorageSync('current_ckmc', ckobj[0].ckmc);
                  wx.setStorageSync('current_sysmc', ckobj[0].ckmc);
                  getApp().globalData.current_sysmc = ckobj[0].ckmc;
                  getApp().globalData.current_l_id = ckobj[0].ckid;
                  wx.switchTab({
                    url: '../menu/menu'
                  });
                }
                else {

                  var newlist = [];

                  ckobj.forEach(function (item, index) {

                    newlist.push(item.ckmc);


                  })

                  wx.showActionSheet(
                    {
                      itemList: newlist,
                      success: function (res) {

                        var index = res.tapIndex;
                        wx.setStorageSync('current_l_id', ckobj[index].ckid);
                        wx.setStorageSync('current_ckmc', ckobj[index].ckmc);
                        wx.setStorageSync('current_sysmc', ckobj[index].ckmc);
                        getApp().globalData.current_l_id = ckobj[index].ckid;
                        getApp().globalData.current_sysmc = ckobj[index].ckmc;

                        wx.switchTab({
                          url: '../menu/menu'
                        });
                      }
                    })

                }
              }

            });


          }
          wx.setStorageSync('current_userid', obj.userid);
          wx.setStorageSync('current_username', obj.username);


          wx.setStorageSync('current_wxlogin', obj.wxlogin);
          userInfo["userid"] = obj.userid;
          userInfo["username"] = obj.username;
          userInfo["nickName"] = obj.wxname;
          wx.setStorageSync('userInfo', userInfo);
          getApp().globalData.current_userid = obj.userid;
          getApp().globalData.current_username = obj.username;
          getApp().globalData.current_edit = obj.edit;
          getApp().globalData.current_sh = obj.sh;
          getApp().globalData.current_khmc = obj.khmc;
          getApp().globalData.current_khjc = obj.khjc;
          
          getApp().globalData.current_del = obj.del;
          getApp().globalData.current_khid = wx.getStorageSync('current_khid');
          getApp().globalData.current_wxlogin = obj.wxlogin;
          getApp().globalData.current_lastdel = wx.getStorageSync('current_lastdel');
          
          if (obj.lastdel > 0) {
            getApp().globalData.current_del = 1;
          }
          
          /*if (wx.getStorageSync('current_khid')>0){
             getApp().globalData.current_khsystem = true;
             wx.setStorageSync('current_khsystem', true);
          
          }else{
             getApp().globalData.current_khsystem = false;
             wx.setStorageSync('current_khsystem', false);
          }*/
          getApp().globalData.userlogin = true;
          that.setData({
            userid: wx.getStorageSync('current_userid'),
            username: wx.getStorageSync('current_username'),
            khid: wx.getStorageSync('current_khid'),
            khmc: wx.getStorageSync('current_khmc'),
            lidstring: wx.getStorageSync('current_lidstring'),
            wxlogin: obj.wxlogin,
            userInfo: userInfo,
            userlogin: true
         
          })
          getApp().globalData.operatetime = Date.parse(new Date(), ) / 1000;
         
          if (obj.khid > 0) {
          wx.switchTab({
            url: '../menu/menu'
          });
          }
        }
        else {
          var msg = obj.username;
          wx.showModal({
            showCancel: false,
            title: '注意!',
            content: msg
          })
          return;
        }
      },
      fail: function (e) {
      }
    })
  },
  onShow: function () {
  // wx.setStorageSync('current_l_id', '');
  //  wx.setStorageSync('current_khid', '');
  //  getApp().globalData.current_khid = 0;;
  //  getApp().globalData.current_l_id = 0;  

    this.fetchData();


    //  if (getApp().globalData.userlogin) {
    //   wx.redirectTo({
    //    url: '../menu/menu',
    //  })


    // }
  },
  onShareAppMessage: function () {

    return {
      title: '明联物流',
      desc: '仓储管理微信小程序',
      path: 'pages/login/index'
    }
  },
  onLoad: function () {
    /*
    wx.scanCode({
      success(res) {
        console.log(res)
      }
    })
    
    wx.chooseAddress({
      success(res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      }
    })

    wx.openSetting({
      success(res) {
        console.log(res.authSetting,res)
        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }
      }
    })
    
    wx.login({
      success(res) {
        if (res.code) {
         console.log("login res",res);
        }
        }
        })


    wx.getUserInfo({
      success(res) {
        const userInfo = res.userInfo
        const nickName = userInfo.nickName
        const avatarUrl = userInfo.avatarUrl
        const gender = userInfo.gender // 性别 0：未知、1：男、2：女
        const province = userInfo.province
        const city = userInfo.city
        const country = userInfo.country
        console.log("userInfo", userInfo)
      }
    })

*/
          
    wx.setStorageSync('current_l_id', '');
 //   wx.setStorageSync('current_khid', '');
 //   getApp().globalData.current_khid=0;;
    getApp().globalData.current_l_id=0;  
    
    var host=config.service.host;
    if (host.indexOf('fsminglian')<1)
    {
      console.log(config);
      this.setData({
        password:'888888'
      })

    }
    this.fetchData();
    wx.showShareMenu({
      withShareTicket: true
    });
    
  },
  fetchData: function () {
    
    var that = this;
    that.setData({
      userid: wx.getStorageSync('current_userid'),
      username: wx.getStorageSync('current_username'),
      khid: wx.getStorageSync('current_khid'),
    //  cklogin: wx.getStorageSync('current_khid')==0,
      khmc: wx.getStorageSync('current_khmc'),
      lidstring: wx.getStorageSync('current_lidstring'),
      userlogin: app.globalData.userlogin//,
      // hasUserInfo: true
    })


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

    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {


        } else {
          //   util.showModel('用户未授权', e.detail.errMsg);

          that.setData({

            hasUserInfo: false
          })
        }
      }
    });

  },
  bindGetUserInfo: function (e) {
    
    // if (this.data.logged) return;

    util.showBusy('正在登录');

    var that = this;
    var userInfo = e.detail.userInfo;

    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {

          // 检查登录是否过期
          wx.checkSession({
            success: function () {
              // 登录态未过期
              util.showSuccess('登录成功');
              that.setData({
                userInfo: userInfo,
                logged: true
              })
            },

            fail: function () {
              qcloud.clearSession();
              // 登录态已过期，需重新登录
              var options = {
                encryptedData: e.detail.encryptedData,
                iv: e.detail.iv,
                userInfo: userInfo
              }
              that.doLogin(options);
            },
          });
        } else {
          util.showModel('用户未授权', e.detail.errMsg);
        }
      }
    });
  },
  doLogin: function (options) {
    var that = this;

    wx.login({
      success: function (loginResult) {
        var loginParams = {
          code: loginResult.code,
          encryptedData: options.encryptedData,
          iv: options.iv,
        }
        qcloud.requestLogin({
          loginParams, success() {
            util.showSuccess('登录成功');

            that.setData({
              userInfo: options.userInfo,
              logged: true
            })
          },
          fail(error) {
            util.showModel('登录失败', error)
          }
        });
      },
      fail: function (loginError) {
        util.showModel('登录失败', loginError)
      },
    });
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,

      hasUserInfo: true
    })
  }
})
