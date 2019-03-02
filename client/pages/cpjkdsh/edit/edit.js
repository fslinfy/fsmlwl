var xsid = 0;
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
var callBackcpjkdmxQuery = function (res, that) {


  var jkdmx = res.data.rows;
  var sumsl = 0;
  var sumzl = 0;
  jkdmx.forEach(function (item2, index2) {
    sumsl = sumsl + parseFloat(item2.xssl);
    sumzl = sumzl + parseFloat(item2.xszl);
    item2.xssl = Api.slrenderer(item2.xssl);
    item2.xszl = Api.slrenderer(item2.xszl);
  })
  that.setData({
    jkdmx: jkdmx,
    sumsl: sumsl,
    sumzl: sumzl.toFixed(3)
  })

};
Page(
  {
    data: {
      obj: {},
      lists: [],
      jkdmx: [],
      act: 1,
      cnote: "",
      multipleChoice: true,
      hiddenSelectWindow: true,
      calendarHidden: true,
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

      if (name == "true") return;
      var selecttype = that.data.selectType;

      index = that.data.index;
      var newlist = that.data.lists;
      var obj = newlist[0].jkdmx[index];
      switch (selecttype) {
        case "byg":
          obj['byg'] = name;
          break;
        case "gs":
          obj['gs'] = name;
          break;
        case "cg":
          obj['cg'] = name;
          break;
      }
      newlist[0].jkdmx[index] = obj;
      that.setData({
        lists: newlist
      });
      select.hiddenSelectWindow(that);
    },
    bindbygSelect: function (e) {
      var that = this;
      var list = that.data.selectData.byg;
      var index = e.currentTarget.dataset.index;
      var obj = {};
      obj["selectTitle"] = "选择搬运";
      obj["nameList"] = list;
      obj["multipleChoice"] = true;
      that.setData({
        selectType: "byg",
        index: index
      });
      select.showSelectWindow(that, obj, true);

    },
    bindgsSelect: function (e) {
      var that = this;
      var list = that.data.selectData.gs;
      var index = e.currentTarget.dataset.index;
      var obj = {};
      obj["selectTitle"] = "选择叉车";
      obj["nameList"] = list;
      obj["multipleChoice"] = true;
      that.setData({
        selectType: "gs",
        index: index
      });
      select.showSelectWindow(that, obj, true);

    },

    bindcgSelect: function (e) {
      var that = this;
      var list = that.data.selectData.cg;
      var index = e.currentTarget.dataset.index;
      var obj = {};
      obj["selectTitle"] = "选择仓管";
      obj["nameList"] = list;
      obj["multipleChoice"] = true;
      that.setData({
        selectType: "cg",
        index: index
      });
     select.showSelectWindow(that, obj, true);
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
      var obj = that.data.obj;
      //var jkd=obj[0];

      //console.log(jkd.jkid,jkd.jkdh);
      //return 
      var msg = "提单：" + obj.jkdh;
      wx.showModal({
        title: '真的作废当前提货单？',
        content: msg,
        success: function (res) {
          if (res.confirm) {

            wx.request({
              url: getApp().globalData.servsers + "/mysqlwxaction",
              header: { "Content-type": "text/html", "charset": "utf-8" },
              data: {
                act: "cpjkdshsave",
                options: "delete",
                jkid: obj.jkid,
                shr: getApp().globalData.current_username
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

      obj["selectedDate"] = e.currentTarget.dataset.date.value;

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

      var list = that.data.lists;
      var obj = list[0];
      var jkdh = obj.jkdh;
      var jkd = {};

      jkd['jkid'] = obj.jkid;
      //var cnote = e.detail.value.cnote.split('\n').join('&~~');
      var cnote = Api.field_encode(e.detail.value.cnote);
      jkd['cnote'] = cnote;

      var jkdmx = [];
      var mx = obj.jkdmx;
      mx.forEach(function (item, index) {
        var o = {};
        if (item.jeid > 0) {
          o['jeid'] = item.jeid;
          o['byg'] = item.byg;
          o['gs'] = item.gs;
          o['cg'] = item.cg;
          jkdmx.push(o);
        }
      })
      jkd['gsby'] = jkdmx;
      jkd['shbz'] = that.data.shbz;
      jkd['shr'] = wx.getStorageSync('current_username');
      
      wx.showModal({
        title: '提示',
        content: "审核通过此进仓单：" + jkdh,
        success: function (res) {
          if (res.confirm) {
            wx.showLoading({
              title: 'save...',
            })
            wx.request({
              url: getApp().globalData.servsers + "/mysqlwxaction",
              header: { "content-type": "application/json", "charset": "utf-8" },
              data: {
                act: "cpjkdshsave",
                options: "ok",
                shbz: that.data.shbz,
                jkd: jkd,
                username: wx.getStorageSync('current_username')
              },
              success: function (res) {
                wx.hideLoading();
                var obj = res.data.data;
                if (obj.id == 0) {

                  wx.showModal({
                    title: '提示',
                    content: '此进库单已审核成功！',
                    showCancel: false,
                    success: function (res) {
                      wx.navigateBack();
                    }
                  })
                }
                else {
                  wx.showModal({
                    title: '此进库单审核保存失败！',
                    showCancel: false,
                    success: function (res) {
                      return;
                    }
                  })
                }
              }
            })
          }
        }
      })
    },
    onLoad: function (options) {
      var ctitle = "进仓单业务审核";
      if (options.shbz=='cwsh')
      {
        ctitle = "进仓单财务审核";
      }
      wx.setNavigationBarTitle({
        title: ctitle
      })
      var timestamp = Date.parse(new Date()) / 1000;
      //加一天的时间：  
      var n_to = 1000 * (timestamp + 24 * 60 * 60 * 2);
      var tomorrow_date = new Date(n_to);
      var that = this;
      var obj = options.obj;
      if (obj) {
        var obj = JSON.parse(options.obj);
        obj['act'] = 1;
        var listjkd = [];
        listjkd.push(obj);
        xsid = obj.xsid;
        that.setData({
          obj: obj,
          shbz: options.shbz,
          cnote:obj.cnote,
          lists: listjkd,
          jkdmx: obj.jkdmx,
          hiddenSelectWindow: true
        });
      }
      calendar.init(this, 0);
      select.init(this);
      var that = this;
      Api.queryData(that,
        {
          act: "cpjkdselectdata",
          ckid: getApp().globalData.current_l_id,
          active: 1
        }, callBackQuery
      );
      /* Api.queryData(that,
         {
           act: "cpjkdmxloc",
           xsid: xsid
         },
         callBackcpjkdmxQuery
       );*/
    }
  })
