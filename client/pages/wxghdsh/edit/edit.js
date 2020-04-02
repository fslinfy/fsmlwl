var xsid = 0;
var fun_base64 = require('../../../utils/base64.js')
var Api = require("../../../utils/api.js");
var utils = require('../../../utils/util');
var calendar = require("../../../utils/calendar.js");

// var select = require("../../../utils/selectName.js");
var callBackQuery = function (res, that) {
  that.setData({
    selectData: res.data
  })

};

var callBackcpghdmxQuery = function (res, that) {
  var obj = res.data.rows[0];
  obj['cnote'] = Api.field_decode(obj.cnote);
//console.log('obj',obj);
  var xsdmx = obj.xsdmx;
  var sumsl=0;
  var sumzl=0;
  xsdmx.forEach(function (item2, index2) {
    sumsl = sumsl + parseFloat(item2.xssl);
    sumzl = sumzl + parseFloat(item2.xszl);
    item2.xssl = Api.slrenderer(item2.xssl);
    item2.xszl = Api.slrenderer(item2.xszl);
  })
  that.setData({
    obj: obj,
    xsdmx:xsdmx,
    id: obj.ghid,
    cnote: obj.cnote,
    czy: obj.czy,
    jebz:0,
    sumsl:sumsl,
    sumzl:sumzl,
    xsrq: obj.xsrq,
    endrq: obj.endrq
  })
};
Page(
  {
    data: {
      currentkhid: wx.getStorageSync('current_khid'),
      obj: {},
      xsdmx: [],
      ckid: 0,
      ckmc: '',
      act: 1,
      sumsl:0,
      sumzl:0,
      cnote: "",
      Quantity_sum: 0,
      hiddenSelectWindow:true,
      calendarHidden: true,
      Weight_sum: 0,
      options: { hiddenSelectWindow: true },
      datedata: { calendarHidden: true }
    },
    checkboxChange: function (a) {
      this.setData({
        Active: a.detail.value.length
      });
    },
    checkboxChange_jebz: function (a) {
      this.setData({
        jebz: a.detail.value.length
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
 //   selectCancelBtn: function (e) {
 //     select.hiddenSelectWindow(this);
 //   },

/*    selectBtn: function (e) {
      var that = this;
      var id = e.currentTarget.dataset.id;
      var index = e.currentTarget.dataset.index;
      var name = select.check(e, that);
      if (name == "true") return;
      var selecttype = that.data.selectType;
      //var index=that.data.index;
      var obj = that.data.obj;
      switch (selecttype) {
        case "cphm":
          that.setData({
            cphm: name
          });
          break;
        case "sfr":
          that.setData({
            sfr: name
          });
          break;
        default:
          break;
      }
      select.hiddenSelectWindow(that);
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
*/
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
      var obj = that.data.obj;
      //return 
      var msg = "单号：" + obj.ghdh;
      wx.showModal({
        title: '真的作废此已审核的过户单？',
        content: msg,
        success: function (res) {
          if (res.confirm) {

            wx.request({
              url: getApp().globalData.servsers + "/mysqlwxaction",
              header: { "Content-type": "text/html", "charset": "utf-8" },
              data: {
                act: "wxcpghdshsave",
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
        obj["xsrq"] = obj["selectedDate"];
        obj["endrq"] = vm.data.endrq;
        var endDate = obj["xsrq"];
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
        obj["xsrq"] = vm.data.xsrq;
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
        xsrq: obj["xsrq"],
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
      var ghdh = e.detail.value.ghdh;
      var obj=that.data.obj;
      var xsid = obj.ghid;;
      var jebz = that.data.jebz;;
      var endrq = e.detail.value.endrq;
      var cnote = e.detail.value.cnote;


    // return ;

      if (!Api.checkField(cnote, '备注')) return;

     // cnote = Api.field_encode(cnote);


/*
      var cphm = e.detail.value.cphm;
      var sfr = e.detail.value.sfr;

      var cphm = e.detail.value.cphm;
      if (cphm.length == 0) {
        wx.showModal({
          showCancel: false,
          title: '注意',
          content: "请输入过户车牌号码",
          success: function (res) {
            return;
          }
        })
        return;
      }


      if (!Api.checkField(sfr, '过户人')) return;
      if (!Api.checkField(cphm, '车牌号码')) return;

      sfr = sfr.replace("\n", ' ');
      cphm = cphm.replace("\n", ' ');
     // sfr=sfr.split("\n")
      sfr = Api.field_encode(sfr);
      cphm = Api.field_encode(cphm);
      */
      
      wx.showModal({
        title: '提示',
        content: "审核通过此过单：" + ghdh,
        success: function (res) {
          if (res.confirm) {
            wx.showLoading({
              title: 'save...',
            })

            wx.request({
              url: getApp().globalData.servsers + "/mysqlwxaction",
              header: { "content-type": "application/json", "charset": "utf-8" },
              data: {
                act: "wxcpghdshsave",
                options: "ok",
                id: xsid,
                jebz:jebz,
                endrq: endrq,
                cnote: cnote,
                username: wx.getStorageSync('current_username')
              },
              success: function (res) {
                wx.hideLoading();

                Api.saveResoult(res);

            
              }
            })



             /* 
            wx.request({
              url: getApp().globalData.servsers + "/mysqlwxaction",
              header: { "content-type": "application/json", "charset": "utf-8" },
              data: {
                act: "wxcpghdshsave",
                options: "ok",
                id: xsid,
                endrq: endrq,
                cnote: cnote,
                username: wx.getStorageSync('current_username')
              },
              success: function (res) {
                wx.hideLoading();
                var obj = res.data.data;
              
                if (obj.id == 0) {

                  wx.showModal({
                    title: '提示',
                    content: '此过户单已审核成功！',
                    showCancel: false,
                    success: function (res) {


                      return;

                    }
                  })
                }
                else {
                  wx.showModal({
                    title: '此过户单审核保存失败！',
                    showCancel: false,
                    success: function (res) {
                      return;
                    }
                  })
                }
              }
            })
            */
          }
        }
      })
    },
    edit: function (e) {
   //   var url = '/pages/xsdview/edit?id=' + this.data.id;
  //    wx.navigateTo({
    //    url: url
     // })
    },



    onShareAppMessage: function (res) {

      if (res.from === 'button') {
        let target_id = res.target
        console.log(res);


      }
      console.log('id', this.data.id);
      return {
        title: '明联物流',
        desc: '微信小程序管理系统',
        path: '/pages/wxghdview/edit?id='+this.data.id,
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
        complete:function(res)
        {
          console.log(" complete",res);
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
        }




      }
    },
    onLoad: function (options) {
      console.log('app.globalData.userInfo', getApp().globalData.userlogin);
      wx.showShareMenu({
        withShareTicket: true
      });

      var ctitle = "过户单查询";
      if (options.act == 0) {
        ctitle = "过户单审核";
      }
      wx.setNavigationBarTitle({
        title: ctitle
      })
      
      var timestamp = Date.parse(new Date()) / 1000;
      //加一天的时间：  
      var n_to = 1000 * (timestamp + 24 * 60 * 60 * 2);
      var tomorrow_date = new Date(n_to);
      var that = this;
      calendar.init(this, 0);
      // select.init(this);
/*
      Api.queryData(that,
        {
          act: "cpckdselectdata",
          khid: getApp().globalData.current_khid,
          active: 1
        }, callBackQuery
      );
*/
      var obj = options.obj;

      that.setData({
        act: options.act
      });



      console.log('obj',obj);
      if (obj) {
        var obj = JSON.parse(options.obj);
        xsid = obj.xsid;
        that.setData({
          obj: obj,
          xsdmx:obj.xsdmx,
          id: obj.ghid,
          act: options.act,
          cnote: obj.cnote,
          czy: obj.czy,
          jebz:  obj.jebz,
          xsrq: obj.xsrq,
          endrq: obj.endrq
        });

        var xsdmx = that.data.xsdmx;
        var sumsl = 0;
        var sumzl = 0;
        
        xsdmx.forEach(function (item2, index2) {
          sumsl = sumsl + parseFloat(item2.xssl);
          sumzl = sumzl + parseFloat(item2.xszl);
          item2.xssl = Api.slrenderer(item2.xssl);
          item2.xszl = Api.slrenderer(item2.xszl);
        })
        
        that.setData({
          sumsl: sumsl,
          sumzl: sumzl.toFixed(3)
        })
      }
      else
      {
       Api.queryData(that,
       {
          act: "wxcpghdlist",
          ghid: options.id
       },
       callBackcpghdmxQuery
       );
      }
    }
  })
