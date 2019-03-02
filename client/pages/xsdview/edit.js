var xsid = 0;
var fun_base64 = require('../../utils/base64.js')
var Api = require("../../utils/api.js");
var utils = require('../../utils/util');


Page(
  {
    data: {
     xsd:[]
    },
    hiddenBtn: function (e) {
      this.setData({
        hiddenBoolean: true
      })
    },
    bindcancel: function (e) {
      wx.navigateBack();
    },




    //提交事件
    onShow:function(options){
      Api.checkTime(); 
    },
   
    onLoad: function (options) {
      if (!Api.checkTime(0)) return; 
     var that=this;
     var id =3948;
     //id = options.id;
     if (id==0) return ;
    



      wx.request({
        url: getApp().globalData.servsers + "/mysqlviewaction",
        header: { "content-type": "application/json", "charset": "utf-8" },
        data: {
          act: "cpxsdview",
          xsid:id
        },
        success: function (res) {
           that.setData({  
              xsd:res.data.rows[0]   
           })
           
        }
      })
    
     // this.qrCode(options);

      wx.request({
        url: getApp().globalData.servsers + "/mysqlwxaction",
        header: { "content-type": "application/json", "charset": "utf-8" },
        data: {
          act: "getaccesstoken"
        },
        success: function (res) {
        }
      })
  

    },

     qrCode:function(options) {
       var id = 3948;
       //id = options.id;

      var self = this;
      var pages = getCurrentPages();    //获取加载的页面
      var currentPage = pages[pages.length - 1];    //获取当前页面的对象
      var url = currentPage.route;   //当前页面url
      var options = currentPage.options;   //如果要获取url中所带的参数可以查看options
      var qrurl = 'pages/xsdview/edit?id=' + id; //拼接当前页面的path地址
      var imgtag = 'prefix_' + id; //拼接生成的图片文件名
      wx.request({
        url: getApp().globalData.servsers + "/QRCode.php",
        //url: 'xxxxxx/QRcode.php', //后端request地址
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: {
          path: qrurl, //A、C类接口使用,冒号之前是这个数值在后端的名称，冒号之后是这个数值在前端的名称
          width: 600, //这里可以不设置，在后端设置也可以
          imgname: imgtag,
          title: '你的title',
        },
        success: function (res) {
          wx.downloadFile({
            url: getApp().globalData.servsers +"/uploadfolder/"+ imgtag + '.jpg', //这里填写你服务器上保存海报图片的目录网址
            success: function (res) {
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success(result) {
                  wx.showModal({
                    title: '提示',
                    content: '二维码海报已保存在手机相册，请进入手机相册找到这张海报并分享到微信朋友圈。',
                    showCancel: false,
                    success: function (res) {
                      if (res.confirm) {
                      }
                    }
                  })
                }
              });
            }, fail: function (res) {
            }
          });
        },
        fail: function (res) {
        }
      });
     }

  })
