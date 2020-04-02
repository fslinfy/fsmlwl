var fun_base64 = require('../../../utils/base64.js')
var Api = require("../../../utils/api.js");
var utils = require('../../../utils/util');
var calendar = require("../../../utils/calendar.js");
// var select = require("../../../utils/selectName.js");
/*
var callBackQuery = function (res, that) {
  
  that.setData({
    selectData: res.data
  })
};
*/

var callBackkhmcQuery = function (res, that) {
  console.log(res);
  that.setData({
    khmclist: res.data.rows
  })
};

Page(
  {
    data: {
      obj: {},
      xsdmx: [],
      ckid: 0,
      ckmc: '',
      newkhid: '',
      newkhmc: '',
      cnote: "",
      widowHeight: 1,
      Quantity_sum: 0,
      Weight_sum: 0,
      sumsl: 0,
      sumzl: 0,
      jebz: 0,
      hiddenSelectWindow: true,
      calendarHidden: true,
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
      this.setData({
        selectdate: 2
      });
      calendar.init(this, 1);
    },
    bindcancel: function (e) {
      wx.navigateBack();
    },
    bindInputnewkhid: function (e) {
      var that = this;
      if ((e.detail.value).length ==0) {
        return
      }
      var newkhid = parseInt(e.detail.value);

      if (newkhid == getApp().globalData.current_khid) {
        wx.showModal({
          title: '注意！',
          content: '不能输入当前客户ID！',
          showCancel: false,
          success: function (res) {
            that.setData({
              newkhid: '',
              newkhmc: ''
            });
          }
        })
      }

      var list = that.data.khmclist;
      var mc = "";
      list.forEach(function (item, index) {
        if (item.Id == newkhid) {
          mc = item.Name;
          that.setData({
            newkhid: newkhid,
            newkhmc: mc
          });
        }
      })
      if (mc.length > 0) {
        return
      }
      wx.showModal({
        title: '注意！',
        content: '此客户ID不存在！',
        showCancel: false,
        success: function (res) {
          that.setData({
            newkhid: '',
            newkhmc: ''
          });
        }
      })
    },
    bindInputQty: function (e) {
      var that = this;
      var index = e.currentTarget.dataset.index;
      var obj = that.data.xsdmx;
      if (parseFloat(e.detail.value) > parseFloat(obj[index].kcsl)) {
        wx.showToast({
          title: '输入数量不能大于可开票数量' + obj[index].kcsl,
          icon: 'none',
          duration: 2000
        })
        e.detail.value = obj[index].kcsl;
      }
      obj[index].sl = parseFloat(e.detail.value);
      if (obj[index].kcsl == 0) {
        obj[index].zl = 0;
        obj[index].sl = 0;
      } else {
        obj[index].sl = e.detail.value;
        if (obj[index].rate > 0) {
          obj[index].zl = parseFloat((e.detail.value * obj[index].rate).toFixed(3));
        }
        else {
          obj[index].zl = parseFloat((e.detail.value * obj[index].kczl / obj[index].kcsl).toFixed(3));
        }
      }


      //that.setData({
      //  xsdmx: obj
      //})

      that.sumslzl(obj);
    },

    bindInputZl: function (e) {
      var that = this;
      var index = e.currentTarget.dataset.index;
      var obj = that.data.xsdmx;
      if (parseFloat(e.detail.value) > parseFloat(obj[index].kczl)) {
        e.detail.value = obj[index].kczl;
      }
      if (parseFloat(e.detail.value) < 0) {
        e.detail.value = 0;
      }
      obj[index].zl = Api.slrenderer(parseFloat(e.detail.value).toFixed(3));
      //obj[index].zl = (parseFloat(e.detail.value)).toFixed(3);
      //that.setData({
      //  xsdmx: obj
      //})
      that.sumslzl(obj);
    },
    sumslzl: function (o) {
      var that = this;
      var sumsl = 0;
      var sumzl = 0;
      var curzl = 0;
      o.forEach(function (item2, index2) {
        if (!isNaN(parseFloat(item2.sl))) sumsl = sumsl + parseFloat(item2.sl);
        if (!isNaN(parseFloat(item2.zl))) sumzl = sumzl + parseFloat(item2.zl);
      })
      sumzl = sumzl.toFixed(3);
      sumsl = sumsl.toFixed(3);
      //if (isNaN(sumsl)) sumsl = 0;
      //if (isNaN(sumzl)) sumzl = 0;
      that.setData({
        xsdmx: o,
        sumsl: Api.slrenderer(sumsl),
        sumzl: Api.slrenderer(sumzl)
      })

    },
    binddeletecp: function (e) {
      var that = this;
      var obj = e.currentTarget.dataset.obj;
      var index = obj.kcid
      var msg = '产地：' + obj.cdmc + ',商品名称:' + obj.cpmc;
      msg = '商品名称:' + obj.cpmc;
      wx.showModal({
        title: '真的删除当前记录？',
        content: msg,
        success: function (res) {
          if (res.confirm) {
            var xsdmx = that.data.xsdmx;
            var newlist = new Array();
            xsdmx.forEach(function (item, index2) {
              if (item.kcid != index) {
                newlist.push(item);
              }
            })
            //that.setData({
            //  xsdmx: newlist
            //});
            that.sumslzl(newlist);
          }
        }
      })
    },
    //******  select name option   ************************ */
    selectCancelBtn: function (e) {
      select.hiddenSelectWindow(this);

    },
    /*
    selectBtn: function (e) {
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
     // var index = e.currentTarget.dataset.index;
      var obj = {};
      obj["selectTitle"] = "选择车牌";
      obj["nameList"] = list;
      that.setData({
        selectType: "cphm"//, index: index
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
      //var index = e.currentTarget.dataset.index;
      var obj = {};
      obj["selectTitle"] = "选择司机";
      obj["nameList"] = newlist;
      that.setData({
        selectType: "sfr"//, index: index
      });
      select.showSelectWindow(that, obj, false);
    },*/
    //******  select name  end  ************************ */
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
        }*/
      }
      else {
        obj["xsrq"] = vm.data.xsrq;
        obj["endrq"] = obj["selectedDate"];

        var endDate = obj["endrq"];
        /* 
        if (today != "" && endDate != "" && Api.daysBetween(today,endDate)>0 ) {
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
    evaSubmit: function (eee) {
      var obj_base64 = new fun_base64.Base64();








      if (!Api.checkTime(1)) return;
      Api.saveFormId(eee.detail.formId, wx.getStorageSync('current_openid'));
      var that = this;
      //提交(自定义的get方法)
      if (getApp().globalData.current_edit < 1) {
        wx.showModal({
          showCancel: false,
          title: '注意',
          content: "用户没有过户单编辑权限！",
          success: function (res) {
            return;
          }
        })
        return;
      }
      var newkhid = parseInt(that.data.newkhid);
      if (newkhid==0) {
        wx.showModal({
          showCancel: false,
          title: '注意',
          content: "请输入接受货物的客户ID" ,
          success: function (res) {
            return;
          }
        })
        return;
      }




      var list = that.data.xsdmx;
      var newlist = new Array();
      var rows = 0;
      var miss = 0;
      var cpmc = "";
      list.forEach(function (item, index) {
        if (item.sl > 0) {
          rows = rows + 1;
          newlist.push(item);
        }
        else {
          miss = miss + 1;
          cpmc = item.cpmc;
        }
      })
      if (miss > 0) {
        wx.showModal({
          showCancel: false,
          title: '注意输入商品开单数量',
          content: "商品:" + cpmc,
          success: function (res) {
            return;
          }
        })
        return;
      }
      if (rows == 0) {
        wx.showModal({
          showCancel: false,
          title: '注意',
          content: "请输入商品明细内容！",
          success: function (res) {
            return;
          }
        })
        return;
      }




      var cnote = that.data.cnote;



      if (!Api.checkField(cnote, '备注')) return;

      cnote = Api.field_encode(cnote);


      //return;
      var xsd = {};
      xsd['ckid'] = that.data.ckid;
      xsd['ckmc'] = that.data.ckmc;
      xsd['newkhid'] =that.data.newkhid;
      xsd['newkhmc'] = that.data.newkhmc;

      xsd['cpgg'] = '';
      xsd['jebz'] = that.data.jebz;

      xsd['xsrq'] = that.data.xsrq;
      xsd['endrq'] = that.data.endrq;
      xsd['cnote'] = cnote;
      var userinfo = getApp().globalData.userInfo
      xsd['czy'] = getApp().globalData.current_username;
      xsd['khkd'] = 2;
      xsd['khid'] = getApp().globalData.current_khid,
      xsd['sm'] = 2;
      xsd['xjbz'] = 0;
      //if (res.confirm) {
      //  xsd['xjbz'] = 0;
      //} else {
      //  xsd['xjbz'] = 1;
      //}

      //xsd['xjbz'] = res.tapIndex;
      xsd['cpxsdmx'] = newlist;
      console.log(xsd);



      var xsdstr = JSON.stringify(xsd);


      var strings = obj_base64.encode(xsdstr);

      wx.showLoading({
        title: 'save...',
      })
      wx.request({
        url: getApp().globalData.servsers + "/mysqlwxaction",
        header: { "content-type": "application/json", "charset": "utf-8" },
        data: {
          act: "wxghdmxsave",
          data: strings,
          userinfo: userinfo
        },
        success: function (res) {
          wx.hideLoading();
          // Api.saveResoult(res);
          //var obj =JSON.parse(res.data);
          var obj = res.data;
          if (obj.result == "success") {
            if (obj.dh == '') {
              wx.showModal({
                title: '',
                content: '此过户单保存失败！',
                showCancel: false,
                success: function (res) {
                  return;
                }
              })
            } else {
              wx.showModal({
                title: '此过户单已保存！',
                content: '过户单号：' + obj.dh,
                showCancel: false,
                success: function (res) {
                  wx.navigateBack();
                }
              })
            }
          }
          else {
            wx.showModal({
              title: '此过户单保存失败！',
              content: '信息：' + res.data,
              showCancel: false,
              success: function (res) {
                return;
              }
            })
          }
        },
        fail: function (res) {
          return;
        }
      })
      return;





/*      wx.showActionSheet(
        {
          itemList: ['装卸费用公司月结', '装卸费用司机付现'],
          success: function (res) {

          }
        })*/
    },

    onLoad: function (options) {
      //   if (!Api.checkTime(1)) return; 
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var date = d.getDate();
      var today = year + "-" + month + "-" + date;

      var startdate = new Date(today.replace(/-/g, "/"));
      var timestamp = Date.parse(startdate) / 1000;
      var n_to = 1000 * (timestamp + 24 * 60 * 60);
      today = ((new Date(n_to)).toISOString()).substring(0, 10);

      timestamp = Date.parse(new Date()) / 1000;
      //加一天的时间：  
      n_to = 1000 * (timestamp + 24 * 60 * 60 * 2);

      var tomorrow_date = new Date(n_to);
      var that = this;
      var obj = options.obj;

      if (obj) {
        var obj = JSON.parse(options.obj);
        that.setData({
          obj: obj,
          xsdmx: obj.cp,
          Active: obj.Active,
          ckmc: obj.ckmc,
          ckid: obj.ckid,
          newkhid: '',
          newkhmc: '',
          cnote: '',
          jebz: 0,
          xsrq: today,
          endrq: (tomorrow_date.toISOString()).substring(0, 10)
        });
      }
      calendar.init(this, 0);
      //select.init(this);
      var that = this;
      /*  Api.queryData(that,
          {
            act: "cpckdselectdata",
            khid: getApp().globalData.current_khid,
            active: 1
          }, callBackQuery
        );
        */
      console.log('aaaaaaaaaaaaaa')
      Api.queryData(that,
        {
          act: "khmclist"
        }, callBackkhmcQuery
      );
    }
  }
)
