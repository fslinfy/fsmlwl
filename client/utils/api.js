var fun_base64 = require('base64.js')
var md5 = require('md5.js')

'use strict';
var HOST_URI = 'https://www.v2ex.com/api/';

// 获取节点
// 所有的节点
var ALL_NODE = 'nodes/all.json';
// 获取节点信息 
// 节点id :id 节点名 :name
var NODE_INFO = 'nodes/show.json';

// 获取主题
// 取最新的主题
var LATEST_TOPIC = 'topics/latest.json';
// 获取热议主题
var HOT_TOPIC = 'topics/hot.json';
// 获取主题信息  :id | (:username | :node_id | :node_name)
var GET_TOPICS = 'topics/show.json';

// 获取回复 :topic_id (:page , :page_size)?
var GET_REPLIES = 'replies/show.json';


// 获取用户信息
var GET_USERINFO = 'members/show.json';

function _obj2uri(obj) {
  return Object.keys(obj).map(function (k) {
    return encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]);
  }).join('&');
}

function _getAllNode() {
  return HOST_URI + ALL_NODE;
}

function _getNodeInfo(o) {
  return HOST_URI + NODE_INFO + '?' + _obj2uri(o);
}

function _getTopicInfo(o) {
  return HOST_URI + GET_TOPICS + '?' + _obj2uri(o);
}

function _getLatestTopic(o) {
  return HOST_URI + LATEST_TOPIC + '?' + _obj2uri(o);
}

function _getHotestTopic(o) {
  return HOST_URI + HOT_TOPIC + '?' + _obj2uri(o);
}

function _getReplies(o) {
  return HOST_URI + GET_REPLIES + '?' + _obj2uri(o);
}

function _getStartMenu(menu_type, that) {
  that.setData({
    hidden: false
  })

  /*  wx.request({
      url: getApp().globalData.servsers + "/mysqlwxaction",
      data: {
        act: "menusystemlist",
        menutype: menu_type
      },
      success: function (res) {
  
        //var obj = JSON.parse(res.data);
        var obj = res.data;
        switch (menu_type) {
          case "setting":
            that.setData({
              menu_setting: obj.rows
            });
            break;
          case "warehouse":
            that.setData({
              menu_warehouse: obj.rows
            });
            break;
          case "business":
            that.setData({
              menu_business: obj.rows
            });
            break;
          default:
            that.setData({
              menu_system: obj.rows
            });
            break;
        }
  
        setTimeout(function () {
          that.setData({
            hidden: true
          })
        }, 300);
      }
    })
    */
}

function _menuToPage(e) {
  var id = e.currentTarget.dataset.id;
  var page = e.currentTarget.dataset.page;
  if (page != "") {

    wx.navigateTo({
      url: page
    })
  }
}
function _saveResoult(res) {
  if (res.data.success) {
    wx.showModal({
      showCancel: false,
      title: res.data.data.msg,
      success: function () {
        setTimeout(function () {
          if (res.data.data.id == 0) {

            wx.navigateBack(); //toast消失后返回上一页
          }
        }, 500);  // 等待半秒，
      }
    })
  } else {
    wx.showToast({ title: "数据处理失败！", duration: 2000 });
  }
}

function _saveData(that, data, title) {
  var ops = data.options;
  if (ops == "delete") {
    ops = "删除此记录内容？";
  } else {
    ops = "保存修改内容？";
  }

  //data=加密
  wx.showModal({
    showCancel: true,
    title: ops,
    content: title,
    success: function (res) {
      if (res.confirm) {
        data["L_id"] = getApp().globalData.current_L_id;
        data["E_code"] = getApp().globalData.current_E_code;
        // wx.showLoading({
        //   title: 'save...',
        //  })
        wx.request({
          url: getApp().globalData.servsers + "/mysqlwxaction",
          header: { "Content-type": "text/html", "charset": "utf-8" },
          data: data,
          success: function (res) {
            //this.saveResoult(res);
            // wx.hideLoading();
            if (res.data.success) {
              wx.showModal({
                showCancel: false,
                title: res.data.data.msg,
                success: function () {
                  setTimeout(function () {
                    if (res.data.data.id == 0) {

                      wx.navigateBack(); //toast消失后返回上一页
                    }
                  }, 500);  // 等待半秒，
                }
              })
            } else {
              wx.showToast({ title: "数据处理失败！", duration: 2000 });
            }
          }
        })
      }
    }
  })

}


function _saveFormId(fid, oid) {
  wx.request({
    url: getApp().globalData.servsers + "/mysqlwxaction",
    header: { "Content-type": "text/html", "charset": "utf-8" },
    data: {
      act: "saveformid",
      form_id: fid,
      member_id: oid,
      userInfo: getApp().globalData.userInfo
    },
    success: function (res) {
    }
  })


}



