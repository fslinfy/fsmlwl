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

    checkboxChange_edit: function (a) {
      this.setData({
        edit: a.detail.value.length
      });
    },

    checkboxChange_sh: function (a) {
      this.setData({
        sh: a.detail.value.length
      });
    },

    checkboxChange_del: function (a) {
      this.setData({
        del: a.detail.value.length
      });
    },
    checkboxChange_sys: function (a) {
      this.setData({
        lastdel: a.detail.value.length
      });
    },
    edit_save: function (e) {
      if (!Api.checkTime(1)) return; 
      Api.saveFormId(e.detail.formId, wx.getStorageSync('current_openid'));
      var that = this;
      var id = that.data.id;
      if (!e.detail.value.username) {
        wx.showModal({
          showCancel: false,
          title: '注意',
          content: '请输入用户名称!'
        })
        return
      }
      if (!e.detail.value.usercode) {
        wx.showModal({
          showCancel: false,
          title: '注意',
          content: '请输入用户代码!'
        })
        return
      }
      if (!e.detail.value.smsphone) {
        wx.showModal({
          showCancel: false,
          title: '注意',
          content: '请输入用户手机号码!'
        })
        return
      }


      Api.saveData(that,
        {
          act: "khusersedit",
          options:'save',
          active: that.data.active,
          edit: that.data.edit,
          sh: that.data.sh,
          del: that.data.del,
          lastdel: that.data.lastdel,
          id: id,
          usercode: e.detail.value.usercode,
          username: e.detail.value.username,
          smsphone: e.detail.value.smsphone,
          khid: getApp().globalData.current_khid
        }, '用户:' + e.detail.value.username)

    },
    delete: function (e) {
      if (!Api.checkTime(1)) return; 
      if (getApp().globalData.current_khsystem == false){
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
      }


      var that = this;
      // 取得下标
      var obj = this.data.obj;
      var index = obj.id;
      var code = obj.username;
      if (index == undefined) return;
      Api.saveData(that,
        {
          act: "khusersedit",
          options: "delete",
          id: index
        }, code)
    },
    changesmsactive: function (e) {
      var that = this;
     
      // 取得下标
      var obj = this.data.obj;
      var index = obj.id;
      var code = obj.username;
      if (index == undefined) return;
      Api.saveData(that,
        {
          act: "khusersedit",
          options: "smsactive",
          id: index
        }, "取消此用户激活状态")
    },

    unlocked: function (e) {
      var that = this;

      // 取得下标
      var obj = this.data.obj;
      var index = obj.id;
      var code = obj.username;
      if (index == undefined) return;
      Api.saveData(that,
        {
          act: "khusersedit",
          options: "unlocked",
          id: index
        }, "对此用户解锁处理")
    },

    onLoad: function (options) {
     // Api.checkTime(1); 
      var that = this;
      var code = options.obj;
      if (code == undefined) {
        that.setData({
          obj: {},
          active: 1,
          id: 0,
          usercode: '',
          username: '',
          smsphone: '',
          wxnumbrt: '',
          wxname: '',
          edit: 1,
          sh: 1,
          del: 1,
          lastdel: 0
        });
      } else {
        var obj = JSON.parse(options.obj);
        that.setData({
          obj:obj,
          active: obj.active,
          id: obj.id,
          usercode: obj.usercode,
          username: obj.username,
          smsphone: obj.smsphone,
          wxnumbrt: obj.wxnumber,
          wxname: obj.wxname,
          edit: obj.edit,
          smsactive: obj.smsactive,
          sh: obj.sh,
          del: obj.del,
          lastdel: obj.lastdel
        });
      }
    }
  })
