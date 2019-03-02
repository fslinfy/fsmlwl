var Api = require("../../../utils/api.js");
Page(
  {
    data: {
      id: 0,
      obj: {},
      active: 1

    },
    checkboxChange: function (a) {
      this.setData({
        active: a.detail.value.length
      });
    },

    edit_save: function (e) {
      if (!Api.checkTime(1)) return; 
      
      Api.saveFormId(e.detail.formId, wx.getStorageSync('current_openid'));
      var that = this;


      if (getApp().globalData.current_edit < 1) {
        wx.showModal({
          showCancel: false,
          title: '注意',
          content: "用户没有资料编辑权限！",
          success: function (res) {
            return;
          }
        })
        return;
      }


      var id = that.data.id;
      if (!e.detail.value.cphm) {
        wx.showModal({
          showCancel: false,
          title: '注意',
          content: '请输入车牌号码!'
        })
        return
      }
      if (!e.detail.value.thr) {
        wx.showModal({
          showCancel: false,
          title: '注意',
          content: '请输入提货人或手机号!'
        })
        return
      }
      Api.saveData(that,
        {
          act: "cphmedit",
          options:'save',
          active: e.detail.value.active,
          id: id,
          thr: e.detail.value.thr,
          cphm: e.detail.value.cphm,
          wxnumber:e.detail.value.wxnumber,
          wxname:e.detail.value.wxname,
          khid: getApp().globalData.current_khid
        }, '车牌号码:' + e.detail.value.cphm)

    },
    delete: function (e) {
      if (!Api.checkTime(1)) return; 
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

      var that = this;
      // 取得下标
      var obj = this.data.obj;
      var index = obj.id;
      var code = obj.cphm;
      if (index == undefined) return;
      Api.saveData(that,
        {
          act: "cphmedit",
          options: "delete",
          id: index
        }, code)
    },
    onShow:function(options){
      Api.checkTime(1); 
    },
    onLoad: function (options) {
     // if (!Api.checkTime(1)) return; 
    //  Api.checkTime(1); 
      var that = this;
      var code = options.obj;
      
      if (code == undefined) {
        that.setData({
          obj:{},
          id: 0,
          cphm:'',
          thr: ''
        });
      } else {
        var obj = JSON.parse(options.obj);

        that.setData({
          obj: obj,
          active: obj.active,
          id: obj.id,
          cphm: obj.cphm,
          thr: obj.thr
        });
      }
    }
  })