function _queryData(that, data, callback) {

  that.setData({
    hidden: false
  });
 //data["khid"] = getApp().globalData.current_khid;
  //data["p_l_id"] = getApp().globalData.current_L_id;
  data["p_e_code"] = getApp().globalData.current_E_code;
  //wx.showLoading({
  //  title: 'loading...',
  //})

  //加密处理
  //var  objstr = this.encrypt(JSON.stringify(data));
  // data={};
  // data["d"]=objstr;

  //var  url ='http://www.fsminglian.com/mlwl/mysql_action.php?act=locationlist&_dc=1523206554274&userInfo=IntcInVzZXJuYW1lXCI6XCJhZG1pblwiLFwicGFzc3dvcmRcIjpcIk9EZzRPQT09XCIsXCJ1c2VyaWRcIjpcIjExMDJcIixcImtoc3lzdGVtXCI6XCIwXCJ9Ig==&p_e_code=1&page=1&start=0&limit=10000'
  wx.request({
    url: getApp().globalData.servsers + "/mysqlwxaction",
    //url:url,
    data: data,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      // wx.hideLoading();
      //var res =  JSON.parse(res);

      if (res.data.success) {
        
        setTimeout(function () {
          that.setData({
            hidden: true
          })
        }, 300);
        callback(res, that);
        return;
      }
      else {
        that.setData({
          hidden: true
        });
        wx.showModal({
          showCancel: false,
          title: '注意',
          content: res.data,
          success: function (res) {
            wx.navigateBack({
              delta: 1
            })
          }
        });
      }
    },
    fail: function (res) {
      wx.hideLoading();
      wx.showModal({
        showCancel: false,
        title: '注意fail',
        content: res.data,
        success: function (res) {
          wx.navigateBack({
            delta: 1
          })
        }
      });
    }
    /*complete: function (res) {
      wx.showModal({
        showCancel: false,
        title: '注意complete',
        content: res.data,
        success: function (res) {
          wx.navigateBack({
            delta: 1
          })
        }
      });
      


    }*/

  })
  return null;
}
function _field_encode(strings) {
  var obj_base64 = new fun_base64.Base64();
  if (strings.length==0) return "";
  return "~"+obj_base64.encode(strings)+"~";
}
function _field_decode(strings) {
  var obj_base64 = new fun_base64.Base64();
  if (strings.length == 0) return "";

  if (strings.substr(0, 1) == "~" && strings.substr(strings.length-1, 1)=="~" )
  {
    strings=strings.substr(1,strings.length-2)
   // return strings;
    return  obj_base64.decode(strings);          
  }
  return strings.split("&~~").join("\n");
}


function _encrypt(strings) {
  var obj_base64 = new fun_base64.Base64();
  var key = 'e10adc3949ba59abbe56e057f20f883e';
  key = "7b8d4382730222b472a6861109e00195";
  var strings = obj_base64.encode(strings);
  var len = key.length;
  var code = '';
  for (var i = 0; i < strings.length; i++) {
    var k = i % len;
    code += String.fromCharCode(strings.charCodeAt(i) ^ key.charCodeAt(k));
  }
  return obj_base64.encode(code);
}
function _decrypt(strings) {
  var obj_base64 = new fun_base64.Base64();
  var key = md5.hex_md5('18165608618');
  var strings = obj_base64.decode(strings);
  var len = key.length;
  var code = '';
  for (var i = 0; i < strings.length; i++) {
    var k = i % len;
    code += String.fromCharCode(strings.charCodeAt(i) ^ key.charCodeAt(k));
  }
  return obj_base64.decode(code);
}


function _slrenderer(value) {
  if (value == 0) {
    return "";
  }
  else {
    if (parseInt(value) == value) {
      return parseInt(value);
    }
    else {
      if (parseInt(value * 10) == 10 * value) {
        return parseInt(value * 10) / 10;
      }
      else {
        if (parseInt(value * 100) == 100 * value) {
          return parseInt(value * 100) / 100;
        }
        else {
          return parseInt(value * 1000) / 1000;
        }
      }
    }
  }
};

function _daysBetween(DateOne, DateTwo) {
  var OneMonth = DateOne.substring(5, DateOne.lastIndexOf('-'));
  var OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf('-') + 1);
  var OneYear = DateOne.substring(0, DateOne.indexOf('-'));
  var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf('-'));
  var TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf('-') + 1);
  var TwoYear = DateTwo.substring(0, DateTwo.indexOf('-'));
  var cha = ((Date.parse(OneMonth + '/' + OneDay + '/' + OneYear) - Date.parse(TwoMonth + '/' + TwoDay + '/' + TwoYear)) / 86400000);
  return cha;
};
function _checktime(ops) {

  if (ops==undefined) ops=0;
  var timestamp = Date.parse(new Date(),) / 1000;
  
  if (getApp().globalData.operatetime == undefined) {
    getApp().globalData.operatetime = timestamp;
    return true;
  }
  var old_time = getApp().globalData.operatetime + 5 * 60;

  if (timestamp < old_time) {
    getApp().globalData.operatetime = timestamp;
    return true;
  }
  getApp().globalData.userlogin = false;
  if (ops==0){
  wx.redirectTo({
    url: '../login/index',
  })
  }else{

    wx.redirectTo({
      url: '../../login/index',
    })
  }
  
  return false;


}
function _checkfield(str,msg) {
  if (str.indexOf("=") > -1) {
    wx.showModal({
      showCancel: false,
      title: '注意',
      content: "请输入的"+msg+"中不能含有=号",
      success: function (res) {
        return false;
      }
    })
    return false;

  }
  if (str.indexOf('"') > -1) {
    wx.showModal({
      showCancel: false,
      title: '注意',
      content: '请输入的'+msg+'中不能含有"号',
      success: function (res) {
        return false;
      }
    })
    return false;
  }
  return true;
}
module.exports = {
  getAllNode: _getAllNode,
  getNodeInfo: _getNodeInfo,
  getLatestTopic: _getLatestTopic,
  getHotestTopic: _getHotestTopic,
  getTopicInfo: _getTopicInfo,
  getReplies: _getReplies,
  getStartMenu: _getStartMenu,
  menuToPage: _menuToPage,
  saveResoult: _saveResoult,
  saveData: _saveData,
  saveFormId: _saveFormId,
  queryData: _queryData,
  decrypt: _decrypt,
  encrypt: _encrypt,
  checkTime: _checktime,
  checkField: _checkfield,
  slrenderer: _slrenderer,
  daysBetween: _daysBetween,
  field_encode: _field_encode,
  field_decode: _field_decode
};