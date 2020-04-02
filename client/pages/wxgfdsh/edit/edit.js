var gfid = 0;
var fun_base64 = require('../../../utils/base64.js')
var Api = require("../../../utils/api.js");
var utils = require('../../../utils/util');
var calendar = require("../../../utils/calendar.js");

var select = require("../../../utils/selectName.js");
var callBackQuery = function (res, that) {
  that.setData({
    selectData: res.data
  })
};

Page(
  {
    data: {
      currentkhid: wx.getStorageSync('current_khid'),
      hiddenSelectWindow: true,
      calendarHidden: true,
      act:1,
      options: { hiddenSelectWindow: true },
      datedata: { calendarHidden: true }
    },
    checkboxChange: function (a) {
      this.setData({
        Active: a.detail.value.length
      });
    },

    edit_save: function (e) {
      return;
    },
    hiddenBtn: function (e) {
      this.setData({
        hiddenBoolean: true
      })
    },
    bindDateChange: function (e) {
      this.setData({
        selectdate: 1
      });
      calendar.init(this, 1);
    },
    bindDateChange1: function (e) {
      if (this.data.act > 0) return;
      this.setData({
        selectdate: 2
      });
      calendar.init(this, 1);
    },
    bindcancel: function (e) {
      wx.navigateBack();
    },
    //******  select name option   ************************ */
    selectCancelBtn: function (e) {
      select.hiddenSelectWindow(this);
    },
    selectBtn: function (e) {
      var that = this;
      var id = e.currentTarget.dataset.id;
      var index = e.currentTarget.dataset.index;
      var name = select.check(e, that);
      var gfd=that.data.gfd;
      if (name == "true") return;
      var selecttype = that.data.selectType;
      //var index=that.data.index;
      //console.log(id,name);
      //var obj = that.data.obj;

      switch (selecttype) {
        case "cphm":
          gfd.cphm=name; 
          that.setData({
            gfd:gfd
          });
          break;
        case "sfr":
          gfd.sfr=name;
          that.setData({
            gfd:gfd
          });
          break;
        case "ckmc":
          gfd.ckmc = name;
          gfd.L_id = id;
          that.setData({
            gfd: gfd
          });
          break;

        default:
          break;
      }
      select.hiddenSelectWindow(that);
    },
    bindckmcSelect: function (e) {
      var that = this;
      var list = that.data.selectData.ckmc;
      // var index = e.currentTarget.dataset.index;
      var obj = {};
      obj["selectTitle"] = "选择仓库";
      obj["nameList"] = list;
      that.setData({
        selectType: "ckmc" //, index: index
      });
      select.showSelectWindow(that, obj, false);
    },

    bindcphmSelect: function (e) {
      var that = this;
      var list = that.data.selectData.cphm;
      //      var index = e.currentTarget.dataset.index;
      var obj = {};
      obj["selectTitle"] = "选择车牌";
      obj["nameList"] = list;
      that.setData({
        selectType: "cphm"
      });
      select.showSelectWindow(that, obj, false);

    },
    bindsfrSelect: function (e) {
      var that = this;
      if (that.data.cphm.length == 0) {
        wx.showModal({
          showCancel: false,
          title: '注意',
          content: "请先选择车牌号码！",
          success: function (res) {
            return;
          }
        });
        return;
      }
      var list = that.data.selectData.sfr;
      var cphm = that.data.cphm;
      var newlist = new Array();
      list.forEach(function (item, index) {
        if (item.cphm == cphm) {
          newlist.push(item);
        }
      })
      //      var index = e.currentTarget.dataset.index;
      var obj = {};
      obj["selectTitle"] = "选择司机";
      obj["nameList"] = newlist;
      that.setData({
        selectType: "sfr"
      });
      select.showSelectWindow(that, obj, false);

    },

    //******  select name  end  ************************ */
    delete: function (e) {
      if (!Api.checkTime(1)) return;
      var that = this;
      if (getApp().globalData.current_del < 1) {
        wx.showModal({
          showCancel: false,
          title: '注意',
          content: "没有此记录的删除权限！",
          success: function (res) {
            return;
          }
        })
        return;
      }
      if (that.data.act == 1) {
        if (getApp().globalData.current_lastdel < 1) {
          wx.showModal({
            showCancel: false,
            title: '注意',
            content: "没有此记录的删除权限！",
            success: function (res) {
              return;
            }
          })
          return;
        }
      }
      var obj = that.data.gfd;
      //return 
      var msg = "过货单：" + obj.gfdh;
      wx.showModal({
        title: '真的作废当前过货单？',
        content: msg,
        success: function (res) {
          if (res.confirm) {

            wx.request({
              url: getApp().globalData.servsers + "/mysqlwxaction",
              header: { "Content-type": "text/html", "charset": "utf-8" },
              data: {
                act: "wxcpgfdshsave",
                options: "delete",
                data: {},
                id: obj.id,
                username: getApp().globalData.current_username
              },
              success: function (res) {
                Api.saveResoult(res);
                //if (res.data.success)
              }
            })
          }
        }
      })
    },

    //******  get date option   ************************ */
    preMonth: function () {
      calendar.preMonth();
    },
    nextMonth: function () {
      calendar.nextMonth();
    },
    selectDate: function (e) {
      var vm = this;
      var obj = vm.data.datedata;
      obj["calendarHidden"] = true;

      obj["selectedDate"] = (e.currentTarget.dataset.date.value).replace('/', '-').replace('/', '-');

      var timestamp = Date.parse(new Date()) / 1000;
      var n_to = 1000 * (timestamp + 24 * 60 * 60 * 0);
      var today = ((new Date(n_to)).toISOString()).substring(0, 10);

      if (vm.data.selectdate == 1) {
        obj["kdrq"] = obj["selectedDate"];
        obj["endrq"] = vm.data.endrq;
        var endDate = obj["kdrq"];
        //if (today != "" && endDate != "" && Api.daysBetween(endDate,today)>0) {
        /*if (Api.daysBetween(endDate, today) > 0) {
          wx.showToast({
            title: '开单日期不能大于今天！',
            icon: 'none',
            duration: 2000
          })
          return false;
        }
        */
      }
      else {
        obj["kfrq"] = vm.data.kfrq;
        obj["endrq"] = obj["selectedDate"];

        var endDate = obj["endrq"];

        /*
                if (today != "" && endDate != "" && Api.daysBetween(today, endDate) > 0) {
                  wx.showToast({
                    title: '有效日期不能小于今天！',
                    icon: 'none',
                    duration: 2000
                  })
                  return false;
                }
                */
      }
      vm.setData({
        datedata: obj,
        calendarHidden: obj["calendarHidden"],
        kfrq: obj["kfrq"],
        endrq: obj["endrq"]
      });
    },
    CancelSelect: function (e) {
      var vm = this;
      var obj = vm.data.datedata;
      obj["calendarHidden"] = true;
      vm.setData({
        datedata: obj,
        calendarHidden: obj["calendarHidden"],
      });
    },

    //******  get date option            end  ************************ */

    textBlur: function (e) {
      if (e.detail && e.detail.value.length > 0) {
        // if (e.detail.value.length > 500) {
        //app.func.showToast('内容为12-500个字符','loading',1200);
        // } else {
        this.setData({
          cnote: e.detail.value
        });
        // }
      } else {
        this.setData({
          cnote: ''
        });
      }
    },

    //提交事件
    evaSubmit: function (e) {
      if (!Api.checkTime(1)) return;
      Api.saveFormId(e.detail.formId, wx.getStorageSync('current_openid'));
      var that = this;

      if (getApp().globalData.current_sh < 1) {
        wx.showModal({
          showCancel: false,
          title: '注意',
          content: "没有此记录的审核权限！",
          success: function (res) {
            return;
          }
        })
        return;
      }
      var gfdh = e.detail.value.gfdh;
      var gfid = that.data.id;;
      var endrq = e.detail.value.endrq;
      var cphm = e.detail.value.cphm;
      var sfr = e.detail.value.sfr;

      var cphm = e.detail.value.cphm;
      if (cphm.length == 0) {
        wx.showModal({
          showCancel: false,
          title: '注意',
          content: "请输入过货车牌号码",
          success: function (res) {
            return;
          }
        })
        return;
      }


      var cnote = e.detail.value.cnote;
      if (!Api.checkField(cnote, '备注')) return;
      if (!Api.checkField(sfr, '提货人')) return;
      if (!Api.checkField(cphm, '车牌号码')) return;
      cnote = Api.field_encode(cnote);

      //sfr = sfr.replace("\n", ' ');
      //cphm = cphm.replace("\n", ' ');
      // sfr=sfr.split("\n")
      sfr = Api.field_encode(sfr);
      cphm = Api.field_encode(cphm);
      var gfd=that.data.gfd;
      wx.showModal({
        title: '提示',
        content: "通过此过货单：" + gfdh,
        success: function (res) {
          if (res.confirm) {
            wx.showLoading({
              title: 'save...',
            })
            wx.request({
              url: getApp().globalData.servsers + "/mysqlwxaction",
              header: { "content-type": "application/json", "charset": "utf-8" },
              data: {
                act: "wxcpgfdshsave",
                options: "ok",
                id: gfd.gfid,
                endrq: endrq,
                cphm: cphm,
                sfr: sfr,
                cnote: cnote,
                L_id:gfd.L_id,
                ckmc:gfd.ckmc,
                username: wx.getStorageSync('current_username')
              },
              success: function (res) {
                wx.hideLoading();
                
                Api.saveResoult(res);

                /*var obj = res.data.data;

                if (obj.id == 0) {

                  wx.showModal({
                    title: '提示',
                    content: '此过货单已审核成功！',
                    showCancel: false,
                    success: function (res) {
                     
                      var url = '../../gfdview/edit?level=2&id=' + that.data.id;
                      wx.navigateTo({
                        url: url
                      })
                      return;

                    }
                  })
                }
                else {
                  wx.showModal({
                    title: '此过货单审核保存失败！',
                    showCancel: false,
                    success: function (res) {
                      return;
                    }
                  })
                }
                */
              }
            })
          }
        }
      })
    },
    edit: function (e) {
      //   var url = '/pages/gfdview/edit?id=' + this.data.id;
      //    wx.navigateTo({
      //    url: url
      // })
    },



    onShareAppMessage: function (res) {

      if (res.from === 'button') {
        let target_id = res.target
       // console.log(res);


      }
      console.log('id', this.data.id);
      return {
        title: '明联物流',
        desc: '微信小程序管理系统',
        path: '/pages/wxgfdview/edit?id=' + this.data.id,
        success: function (res) {
          console.log('res', res);
          if (res.errMsg == 'shareAppMessage:ok') {//判断分享是否成功

            if (res.shareTickets == undefined) {//判断分享结果是否有群信息
              //分享到好友操作...
              console.log("分享到好友操作...");
            } else {
              //分享到群操作...
              var shareTicket = res.shareTickets[0];
              wx.getShareInfo({
                shareTicket: shareTicket,
                success: function (e) {
                  //当前群相关信息
                  var encryptedData = e.encryptedData;
                  var iv = e.iv;
                  console.log(iv, encryptedData, shareTicket);
                }
              })
            }
          }
        },
        fail: function (res) {
          console.log(" 转发失败");
        },
        complete: function (res) {
         // console.log(" complete", res);
         // console.log('res', res);
          if (res.errMsg == 'shareAppMessage:ok') {//判断分享是否成功

            if (res.shareTickets == undefined) {//判断分享结果是否有群信息
              //分享到好友操作...
              console.log("分享到好友操作...");
            } else {
              //分享到群操作...
              var shareTicket = res.shareTickets[0];
              wx.getShareInfo({
                shareTicket: shareTicket,
                success: function (e) {
                  //当前群相关信息
                  var encryptedData = e.encryptedData;
                  var iv = e.iv;
              //    console.log(iv, encryptedData, shareTicket);
                }
              })
            }
          }
        }




      }
    },
    onLoad: function (options) {
      console.log('app.globalData.userInfo', getApp().globalData.userlogin);
      wx.showShareMenu({
        withShareTicket: true
      });

      var ctitle = "过货单查询";
      if (options.act == 0) {
        ctitle = "过货单审核";
      }
      wx.setNavigationBarTitle({
        title: ctitle
      })

      var timestamp = Date.parse(new Date()) / 1000;
      //加一天的时间：  
      var n_to = 1000 * (timestamp + 24 * 60 * 60 * 2);
      var tomorrow_date = new Date(n_to);
      var that = this;
      //var obj = options.obj;
      var obj = JSON.parse(options.obj);

      if (obj) {
        console.log(obj);
        gfid = obj.gfid;
        that.setData({
          gfd: obj,
          id:obj.gfid,
          gfdmx: obj.gfdmx,
          act: options.act,
          hiddenSelectWindow: true,
          datedata: { calendarHidden: true },
        });
      }
      calendar.init(this, 0);
      select.init(this);
      var that = this;
      if (options.act == 0) {
        Api.queryData(that,
          {
            act: "cpgfdselectdata",
            khid: getApp().globalData.current_khid,
            active: 1
          }, callBackQuery
        );
      }

      /*      Api.queryData(that,
              {
                act: "cpgfdmxloc",
                gfid: gfid
              },
              callBackcpgfdmxQuery
            );*/
    }
  })
