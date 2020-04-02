var Api = require("../../utils/api.js");
var fun_base64 = require('../../utils/base64.js')
var utils = require('../../utils/util');
var calendar = require("../../utils/calendar.js");
var select = require("../../utils/selectName.js");
var timestamp = Date.parse(new Date()) / 1000;
//加一天的时间：  
var n_to = 1000 * (timestamp - 24 * 60 * 60 * 3);
var startdate = ((new Date(n_to)).toISOString()).substring(0, 10);
var enddate = ((new Date()).toISOString()).substring(0, 10);
var khid = 0;
var callBackQuery = function(res, that) {

  var obj = res.data.rows;
  //console.log('obj', obj);
  obj.forEach(function(item, index) {
    item['cnote'] = Api.field_decode(item.cnote); // item.cnote.split('&~~').join('\n');
    var ckdmx = item.ckdmx;

    ckdmx.forEach(function(item2, index2) {
      if (item2.jeid > 0) {
        item2.jcje = Api.slrenderer(item2.jcje);
        item2.jczl = Api.slrenderer(item2.jczl);
        item2.czdj = Api.slrenderer(item2.czdj);

      } else {
        item2.ccsl = Api.slrenderer(item2.ccsl);
        item2.cczl = Api.slrenderer(item2.cczl);
      }

    })
    item['ckdmx'] = ckdmx;
  });
  //  that.setData({
  //   lists: obj
  // })

  //console.log('obj', obj);


  that.pagedList = that.pageList(obj);
  that.setData({
    listLength: obj.length,
    list: [that.pagedList[0]]
  })
  wx.hideLoading();

};
var callBackkhmcQuery = function(res, that) {
  that.setData({
    khmclist: res.data.rows
  })
};

