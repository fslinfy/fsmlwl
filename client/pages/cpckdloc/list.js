var that;
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
var callBackQuery = function(res, th) {

  var obj = res.data.rows;
  if (res.data.cur_pages == 1) {
    that.total_pages = res.data.total_pages;
    that.total_rows = res.data.total_rows;
    that.downloadpage=1;
  }
  that.downloadpage = res.data.cur_pages;
  that.cur_pages = res.data.cur_pages;
  var datamsg ="没有符合的内容！";
  //console.log('obj', obj);
  obj.forEach(function(item, index) {
    item['cnote'] = Api.field_decode(item.cnote); // item.cnote.split('&~~').join('\n');
    var ckdmx = item.ckdmx;
    datamsg='';
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

  if (that.cur_pages == 1) {
      that.pagedList = that.pageList(obj);
      that.setData({
        total_pages: that.total_pages,
        total_rows: that.total_rows,
        cur_pages: that.cur_pages,
        downloadpage:that.downloadpage,
        listLength: that.total_rows,
        list: [that.pagedList[0]]
      })
  } else {
    var arr0 = that.pagedList;
    var arr = that.pageList(obj);
    var list0 = that.data.list;
    arr.forEach(function(item, index) {
      arr0.push(item);
      list0.push(item);
    })
    that.pagedList = arr0;
    that.setData({
      list: list0
    })
  }
  that.isloading=false;

  that.setData({
    cur_pages: that.cur_pages,datamsg:datamsg,
    downloadpage: that.downloadpage
  })

 // if (that.cur_pages < that.total_pages) {
  if (that.total_pages>0)
  {
      that.getdata();
  }
  //}
  // wx.hideLoading();

};
var callBackkhmcQuery = function(res, that) {
  that.setData({
    khmclist: res.data.rows
  })
};

Page({
  data: {
    hidden: true,
    datamsg:'',
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
  downloadpage:0,
  total_rows: 0,
  Total_pages: 0,
  cur_pages: 1,
  isloading:false,
  //滚动监听
  onListScroll(e) {
    Api.pageListScroll(e, this);
    that.getdata();
    Api.checkTime();
  },
  //计算分页高度
  reachPageBottom() {
    Api.reachPageBottom(this);

  },
  listItemTap(e) {
    //响应点击事件

    console.log(e.currentTarget.dataset);
  },
  //分页函数
  pageList(list) {
    return Api.pageList(list, this);
  },
  //************************************ */
  fetchData: function() {
    that = this;
    that.isloading=false;
    that.total_pages=0;
    that.cur_pages=0;
    that.currentPage=0;
    that.downloadpage=0;
    that.getdata();

  },
  getdata: function() {
    if (that.isloading) return;
  //  console.log('total_pages', that.total_pages, 'downloadpage', that.downloadpage, 'currentPage', that.currentPage);
    if (that.total_pages>0){
      
      if (that.total_pages==that.downloadpage) {
        return;
      }
      if ((that.currentPage + 1) / 2 < that.downloadpage) {
        return;
      }
    }
     
    that.isloading=true;
    var page=that.downloadpage+1;

   // console.log("page", page);
    Api.queryData(that, {
      act: "cpckdlist",
      loc: "cpckdloc",
      kh: 0,
      pagesize: that.pageSize * 2,
      page: page,
      khid: that.data.khid,
      startdate: that.data.rq1,
      enddate: that.data.rq2,
      ckid: getApp().globalData.current_l_id
    }, callBackQuery);
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
    //var that = this;
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
    //var that = this;
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