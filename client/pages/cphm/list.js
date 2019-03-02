var Api = require("../../utils/api.js");

var callBackQuery = function (res, that) {
   that.setData({
      lists: res.data.rows
   })
   wx.hideLoading();
};
Page({
   data: {
      hidden: true
   },
   add: function () {
     if (!Api.checkTime()) return; 
      var url = 'edit/edit';
      wx.navigateTo({
         url: url
      });
   },
   edit: function (e) {
     if (!Api.checkTime()) return; 
      var that = this;
      var obj = e.currentTarget.dataset.obj;
          

      if (obj.id == undefined) return;

      var objstr = JSON.stringify(obj);
      var url = 'edit/edit?obj=' + objstr;
      wx.navigateTo({
         url: url
      })
   },

   fetchData: function () {
     wx.showLoading({
       title: 'loading...',
     })
      var that = this;
      Api.queryData(this,
         {
            act: "cphmlist",
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


