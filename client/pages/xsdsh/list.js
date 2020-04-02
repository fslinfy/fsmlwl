var Api = require("../../utils/api.js");

var callBackQuery = function (res, that) {
  //return;
  var obj = res.data.rows;
  var datamsg ='没有单据待审核！ ';
  //console.log(obj);
  obj.forEach(function (item, index) {
   // item['cnote'] = item.cnote.split('&~~').join('\n');
    item['cnote'] =Api.field_decode(item.cnote);
    item['sfr'] = Api.field_decode(item.sfr);
    item['cphm'] = Api.field_decode(item.cphm);
    var xsdmx = item.xsdmx;
    datamsg='';
    xsdmx.forEach(function (item2, index2) {
      item2.xssl = Api.slrenderer(item2.xssl);
      item2.xszl = Api.slrenderer(item2.xszl);
    })
    item['xsdmx']=xsdmx;
  });


  that.setData({
    lists: obj,datamsg:datamsg
  })
  wx.hideLoading();
};
Page({
  data: {
    hidden: true,datamsg:''
  },
  edit: function (e) {
    if (!Api.checkTime()) return; 
    var that = this;
    var obj = e.currentTarget.dataset.obj;

    if (obj.id == undefined) return;

    var objstr = JSON.stringify(obj);
    var url = 'edit/edit?act=0&obj=' + objstr;
    wx.navigateTo({
      url: url
    })
  },

  fetchData: function () {
    var that = this;
    wx.showLoading({
      title: 'loading...',
    })
    Api.queryData(this,
       {
          act: "cpxsdlist",
          loc:"cpxsdsh",
          ckid:0,
          khid: getApp().globalData.current_khid
       }, callBackQuery
    );
  },
  onShow: function () {
    Api.checkTime(); 
    var vm = this;
    vm.fetchData();
  }
})