Page({
  data: {
    hidden: true,
    rq1: startdate,
    rq2: enddate,
    curkhid: getApp().globalData.current_khid,
    khmc: '',
    ckid: 0,
    khid: 0,
    hiddenBoolean: true,
    options: {
      hiddenSelectWindow: true
    },
    datedata: {
      calendarHidden: true
    },
    currentPage: 0,
    pageFrame: []
  },
  pageSize: 10,
  currentPage: 0,

  /* onLoad: function () {
     //mock 一些数据
     var list = [];
     for (var i = 0; i < 10000; i++) {
        list.push({
             name: 'ssss----' + i,
             desc: 'aaaaa----' + i,
          content: 'content  row ----' + i
         });
     }
     //数据分页
     //console.log(list);
     this.pagedList = this.pageList(list);
     this.setData({
       listLength: list.length,
       list: [this.pagedList[0]]
     })
   },*/
  //滚动监听
  onListScroll(e) {
    Api.pageListScroll(e,this);
    /*
    if (this.inPageUpdate) {
      
      return;
    }
    //console.log("e", e, this.inPageUpdate, this.currentPage);

    var {
      scrollTop
    } = e.detail;

    if (this.currentPage > 0) {
      var pageFrame = this.data.pageFrame[this.currentPage - 1];
        
      if (pageFrame) {  //向后
        var screenHeight = wx.getSystemInfoSync().screenHeight;
        if ((scrollTop + screenHeight) - (pageFrame.lastBottom + pageFrame.height) < -200) {
          this.inPageUpdate = true;
          this.currentPage -= 1;
          this.setData({
              currentPage: this.currentPage,
            },
            () => {
              this.inPageUpdate = false;
            })
           return;
        }
      }
    }
    var currentPageFrame = this.data.pageFrame[this.currentPage];
    if (currentPageFrame) {
      if (scrollTop - (currentPageFrame.lastBottom + currentPageFrame.height) > 200) {
        this.inPageUpdate = true;
        this.currentPage += 1;
        this.setData({
          currentPage: this.currentPage,
        }, () => {
          this.inPageUpdate = false;
        })
      }
    }*/
  },
  //计算分页高度
  reachPageBottom() {
    Api.reachPageBottom(this);
    /*
    if (this.inPageUpdate) {
      return;
    }
    this.inPageUpdate = true;
    if (this.currentPage < this.pagedList.length - 1) {
      var self = this;
      var currentPage = this.currentPage;
      wx.createSelectorQuery().select('#listpage-' + this.currentPage).boundingClientRect(function(rect) {
        if (currentPage > 0) {
          rect.lastBottom = self.data.pageFrame[currentPage - 1].height + self.data.pageFrame[currentPage - 1].lastBottom
        } else {
          rect.lastBottom = 0;
        }
        self.setData({
          [`pageFrame[${currentPage}]`]: rect
        })
      }).exec();

      this.currentPage = this.currentPage + 1;
      var nextPage = this.pagedList[this.currentPage];
      var key = `list[${this.currentPage}]`
      var data = {};
      data[key] = nextPage;
      data.currentPage = this.currentPage;
      //  console.log(data);
      this.setData(data, () => {
        this.inPageUpdate = false;
      });
    } else {
      this.setData({
        pageEnd: true,
      }, () => {
        this.inPageUpdate = false;
      })
    }
*/
  },
  listItemTap(e) {
    //响应点击事件

    console.log(e.currentTarget.dataset);
  },
  //分页函数
  pageList(list) {
    return Api.pageList(list,this);
    /*
    var splitArray = (arr, len) => {
      var a_len = arr.length;
      var result = [];
      for (var i = 0; i < a_len; i += len) {
        result.push(arr.slice(i, i + len));
      }
      return result;
    }
    var pagedList = splitArray(list, this.pageSize);
    //  console.log('pagedList', pagedList);
    return pagedList;*/
  },
  //************************************ */
  fetchData: function() {
    var that = this;
    wx.showLoading({
      title: 'loading...',
    })

    Api.queryData(this, {
        act: "_cpckdlist",
        loc: "cpckdloc",
        kh: 0,
        khid: that.data.khid,
        startdate: that.data.rq1,
        enddate: that.data.rq2,
        ckid: getApp().globalData.current_l_id
      }, callBackQuery

    );
  },
  onShow: function() {
    Api.checkTime();
    var vm = this;
    vm.fetchData();
  },
  onLoad: function() {
    var vm = this;

    Api.queryData(this, {
      act: "khmclist"
    }, callBackkhmcQuery);
  },
  hiddenBtn: function(e) {
    this.setData({
      hiddenBoolean: true
    })
  },
  bindDateChange: function(e) {
    //  console.log('bindDateChange');
    this.setData({
      selectdate: 1
    });
    calendar.init(this, 1);
  },
  bindDateChange1: function(e) {
    //  console.log('bindDateChange1');
    this.setData({
      selectdate: 2
    });
    calendar.init(this, 1);
  },

  //******  get date option   ************************ */
  preMonth: function() {
    calendar.preMonth();
  },
  nextMonth: function() {
    calendar.nextMonth();
  },
  selectDate: function(e) {
    calendar.selectDate(e, this);
  },
  CancelSelect: function(e) {
    var vm = this;
    var obj = vm.data.datedata;
    obj["calendarHidden"] = true;
    vm.setData({
      datedata: obj
    });
  },
  //******  get date option            end  ************************ */
  evaSubmit: function(e) {

    if (!Api.checkTime()) return;
    Api.saveFormId(e.detail.formId, wx.getStorageSync('current_openid'));
    var d = e.detail.value.rq1;
    startdate = new Date(Date.parse(d.replace(/-/g, "/")));
    var timestamp = Date.parse(startdate) / 1000;
    var n_to = 1000 * (timestamp + 24 * 60 * 60);
    startdate = ((new Date(n_to)).toISOString()).substring(0, 10);
    d = e.detail.value.rq2;
    enddate = new Date(Date.parse(d.replace(/-/g, "/")));
    timestamp = Date.parse(enddate) / 1000;
    n_to = 1000 * (timestamp + 24 * 60 * 60);
    enddate = ((new Date(n_to)).toISOString()).substring(0, 10);

    khid = this.data.khid;
    this.setData({
      rq1: startdate,
      rq2: enddate
    });

    this.fetchData();
  },

  bindkhmcSelect: function(e) {
    var that = this;
    var list = that.data.khmclist;
    //var index = e.currentTarget.dataset.index;
    var obj = {};
    obj["selectTitle"] = "选择客户名称";
    obj["nameList"] = list;
    that.setData({
      selectType: "khmc"
    });
    select.showSelectWindow(that, obj, false);
  },
  selectCancelBtn: function(e) {
    select.hiddenSelectWindow(this);

  },
  selectBtn: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var name = select.check(e, that);
    if (name == "true") return;
    var selecttype = that.data.selectType;
    var obj = that.data.obj;
    that.setData({
      khmc: name,
      khid: id

    });
    select.hiddenSelectWindow(that);
  }
})