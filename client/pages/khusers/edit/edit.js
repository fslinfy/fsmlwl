var that;
var fun_base64 = require('../../../utils/base64.js')
var Api = require("../../../utils/api.js");
var utils = require('../../../utils/util');
var select = require("../../../utils/selectName.js");



var callBackQuery = function (res, that) {
  var obj = res.data.rows;
  var ret = [];
  //console.log(obj);

  obj.forEach(function (item, index) {
    ret.push({ "Id": item.typeid, "Name": item.typename });
  })

  that.setData({
    selectData: { "usertype": ret }
  })
};




Page(
  {
    data: {
      obj: {},
      username: '',
      id: 0,
      usercode: '',
      smsphone: '',
      new: 0,
      typeid: 0,
      typename: '',
      edit: 0,
      sh: 0,
      del: 0,
      khid: 0,
      system: 0,
      active: 1,
      lastdel: 0,
      wxmenustring: '',
      systemlastdel:0,
      khsystem:false,
      wxmenustring: '',
      
      hiddenSelectWindow: true,
      calendarHidden: true,
      options: { hiddenSelectWindow: true },
      datedata: { calendarHidden: true }
    },
    checkboxChange: function (a) {
      this.setData({
        Active: a.detail.value.length
      });
    },
    selectededit: function (e) {
      var obj = e.currentTarget.dataset.obj;

      var s = 0;
      if (obj.Id == undefined) return;
      let list = this.data.lists;
      list.forEach((item) => {
        if (item.Id == obj.Id) {
          item.selected = !item.selected || false
        }
        if (item.selected) {
          s = s + 1;
        }
      })
      this.setData({
        lists: list,
        selected: s > 0
      })

    },
    selectedall: function (e) {

      let list = this.data.lists;
      if (this.data.selected == 1) {
        list.forEach((item) => {
          item.selected = false

        })
      } else {
        list.forEach((item) => {
          item.selected = true
        })
      }

      this.setData({
        lists: list,
        selected: !this.data.selected
      })
    },


    hiddenBtn: function (e) {
      this.setData({
        hiddenBoolean: true
      })
    },

    checkboxChange_new: function (a) {
      this.setData({
        new: a.detail.value.length
      });
    },
    checkboxChange_edit: function (a) {
      this.setData({
        edit: a.detail.value.length
      });
    },
    checkboxChange_del: function (a) {
      this.setData({
        del: a.detail.value.length
      });
    },
    checkboxChange_lastdel: function (a) {
      this.setData({
        lastdel: a.detail.value.length
      });
    },
    checkboxChange_sh: function (a) {
      this.setData({
        sh: a.detail.value.length
      });
    },
    checkboxChange_active: function (a) {
      this.setData({
        active: a.detail.value.length
      });
    },

    bindcancel: function (e) {
      wx.navigateBack();
    },
    deleteusertype: function (e) {
      that = this;
      if (!Api.checkTime(1)) return;
     // if (wx.getStorageSync('current_khsystem')==false) {
      //  if (getApp().globalData.current_lastdel < 1) {
      if (that.data.khsystem == false) {
        if (that.data.systemlastdel < 1) {
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


      
      // 取得下标
      var obj = that.data.obj;
      var index = obj.userid;
      var code = obj.username;
      if (index == undefined) return;
      Api.saveData(that,
        {
          act: "khusersedit",
          options: "delete",
          khid: wx.getStorageSync('current_khid'),
          id: index
        }, code)
    },
    //******  select name option   ************************ */
    selectCancelBtn: function (e) {
      select.hiddenSelectWindow(this);

    },
    selectBtn: function (e) {
      that = this;
      var id = e.currentTarget.dataset.id;
      var index = e.currentTarget.dataset.index;
      var name = select.check(e, that);
      if (name == "true") return;
      var selecttype = that.data.selectType;

      var obj = that.data.obj;
      that.setData({
        typename: name,
        typeid: id
      });

      select.hiddenSelectWindow(that);
    },
    bindSelect: function (e) {
      that = this;
      var list = that.data.selectData.usertype;
      // var index = e.currentTarget.dataset.index;
      // console.log("namelist",list);
      var obj = {};
      obj["selectTitle"] = "选择用户组";
      obj["nameList"] = list;
      that.setData({
        selectType: "usertype"
      });
      select.showSelectWindow(that, obj, false);
    },
    //******  select name  end  ************************ */

    //************************************** */
    //提交事件
    evaSubmit: function (e) {
      var obj_base64 = new fun_base64.Base64();
      if (!Api.checkTime(1)) return;
      Api.saveFormId(e.detail.formId, wx.getStorageSync('current_openid'));
       that = this;
      //提交(自定义的get方法)
      console.log('current_khsystem', wx.getStorageSync('current_khsystem'), getApp().globalData.current_khsystem);
      console.log('current_lastdel', getApp().globalData.current_lastdel, wx.getStorageSync('current_lastdel'));
     
      if (that.data.khsystem==false){
         if (that.data.systemlastdel<1) {
            wx.showModal({
                showCancel: false,
                title: '注意',
                content: "你没有用户编辑权限！",
                success: function (res) {
                        return;
                      }
            })
          return ;
          }
      }

      if (wx.getStorageSync('current_khid') == 0) {
        if (that.data.typeid == 0) {
          wx.showModal({
            showCancel: false,
            title: '注意',
            content: "请选择用户的用户组别！",
            success: function (res) {
              return;
            }
          })
          return;
        }
      }
      var list = that.data.lists;
      var str = "";
      list.forEach(function (item, index) {
        if (item.selected) {
          str = str + "|" + item.Id;
        }
      })
      str = str + "|";
      //cnote = Api.field_encode(cnote);

      Api.saveData(that,
        {
          act: "khusersedit",
          options: 'save',
          usercode: e.detail.value.usercode,
          username: e.detail.value.username,
          smsphone: e.detail.value.smsphone,
          edit: that.data.edit,
          new: that.data.new,
          sh: that.data.sh,
          del: that.data.del,
          typeid: that.data.typeid,
          lastdel: that.data.lastdel,
          active: that.data.active,
          system: that.data.lastdel,
          userid: that.data.id,
          id: that.data.id,
          khid: wx.getStorageSync('current_khid'),
          wxmenustring: str
        }, '用户:' + e.detail.value.username)

    },

    onLoad: function (options) {
       that = this;
      var obj = options.obj;
      var wxmenustring = '';
      //console.log('options', options);

      if (options.khsystem == true) {
        wx.setStorageSync('current_khsystem',true);
        wx.setStorageSync('current_lastdel',1);
        that.setData({
          khsystem: options.khsystem,
          khid: wx.getStorageSync('current_khid'),
          systemlastdel: 1
        });

      }
      else {
        wx.setStorageSync('current_khsystem',false);
        that.setData({
          khsystem: options.khsystem,
          khid: wx.getStorageSync('current_khid'),
          systemlastdel: wx.getStorageSync('current_lastdel')
        });
      }    
 

      if (wx.getStorageSync('current_khid') == 0) {
        Api.queryData(this,
          {
            act: "usertypelist",
            khid: wx.getStorageSync('current_khid')
          }, callBackQuery
        )
      }
      //console.log(wx.getStorageSync('current_lastdel'));




      
      //return;
      if (obj) {
       // console.log('obj', obj);
        var obj = JSON.parse(options.obj);
        
        wxmenustring = obj.wxmenustring;

        that.setData({
          obj: obj,
          username: obj.username,
          id: obj.userid,
          usercode: obj.usercode,
          smsphone: obj.smsphone,
          new: obj.new,
          edit: obj.edit,
          sh: obj.sh,
          typeid: obj.typeid,
          typename: obj.typename,
          lastdel:obj.lastdel,
          del: obj.del,
          system: obj.system,
          active: obj.active,
          khid: wx.getStorageSync('current_khid'),
          wxmenustring: obj.wxmenustring
        });
      } 

      var url = getApp().globalData.servsers + "/checklogin";
      var kh = 0;
      if (wx.getStorageSync('current_khid') > 0) {
        kh = 1;
      }
      //console.log(that.data.lastdel);
      wx.request({
        url: url,
        header: { "Content-type": "text/html", "charset": "utf-8" },
        data: {
          act: "getsystemmenu",
          system: kh,
          userid: 0,
          openid: wx.getStorageSync('current_openid')
        },
        success: function (res) {

          var obj = res.data.rows;
          var list = [];
          obj.forEach(function (item, index) {
            list.push({ "Id": item.Id, "Name": item.Name, "selected": false });
          })
          var s = 0;

          if (wxmenustring.length > 0) {
            list.forEach((item) => {
              if (wxmenustring.indexOf("|" + item.Id + "|") > -1) {
                item.selected = true;
                s = s + 1;
              }

            })
          }
          that.setData({
            lists: list,
            selected: s > 0
          })
        }
      })
    }
  }
)
