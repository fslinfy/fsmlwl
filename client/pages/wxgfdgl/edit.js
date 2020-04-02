var fun_base64 = require('../../utils/base64.js')
var Api = require("../../utils/api.js");
var utils = require('../../utils/util');
var calendar = require("../../utils/calendar.js");
var select = require("../../utils/selectName.js");
var callBackQuery = function (res, that) {
  console.log(res.data);

  that.setData({
    selectData: res.data
  })
};
var callBackpackingQuery = function (res, that) {
  console.log(res.data);
  that.setData({
    packing: res.data.rows
  })
};
var callBackcpkcmxQuery = function (res, that) {

  var cpkcmx = res.data.rows;

  cpkcmx.forEach(function (item2, index2) {

    item2.sl = Api.slrenderer(item2.sl);
    item2.zl = Api.slrenderer(item2.zl);

  })


  that.setData({
    cpkcmx: res.data.rows
  })


};


/*var callBackworkQuery = function (res, that) {
  that.setData({
    work: res.data.rows
  })
};
var callBackcpgfdmxQuery = function (res, that) {



  var gfd = res.data.rows[0];
  console.log("xsid", gfd.xsid);
  gfd.cnote = Api.field_decode(gfd.cnote);

  var gfdmx = res.data.rows[0].gfdmx;
  var sumsl = 0;
  var sumzl = 0;

  var sumccsl = 0;
  gfdmx.forEach(function (item2, index2) {
    sumsl = sumsl + parseFloat(item2.xssl);
    sumzl = sumzl + parseFloat(item2.xszl);
    item2.xssl = parseFloat(Api.slrenderer(item2.xssl));
    item2.xszl = Api.slrenderer(item2.xszl);
    item2.mfhsl = Api.slrenderer(item2.mfhsl);
    item2.mfhzl = Api.slrenderer(item2.mfhzl);
    item2.sl = Api.slrenderer(item2.ccsl);
    item2.zl = Api.slrenderer(item2.cczl);
    item2.cpckdcw = [];
    item2.cpckdje = [];
    sumccsl = sumccsl + parseFloat(item2.ccsl);
  })
//sumccsl=0;
  if (sumccsl > 0) {
    wx.showModal({
      showCancel: false,
      title: '注意',
      content: "此过车通知单已进行发货处理！",
      success: function (res) {
        return;
      }
    })
    //    that.setData({
    //      gfd: {},
    //      gfdmx: []
    //    })
    //  return;
  } else {

    var timestamp = Date.parse(new Date()) / 1000;
    var n_to = 1000 * (timestamp + 24 * 60 * 60 * 0);
    var today = ((new Date(n_to)).toISOString()).substring(0, 10);

    if (gfd.endrq < today) {
      wx.showModal({
        showCancel: true,
        title: '注意',
        content: "此过车通知单有效期已过，是否继续发货处理？",
        success: function (res) {

          that.setData({
            gfdmx: gfdmx,
            sumsl: sumsl,
            sumzl: sumzl,
            sumccsl: sumccsl
          })

        that.callBack(res,that,gfd) ;       
        return ;
        }


      })


      return; 
    }



  }



  that.setData({
    gfdmx: gfdmx,
    sumsl: sumsl,
    sumzl: sumzl,
    sumccsl: sumccsl
  })
  that.callBack(res, that, gfd);   
  
  Api.queryData(that, {
    act: "getpackinglist",
    khid: gfd.khid
  }, callBackpackingQuery);
  

  Api.queryData(that, {
    act: "getgfdcpkcmx",
    xsid: gfd.xsid
  }, callBackcpkcmxQuery);
};*/
Page({
  data: {
    gfdmx: [],
    cpkccw: [],
    cphm: '',
    khid: 0,
    sfr: '',
    cnote: "",
    sumsl: 0,
    sumzl: 0,
    sumcwsl: 0,
    sumcwzl: 0,
    sumje: 0,
    mfhsl: 0,
    mfhzl: 0,
    sumxjje: 0,
    sumccsl: 0,
    searchvalue:"",
    hiddenCwWindow: true,
    hiddenSelectWindow: true,
    hiddencpgfdmx: false,
    calendarHidden: true,
    work_je_sum: 0,
    ckrq: '',
    datedata: {
      calendarHidden: true
    }
  },
  
  /*checkboxChange: function (a) {
    this.setData({
      Active: a.detail.value.length
    });
  },
  
  edit_save: function (e) {
    return;
  },
  */
  hiddenBtn: function (e) {
    this.setData({
      hiddenBoolean: true
    })
  },

  bindDateChange1: function (e) {
    this.setData({
      selectdate: 2
    });
    calendar.init(this, 1);
  },

  bindcancel: function (e) {
    
    var timestamp = Date.parse(new Date()) / 1000;
    var n_to = 1000 * (timestamp + 24 * 60 * 60 * 0);
    var today = ((new Date(n_to)).toISOString()).substring(0, 10);

    var gfd={};
    gfd.xsrq =today;
    
     n_to = 1000 * (timestamp + 24 * 60 * 60 * 3);
     today = ((new Date(n_to)).toISOString()).substring(0, 10);
     gfd.endrq = today;
     gfd.ckmc='';
     gfd.L_id =0 ;
     gfd.cphm='';
     gfd.sfr='';
     gfd.cnote='';
     gfd.sumsl=0;
     gfd.sumzl=0;
     
    this.setData({
      gfd:gfd,
      gfdmx:[],
      sumsl:0,
      sumzl:0,
      cphm: '',
      sfr: '',
      cnote: '',
      ckmc:'',
      L_id:0
    });
    // wx.navigateBack();
  },
  bindInputQty: function (e) {
    var that = this;
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var obj = that.data.gfdmx;
    
    obj[index].sl = parseFloat(e.detail.value);
    
      obj[index].sl = e.detail.value;
      if (obj[index].rate > 0) {
        obj[index].zl = parseFloat((e.detail.value * obj[index].rate).toFixed(3));
      }
    
    that.setData({
      gfdmx: obj
    })

    that.sumje(obj);
  },
  bindfilter: function (e) {

    //console.log(this,e.detail.value);
    select.listfilter(this,e.detail.value);
  },

  /*
  bindInputcwQty: function (e) {
    var that = this;
    // console.log(e);
    var cwccsl = e.detail.value;
    var index = e.currentTarget.dataset.index;

    var ccsl = parseFloat(e.detail.value);
    var cczl = 0;
    var gfdmx=that.data.gfdmx;
    var obj = gfdmx[index];

    if (ccsl == 0) {
      cczl = 0;
    } else {
     
        if (obj.rate > 0) {
          cczl = parseFloat((ccsl * obj.rate).toFixed(3));
        }
    }
    obj.sl = ccsl;
    obj.zl = cczl;
    gfdmx[index] = obj;
    that.setData({
      gfdmx: gfdmx
    })
    that.sumje();
    return;
    if (that.data.mfhsl < that.data.sumcwsl) {
      ccsl = ccsl + (that.data.mfhsl - that.data.sumcwsl)
      if (ccsl == 0) {
        cczl = 0;
      } else {
        if (ccsl == obj.sl) {
          cczl = obj.zl
        } else {
          if (obj.rate > 0) {
            cczl = parseFloat((ccsl * obj.rate).toFixed(3));
          } else {
            cczl = parseFloat((ccsl * obj.zl / obj.sl).toFixed(3));
          }
        }
      }
      obj.cwccsl = ccsl;
      obj.cwcczl = cczl;
      cpkccw[index] = obj;
      that.setData({
        cpkccw: cpkccw
      })
      that.sumcwccsl();

    }
  },
  bindInputcwZl: function (e) {
    var that = this;

    var cwcczl = parseFloat(e.detail.value);
    if (cwcczl == 0) return;

    var index = e.currentTarget.dataset.index;

    var cpkccw = that.data.cpkccw;
    var cczl = cwcczl;

    if (cczl > parseFloat(that.data.mfhzl)) {
      wx.showToast({
        title: '输入仓位重量不能大于可出仓重' + that.data.mfhzl,
        icon: 'none',
        duration: 2000
      })
      cczl = parseFloat(that.data.mfhzl);
    }
    var obj = cpkccw[index];

    if (cczl > parseFloat(obj.zl)) {
      wx.showToast({
        title: '输入仓位重量不能大于仓位重量' + obj.zl,
        icon: 'none',
        duration: 2000
      })
      cczl = parseFloat(obj.zl);
    }
    obj.cwcczl = cczl;
    cpkccw[index] = obj;
    that.setData({
      cpkccw: cpkccw
    })
    that.sumcwccsl();

    if (that.data.mfhzl < that.data.sumcwzl) {
      cczl = cczl + (that.data.mfhzl - that.data.sumcwzl)
      obj.cwcczl = cczl;
      cpkccw[index] = obj;
      that.setData({
        cpkccw: cpkccw
      })
      that.sumcwccsl();
    }

  },
  
  sumcwccsl: function () {
    var that = this;
    var cpkccw = that.data.cpkccw;
    var sumsl = 0;
    var sumzl = 0;
    cpkccw.forEach(function (item2, index2) {
      if (!isNaN(parseFloat(item2.cwccsl))) sumsl = sumsl + parseFloat(item2.cwccsl);
      if (!isNaN(parseFloat(item2.cwcczl))) sumzl = sumzl + parseFloat(item2.cwcczl);
    })
    sumzl = sumzl.toFixed(3);
    sumsl = sumsl.toFixed(3);

    that.setData({
      sumcwsl: Api.slrenderer(sumsl),
      sumcwzl: Api.slrenderer(sumzl)
    })

  },*/
  bindInputZl: function (e) {
    var that = this;
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var obj = that.data.gfdmx;

    ///if (parseFloat(e.detail.value) > parseFloat(obj[index].xszl)) {
     // e.detail.value = obj[index].xszl;
   // }
    if (parseFloat(e.detail.value) < 0) {
      e.detail.value = 0;
    }
    obj[index].zl = Api.slrenderer(parseFloat(e.detail.value).toFixed(3));
    //obj[index].zl = (parseFloat(e.detail.value)).toFixed(3);
    that.setData({
      gfdmx: obj
    })
    that.sumje();
  },
  sumje: function () {
    var that = this;
    var sumsl = 0;
    var sumzl = 0;
    var curzl = 0;
    var gfdmx=that.data.gfdmx;
    gfdmx.forEach(function (item2, index2) {
      if (!isNaN(parseFloat(item2.sl))) sumsl = sumsl + parseFloat(item2.sl);
      if (!isNaN(parseFloat(item2.zl))) sumzl = sumzl + parseFloat(item2.zl);
    })
    sumzl = sumzl.toFixed(3);
    sumsl = sumsl.toFixed(3);
    //if (isNaN(sumsl)) sumsl = 0;
    //if (isNaN(sumzl)) sumzl = 0;
    that.setData({

      sumsl: Api.slrenderer(sumsl),
      sumzl: Api.slrenderer(sumzl)
    })

  },
  /*
  checkboxChange: function (e) {
    console.log(e);
    var that = this;
    var jeid = e.currentTarget.dataset.jeid;
    var mxid = e.currentTarget.dataset.mxid;
    var gfdmx = that.data.gfdmx;
    gfdmx.forEach(function (item, index1) {
      if (item.mxid == mxid) {
        var jeobj = item.cpckdje;
        jeobj.forEach(function (item2, index2) {
          if (item2.jeid == jeid) {
            
            //if (item2.xjbz > 0) {
            //      item2.xjbz=0;
            //   }else{
            //      item2.xjbz = 1;
            //  }
            item2.xjbz = !item2.xjbz;
            jeobj[index2] = item2;
            console.log(item2);
          }
        })
        item.cpckdje = jeobj;
        gfdmx[index1] = item;
      }

    })
    that.setData({
      gfdmx: gfdmx
    })
    that.sumje();

  },*/
  /*
  binddeleteSelect: function (e) {
    var that = this;
    //console.log(e);
    var msg = e.currentTarget.dataset.msg;
    wx.showModal({
      title: '真的删除当前项作业内容？',
      content: msg,
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          var jeid = e.currentTarget.dataset.jeid;
          var mxid = e.currentTarget.dataset.mxid;
          var gfdmx = that.data.gfdmx;

          gfdmx.forEach(function (item, index1) {
            if (item.mxid == mxid) {
              var jeobj = item.cpckdje;
              var newobj = [];
              jeobj.forEach(function (item2, index2) {
                if (item2.jeid == jeid) { } else {
                  newobj.push(item2);
                }
              })
              item.cpckdje = newobj;
              gfdmx[index1] = item;
            }
          })
          that.setData({
            gfdmx: gfdmx
          })
          that.sumje();
        }
      }
    })
  },
  binddeletecwSelect: function (e) {
    var that = this;
    var msg = e.currentTarget.dataset.msg;
    wx.showModal({
      title: '真的删除当前项作业内容？',
      content: "仓位：" + msg,
      success: function (res) {

        if (res.confirm) {
          var cwid = e.currentTarget.dataset.cwid;
          var mxid = e.currentTarget.dataset.mxid;
          var gfdmx = that.data.gfdmx;
          var sumsl = 0;
          var sumzl = 0;

          gfdmx.forEach(function (item, index1) {
            if (item.mxid == mxid) {
              var cwobj = item.cpckdcw;
              var newobj = [];
              sumsl = 0;
              sumzl = 0;
              cwobj.forEach(function (item2, index2) {
                if (item2.cwid == cwid) { } else {
                  newobj.push(item2);
                  sumsl = sumsl + item2.sl;
                  sumzl = sumzl + item2.zl;
                }
              })
              item.cwccsl = sumsl;
              item.sl = sumsl;
              item.cwcczl = sumsl;
              item.zl = sumsl;

              item.cpckdcw = newobj;
              gfdmx[index1] = item;
            }
          })
          that.setData({
            gfdmx: gfdmx
          })
          that.sumcwccsl();

        }
      }
    })
  },
  bindInputjesl: function (e) {
    var that = this;
    var jeid = e.currentTarget.dataset.jeid;
    var mxid = e.currentTarget.dataset.mxid;
    var inlb = e.currentTarget.dataset.inlb;
    var gfdmx = that.data.gfdmx;
    gfdmx.forEach(function (item, index1) {
      if (item.mxid == mxid) {
        var jeobj = item.cpckdje;
        jeobj.forEach(function (item2, index2) {
          if (item2.jeid == jeid) {
            if (inlb == 'sl') {
              item2.sl = Api.slrenderer(parseFloat(e.detail.value).toFixed(3));
            } else {
              item2.dj = Api.slrenderer(parseFloat(e.detail.value).toFixed(2));
            }
            item2.je = parseFloat(item2.sl * item2.dj).toFixed(2);
            jeobj[index2] = item2;
          }
        })
        item.cpckdje = jeobj;
        gfdmx[index1] = item;
      }
    })
    that.setData({
      gfdmx: gfdmx
    })
    that.sumje();
  },
  selectcwBtn: function (e) {
    //    console.log('保存仓位出仓数据');
    var that = this;
    var mxid = that.data.mxid;
    var index = that.data.index;
    var cpkccw = that.data.cpkccw;
    var cpckdcw = [];
    var obj = {};
    var sumsl = 0;
    var sumzl = 0;
    cpkccw.forEach(function (item, index1) {
      if (item.cwccsl > 0) {
        obj = {};
        obj.cwid = parseInt(Math.random() * 9999999);
        obj.area = item.area;
        obj.mxid = mxid;
        obj.kcmxid = item.mxkcid;
        obj.cw = item.cw;
        obj.sm = item.sm;
        obj.dw = item.jldw;
        obj.cpph = item.cpph;
        obj.czdj = item.czdj;
        obj.czrq = item.czrq;
        obj.sl = item.cwccsl;
        obj.zl = item.cwcczl;
        obj.mints = 1;
        cpckdcw.push(obj);
        sumsl = sumsl + item.cwccsl;
        sumzl = sumzl + item.cwcczl;
      }
    })
    var gfdmx = that.data.gfdmx;
    var cwobj = gfdmx[index];
    cwobj.cpckdcw = cpckdcw;
    cwobj.sl = that.data.sumcwsl;
    cwobj.zl = that.data.sumcwzl;
    cwobj.cwccsl = that.data.sumcwsl;
    cwobj.cwcczl = that.data.sumcwzl;
    gfdmx[index] = cwobj;
    that.setData({
      hiddenCwWindow: true,
      gfdmx: gfdmx
    });
    //console.log(gfdmx);
    that.sumslzl(gfdmx);
    return;
  },
  selectCancelCwBtn: function (e) {
    var that = this;
    that.setData({
      hiddenCwWindow: true
    });
    return;
  },

  cwccslBtn: function (e) {
    var that = this;
    var sl = parseFloat(e.currentTarget.dataset.cwccsl);
    //console.log(e,sl);

    if (isNaN(sl)) sl = 0;
    if (sl == null) sl = 0;

    if (sl > 0) return;



    var ccsl = that.data.mfhsl - that.data.sumcwsl;
    if (ccsl == 0) return;


    var index = e.currentTarget.dataset.index;
    console.log(sl, ccsl, index);


    var cpkccw = that.data.cpkccw;

    var cczl = 0;
    var obj = cpkccw[index];

    if (ccsl > parseFloat(obj.sl)) {
      ccsl = parseFloat(obj.sl);
    }




    if (ccsl == 0) {
      cczl = 0;
    } else {
      if (ccsl == obj.sl) {
        cczl = obj.zl
      } else {
        if (obj.rate > 0) {
          cczl = parseFloat((ccsl * obj.rate).toFixed(3));
        } else {
          cczl = parseFloat((ccsl * obj.zl / obj.sl).toFixed(3));
        }
      }
    }
    obj.cwccsl = ccsl;
    obj.cwcczl = cczl;
    cpkccw[index] = obj;
    that.setData({
      cpkccw: cpkccw
    })
    that.sumcwccsl();
  },
  */
  /*
  callBack:function (res, that,gfd) {

    that.setData({
      gfd: gfd,
      cnote: gfd.cnote,
      hiddencpgfdmx: false,
      cphm: gfd.cphm,
      thr: gfd.sfr,
      khid: gfd.khid
    })

    Api.queryData(that, {
      act: "getpackinglist",
      khid: gfd.khid
    }, callBackpackingQuery);

    Api.queryData(that, {
      act: "getgfdcpkcmx",
      xsid: gfd.xsid
    }, callBackcpkcmxQuery);


  },
  

  sumje: function () {
    var that = this;
    var sumsl = 0;
    var sumzl = 0;
    var gfdmx = that.data.gfdmx;
    gfdmx.forEach(function (item, index1) {
      sumsl = sumsl + parseFloat(item.sl);
      sumzl = sumzl + parseFloat(item.zl);
    })
    that.setData({
      sumsl: Api.slrenderer(sumsl),
      sumzl: Api.slrenderer(sumzl)
    })
  },
*/
  bindRemoveSelect: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var gfdmx=that.data.gfdmx;
    gfdmx.splice(index,1); 
    that.setData({
     gfdmx:gfdmx
    })
    that.sumje();
  },
  /*
  bindcwSelect: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var mfhsl = e.currentTarget.dataset.mfhsl;
    var mfhzl = e.currentTarget.dataset.mfhzl;
    var mxid = e.currentTarget.dataset.mxid;
    var kcid = e.currentTarget.dataset.kcid;
    var cpkcmx = that.data.cpkcmx;
    var cpkccw = [];
    //console.log(mxid,kcid);
    cpkcmx.forEach(function (item, index1) {
      if (item.kcid == kcid) {
        item.cwccsl = 0;
        item.cwcczl = 0
        cpkccw.push(item);
      }
    })

    that.setData({
      hiddenCwWindow: false,
      mxid: mxid,
      mfhsl: mfhsl,
      mfhzl: mfhzl,
      index: index,
      sumcwsl: 0,
      sumcwzl: 0,
      cpkccw: cpkccw
    });
  },*/

  //******  select name option   ************************ */
  selectCancelBtn: function (e) {
    select.hiddenSelectWindow(this);

  },
  selectBtn: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    var index = e.currentTarget.dataset.index;
    //var name = select.check(e, that);
    //if (name == "true") return;
    var selecttype = that.data.selectType;
  //  var index = that.data.index;
    var   gfd=that.data.gfd;
    console.log(id, name, index, selecttype);
  //  var mxobj = that.data.obj;
  //    var obj = {};
  //    obj.ckmxid = 0;
  //  obj.jeid = parseInt(Math.random() * 9999999);
   //   obj.mxid = mxobj.mxid;


    switch (selecttype) {
      /*case "work":
        obj.workid = id;
        obj.work = name;
        obj.sl = mxobj.zl;
        var work = that.data.work;
        var workobj = {};
        work.forEach(function (item2, index2) {
          if (item2.id == id) {
            workobj = item2;
            obj.zljs = item2.Weight_status;
          }
        });
        var packing = that.data.packing;
        packing.forEach(function (item, index2) {
          if (item.PS_id == mxobj.bzid) {
            switch (id) {
              case '1':
                obj.dj = item.Bydj0
                //  console.log(id,item);
                break;
              case '2':
                obj.dj = item.Pbdj0
                break;
              case '3':
                obj.dj = item.Ghdj0
                break;
              default:
                obj.dj = workobj.Unit_price
                break;
            }
            if (obj.zljs > 0) {
              obj.dw = item.Weight_Unit;
            } else {
              obj.dw = item.Quantity_Unit;
            }
          }
        })
        if (obj.zljs == 0) {
          obj.sl = mxobj.sl;
        }
        if (workobj.Quantity_in > 0) {
          obj.sl = 0;
        }

        obj.xjbz = 0;
        if (that.data.gfd.xjbz > 0) {
          obj.xjbz = 1;
        }
        obj.area = "";
        obj.byg = "";
        obj.gs = "";
        obj.cg = "";
        obj.je = parseFloat(obj.sl * obj.dj).toFixed(2);
        var gfdmx = that.data.gfdmx;
        var mx = gfdmx[index];
        var mxje = mx.cpckdje;
        var jeobj = [];
        mxje.forEach(function (item, index2) {
          jeobj.push(item);
        })
        jeobj.push(obj);
        mx.cpckdje = jeobj;
        gfdmx[index] = mx;
        //          console.log(gfdmx,jeobj);
        that.setData({
          gfdmx: gfdmx
        });
        that.sumje();
        break;
        */
      case "sfr":
        that.setData({
          sfr: name
        });
        break;
      case "cphm":
        var list = that.data.selectData.cphm;
        var sfr='';
        list.forEach(function (item, index2) {
          if ((item.Name == name)&&(sfr.length==0)) {
            sfr=item.thr;
            //console.log(item);
          }
          });  
        
        gfd.cphm=name;

        gfd.sfr=sfr;
        that.setData({
          gfd: gfd
        });
        break;
      case "ckmc":
        gfd.ckmc = name;
        gfd.L_id=id;
        that.setData({
          gfd: gfd,
          L_id:id
        });
        break;
      case "cpmc":
        var obj={}; 
        obj.cpmc=name;
        obj.cdmc ='';
        obj.bzmc ='';
        obj.cpgg= '';
        obj.jldw = '包';
        obj.zljs=1;
        obj.sl=0;
        obj.zl=0;
        obj.rate =0.025;

        var gfdmx = that.data.gfdmx;
       
        gfdmx.push(obj);
        that.setData({
          gfdmx: gfdmx
        });

        break;
      case "cdmc":
        var gfdmx=that.data.gfdmx;
        var itemindex = that.data.index;
        var obj =gfdmx[itemindex];
        obj.cdmc = name;
        gfdmx[itemindex]=obj;
        that.setData({
          gfdmx: gfdmx
        });
        break;
      case "bzmc":
        var packing=that.data.packing;

        var gfdmx = that.data.gfdmx;
        var itemindex = that.data.index;
        var obj = gfdmx[itemindex];
        obj.bzmc = name;

        packing.forEach(function (item2, index2) {
          if (item2.PS_id == id) {
            obj.jldw = item2.Quantity_Unit;
            
            obj['rate']= item2.Rate;
           // console.log('jldw', obj.jldw, obj);
          }
        });  

        gfdmx[itemindex] = obj;
        that.setData({
          gfdmx: gfdmx
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
    obj["searchList"] = list;
    obj["searchvalue"] = '';
    obj["needsearch"] =false;
    that.setData({
      selectType: "ckmc"
    });
    select.showSelectWindow(that, obj, false);
  },
  bindcphmSelect: function (e) {
    var that = this;
    var list = that.data.selectData.cphm;
    // var index = e.currentTarget.dataset.index;
    var obj = {};
    obj["selectTitle"] = "选择车牌";
    obj["nameList"] = list;
    obj["searchList"] = list;
    obj["searchvalue"] = '';
    if (list.length>20){
      obj["needsearch"] = true;
    }else{
      obj["needsearch"] = false;
    } 
    


    that.setData({
      selectType: "cphm" 
   
    });
    select.showSelectWindow(that, obj, false);
  },
  bindcpmcSelect: function (e) {
    var that = this;
    var list = that.data.selectData.cpmc;
    // var index = e.currentTarget.dataset.index;
    var obj = {};
    obj["selectTitle"] = "选择商品";
    obj["searchList"] = list;
    obj["nameList"] = list;
    obj["searchvalue"] = '';
    obj["needsearch"] = true;

    that.setData({
      selectType: "cpmc"

    });
    select.showSelectWindow(that, obj, false);
  },

  bindcdmcSelect: function (e) {
    var that = this;
    var list = that.data.selectData.cdmc;
    var index = e.currentTarget.dataset.index;
    var obj = {};
    obj["selectTitle"] = "选择商品产地";
    obj["nameList"] = list;
    obj["searchList"] = list;
    obj["searchvalue"] = '';
    obj["needsearch"] = true;
    that.setData({
      selectType: "cdmc" , index: index
    });
    select.showSelectWindow(that, obj, false);
  },

  bindbzmcSelect: function (e) {
    var that = this;
    var packing = that.data.packing;
    var list = [];
    var obj = {};
    packing.forEach(function (item, index) {
        obj = {};
        obj['Id']=item.PS_id;
        obj['Name'] = item.PS_name;
        list.push(obj);
      
    })
    obj={};
    var index = e.currentTarget.dataset.index;
    
    obj["selectTitle"] = "选择商品包装规格";
    obj["nameList"] = list;
    obj["searchList"] = list;
    obj["searchvalue"] = '';
    obj["needsearch"] = true;
    that.setData({
      selectType: "bzmc", index: index
    });
    select.showSelectWindow(that, obj, false);
  },

  bindsfrSelect: function (e) {
    var that = this;
    var cphm = that.data.gfd.cphm;
    if (cphm.length == 0) {
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
    obj["searchList"] = newlist;
    obj["searchvalue"] = '';
    obj["needsearch"] = false;
    that.setData({
      selectType: "sfr"//, index: index
    });
    select.showSelectWindow(that, obj, false);
  },
  /*
  bindworkSelect: function (e) {
    var that = this;
    //console.log(e);
    var mxobj = e.currentTarget.dataset.obj;
    var index = e.currentTarget.dataset.index;
    var list = that.data.work;
    var newlist = new Array();
    list.forEach(function (item, index) {
      //if (item.cphm == cphm) {
      newlist.push({
        Id: item.id,
        Name: item.Jobsname,
        e
      });
      // }
    })
    var mxid = mxobj.mxid;
    var obj = {};
    obj["selectTitle"] = "选择机械作业";
    obj["nameList"] = newlist;
    that.setData({
      selectType: "work",
      index: index,
      obj: mxobj,
      mxid: mxid
    });
    select.showSelectWindow(that, obj, false);
  },
  */
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
    var gfd = vm.data.gfd;
    obj["calendarHidden"] = true;
    obj["selectedDate"] = (e.currentTarget.dataset.date.value).replace('/', '-').replace('/', '-');

    var timestamp = Date.parse(new Date()) / 1000;
    var n_to = 1000 * (timestamp + 24 * 60 * 60 * 0);
    var today = ((new Date(n_to)).toISOString()).substring(0, 10);
    if (vm.data.selectdate == 1) {
      obj["ckrq"] = obj["selectedDate"];
      // obj["endrq"] = vm.data.endrq;
      // var endDate = obj["xsrq"];
      //if (today != "" && endDate != "" && Api.daysBetween(endDate,today)>0) {

      /*if (Api.daysBetween(endDate, today) > 0) {  
        wx.showToast({
          title: '开单日期不能大于今天！',
          icon: 'none',
          duration: 2000
        })
        return false;
      }*/
    } else {
      //obj["xsrq"] = vm.data.xsrq;
      gfd["endrq"] = obj["selectedDate"];
      

      //var endDate = obj["endrq"];
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
      gfd: gfd,
      datedata:obj,
      calendarHidden: obj["calendarHidden"]
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

  
/*
  searchSubmit: function (e) {
    var that = this;
    var thdh = e.detail.value.thdh;
    thdh = "MLX2019-02041";
    if (thdh == "") {
      return;
    }
    console.log(thdh, e.detail);

    
    Api.queryData(that, {
      act: "cpckdgl",
      loc: "getgfd",
      gfdh: thdh
    },
   //   callBackcpgfdmxQuery
    );
    
  },
*/

  //提交事件
  evaSubmit: function (eee) {
    var obj_base64 = new fun_base64.Base64();
    console.log('提交事件', eee);
    var obj_base64 = new fun_base64.Base64();
    // if (!Api.checkTime(1)) return;
    Api.saveFormId(eee.detail.formId, wx.getStorageSync('current_openid'));
    var that = this;
    //提交(自定义的get方法)
    if (getApp().globalData.current_edit < 1) {
      wx.showModal({
        showCancel: false,
        title: '注意',
        content: "用户没有过车通知单编辑权限！",
        success: function (res) {
          return;
        }
      })
      return;
    }
    var xsd = that.data.gfd;
    var ckmc=xsd.ckmc;
    if (ckmc.length==0){
    wx.showModal({
      showCancel: false,
      title: '注意',
      content: "用选择过货仓库！",
      success: function (res) {
        return;
      }
    })
    return;
    }
    var userinfo = getApp().globalData.userInfo



    var xsdmx = that.data.gfdmx;
    var gfd={};
    
    
    
    var gfdmx = [];
    
    var miss = 0;
    var rows = 0;
    var sumsl=0;
    var sumzl = 0;
    xsdmx.forEach(function (item, index) {
      if (item.sl > 0) {
        rows=1;
        var obj={};
        obj.cpmc=item.cpmc ;
        obj.cdmc = item.cdmc; 
        obj.bzmc = item.bzmc ;
        obj.sl = item.sl;
        obj.jldw = item.jldw;
        obj.zl = item.zl ;  
        sumsl = sumsl + parseFloat(item.sl);
        sumzl = sumzl + parseFloat(item.zl);

        gfdmx.push(obj);
      }
    })
    if (rows == 0) {
      wx.showModal({
        showCancel: false,
        title: '注意',
        content: "请输入过货商品明细内容！",
        success: function (res) {
          return;
        }
      })
      return;
    }

    var sfr = eee.detail.value.sfr;


    var cphm = eee.detail.value.cphm;

    var cnote = that.data.cnote;



   // if (!Api.checkField(cnote, '备注')) return;
   // if (!Api.checkField(sfr, '提货人')) return;
   // if (!Api.checkField(cphm, '车牌号码')) return;

    cnote = Api.field_encode(cnote);
    cphm = Api.field_encode(cphm);
    sfr = Api.field_encode(sfr);
   

 //console.log(cphm,sfr,cnote);

//return ;


    gfd.ckmc = xsd.ckmc;
    gfd.L_id = xsd.L_id;
    gfd.kdrq = xsd.xsrq;
    gfd.endrq = xsd.endrq;
    gfd.cphm = cphm;
    gfd.sfr = sfr;
    gfd.khid = getApp().globalData.current_khid;
    gfd.khmc = getApp().globalData.current_khmc;

    gfd.khsl = sumsl;
    gfd.khzl = sumzl;
    gfd.cnote = cnote;
    gfd.khczy = getApp().globalData.current_username;
    gfd.gfdmx=gfdmx;
    



    wx.showActionSheet(
      {
        itemList: ['装卸费用公司月结', '装卸费用司机付现'],
        success: function (res) {


          gfd['xjbz'] = res.tapIndex;
          console.log(gfd);         
            
          var gfdstr = JSON.stringify(gfd);


          var strings = obj_base64.encode(gfdstr);

          wx.showLoading({
            title: 'save...',
          })
          wx.request({
            url: getApp().globalData.servsers + "/mysqlwxaction",
            header: { "content-type": "application/json", "charset": "utf-8" },
            data: {
              act: "cpgfdmxsave",
              data: strings,
              userinfo: userinfo
            },
            success: function (res) {
              wx.hideLoading();
              var obj = res.data;
              if (obj.result == "success") {
                if (obj.dh == '') {
                  wx.showModal({
                    title: '',
                    content: '此过车通知单已保存失败！',
                    showCancel: false,
                    success: function (res) {
                      return;
                    }
                  })
                } else {
                  wx.showModal({
                    title: '此过车通知单已保存！',
                    content: '过车通知单号：' + obj.dh,
                    showCancel: false,
                    success: function (res) {
                      //wx.navigateBack();
                      that.bindcancel()
                    }
                  })
                }
              }
              else {
                wx.showModal({
                  title: '此过车通知单保存失败！',
                  content: '信息：' + res.data,
                  showCancel: false,
                  success: function (res) {
                    return;
                  }
                })
              }
            },
            fail: function (res) {
              wx.showModal({
                title: '注意',
                content: '此过车通知单保存失败！' ,
                showCancel: false,
                success: function (res) {
                  return;
                }
              })
            }
          })
          
      }

    })
  
  },

  onLoad: function (options) {
       
    if (!Api.checkTime(1)) return; 
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
    //      n_to = 1000 * (timestamp + 24 * 60 * 60 * 2);

    //   var tomorrow_date = new Date(n_to);
    var that = this;

    calendar.init(this, 0);
    select.init(this);
    
    var that = this;
    Api.queryData(that, {
      act: "cpgfdselectdata",
      khid: getApp().globalData.current_khid,
      active: 1
    }, callBackQuery);
  //  Api.queryData(that, {
  //    act: "getworklist"
  //  }, callBackworkQuery);


    Api.queryData(that, {
      act: "getpackinglist",
      khid: getApp().globalData.current_khid
    }, callBackpackingQuery);
    this.bindcancel();
  }

})