var fun_base64 = require('../../../utils/base64.js')
var Api = require("../../../utils/api.js");
var utils = require('../../../utils/util');
var callBackQuery = function (res, that) {

  that.setData({
    selectData: res.data
  })
};
Page(
  {
    data: {
      obj: {},
      wxmenustring: ''
    },
    checkboxChange: function (a) {
      this.setData({
        Active: a.detail.value.length
      });
    },
    selectededit: function (e) {
      var obj = e.currentTarget.dataset.obj;
      console.log(obj);
      var s=0;
      if (obj.Id == undefined) return;
      let list = this.data.lists;
      list.forEach((item) => {
        if (item.Id == obj.Id) {
          item.selected = !item.selected || false
        }
        if (item.selected ) {
          s=s+1;
        }
      })
      this.setData({
        lists: list,
        selected:s>0
      })

    },
    selectedall: function (e) {
      
      let list = this.data.lists;
      if (this.data.selected==1){
      list.forEach((item) => {
                item.selected =false
                
      })
      }else
      {
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
    checkboxChange_sh: function (a) {
      this.setData({
        sh: a.detail.value.length
      });
    },
    checkboxChange_cwsh: function (a) {
      this.setData({
        cwsh: a.detail.value.length
      });
    },
    checkboxChange_cgsh: function (a) {
      this.setData({
        cgsh: a.detail.value.length
      });
    },


    bindcancel: function (e) {
      wx.navigateBack();
    },
    deleteusertype: function (e) {
      if (!Api.checkTime(1)) return;
      if (getApp().globalData.current_khsystem == false) {
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


      var that = this;
      // 取得下标
      var obj = this.data.obj;
      var index = obj.typeid;
      var code = obj.typename;
      if (index == undefined) return;
      Api.saveData(that,
        {
          act: "usertypeedit",
          options: "delete",
          id: index
        }, code)
    },

    //提交事件
    evaSubmit: function (e) {
      var obj_base64 = new fun_base64.Base64();
      if (!Api.checkTime(1)) return;
      Api.saveFormId(e.detail.formId, wx.getStorageSync('current_openid'));
      var that = this;
      //提交(自定义的get方法)
      if (getApp().globalData.current_lastdel < 1) {
        wx.showModal({
          showCancel: false,
          title: '注意',
          content: "你没有用户组别编辑权限！",
          success: function (res) {
            return;
          }
        })
        return;
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
          act: "usertypeedit",
          options: 'save',
          code: e.detail.value.code,
       
          edit: that.data.edit,
          new: that.data.new,

          sh: that.data.sh,
          del: that.data.del,
          cwsh: that.data.cwsh,
          cgsh: that.data.cgsh,
          system: that.data.system,
          id: that.data.typeid,
          typename: e.detail.value.typename,
          wxmenustring: str
        }, '用户组:' + e.detail.value.typename)

    },

    onLoad: function (options) {



      var that = this;
      var obj = options.obj;
      var wxmenustring ='';

      if (obj) {
        var obj = JSON.parse(options.obj);
        wxmenustring = obj.wxmenustring;

        that.setData({
          obj: obj,
          typename: obj.typename,
          typeid: obj.typeid,
          code: obj.code,
          new: obj.new,
          edit: obj.edit,
          sh: obj.sh,
          cwsh: obj.cwsh,
          cgsh: obj.cgsh,
          del: obj.del,
          system: obj.system,
          
          wxmenustring: obj.wxmenustring
        });
      }else
      {

        
        that.setData({
          obj: obj,
          typename:'',
          code:'',
          typeid:0,
          new: 0,
          edit: 0,
          sh: 0,
          cwsh:0,
          cgsh:0,
          del:0,
          system:0,
          
          wxmenustring:''
        });

      }

      var url = getApp().globalData.servsers + "/checklogin";
      wx.request({
        url: url,
        header: { "Content-type": "text/html", "charset": "utf-8" },
        data: {
          act: "getsystemmenu",
          system: 0,
          userid: 0,
          openid: wx.getStorageSync('current_openid')
        },
        success: function (res) {

          var obj = res.data.rows;
          var list = [];
          obj.forEach(function (item, index) {
            list.push({ "Id": item.Id, "Name": item.Name, "selected": false });
          })
          var s=0;
          
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
            selected:s>0
          })
        }
      })
    }



  }
)
