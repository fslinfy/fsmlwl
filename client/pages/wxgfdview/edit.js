var xsid = 0;
var fun_base64 = require('../../utils/base64.js')
var Api = require("../../utils/api.js");
var utils = require('../../utils/util');
var QR = require("../../utils/qrcode.js");
Page({
  data: {
    xsd: [],
    imagePath: "",
    level: 0,
    fhmsg: '',
    maskHidden: true,
    btnHidden: true,
    fhbz: true,
    hiddenBoolean: true
  },
  hiddenBtn: function(e) {
    this.setData({
      hiddenBoolean: true
    })
  },
  previewImg: function(e) {

    var img = this.data.imagePath;

    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },
  bindcancel: function(e) {
    if (this.data.level == 1) {
      wx.navigateBack({
        delta: 1
      });
    } else {
      if (this.data.level == 2) {

        wx.navigateBack({
          delta: 2
        });

      }

    }

    //console.log('sddddddddddddddddd');
  },

  //提交事件
  onShow: function(options) {
    //Api.checkTime();
  },
  onLoad: function(options) {

    //    console.log('app.globalData.userInfo', getApp().globalData.userlogin);
    this.setData({
      maskHidden: false,
    });
    /*
        wx.showShareMenu({
          withShareTicket: true
        });
    */

    if (!getApp().globalData.userlogin) {

      wx.hideShareMenu()
    }


    var id = 0;
    var level = 0;
    console.log('options', options);
    console.log('options.level', options.level);
    if (options.level == undefined) {
      
     // id = 14648;
      id = options.id;
    } else {
      level = options.level;
      id = options.id;
    }
    console.log('id', id);
    // if (!Api.checkTime(0)) return;
    var that = this;


    //if (id == 0) {
    //  id = 14648;
    // }


    that.setData({
      xsid: id,
      hiddenBoolean: !getApp().globalData.userlogin,
      level: level
    });




    if (id == 0) return;
    wx.request({
      url: getApp().globalData.servsers + "/mysqlviewaction",
      header: {
        "content-type": "application/json",
        "charset": "utf-8"
      },
      data: {
        act: "wxcpgfdview",
        xsid: id
      },
      success: function(res) {
        var xsd = res.data.rows[0];
        xsd['cnote'] = Api.field_decode(xsd.cnote);
        xsd['cphm'] = Api.field_decode(xsd.cphm);
        xsd['sfr'] = Api.field_decode(xsd.sfr);
        var xsdmx = xsd.xsdmx;
        xsdmx.forEach(function(item2, index2) {
          item2.khsl = Api.slrenderer(item2.khsl);
          item2.khzl = Api.slrenderer(item2.khzl);

        })
        xsd['xsdmx'] = xsdmx;
        var fhbz = true;
        if (xsd.fhbz == 0) {
          fhbz = false;
        }
        //fhbz = true;
        if (fhbz) {
          that.setData({
            xsd: xsd,
            xsdmx:xsdmx,
            fhbz: fhbz,
            fhmsg: '过货单过货完毕'
          })
        } else {
          that.setData({
            xsd: xsd,
            xsdmx: xsdmx,
            fhbz: fhbz,
            fhmsg: ''
          })
        }

        var today = ((new Date()).toISOString()).substring(0, 10);
        //console.log(xsd, today);

        if ((xsd.endrq > today) ) {
         /*
          wx.showShareMenu({
            withShareTicket:true
          });
          */
          that.setData({
            btnHidden: false
          })
      //    console.log('xsd.endrq > today');
        } else {
          /*
          wx.showShareMenu({
            withShareTicket: false
          });
          */
          wx.hideShareMenu();
          that.setData({
            btnHidden: true
          })
//          console.log('xsd.endrq < today');

        }

        var xsdh = xsd.gfdh;
        //************************** */
        var st = setTimeout(function() {
          QR.api.createQrCode(xsdh, "mycanvas", that);
          that.setData({
            maskHidden: true
          });
          clearTimeout(st);
        }, 600)
        //***************************** */

      }
    })

    // this.qrCode(options);

    wx.request({
      url: getApp().globalData.servsers + "/mysqlwxaction",
      header: {
        "content-type": "application/json",
        "charset": "utf-8"
      },
      data: {
        act: "getaccesstoken"
      },
      success: function(res) {}
    })

    // console.log(this.qrCode());
  },


  onShareAppMessage: function(res) {

    return {
      title: '明联物流',
      desc: '微信管理系统',
      path: '/pages/wxgfdview/edit?id=' + this.data.xsid,
      success: function(res) {
        wx.showToast({
          title: '过货单转发成功！',
          icon: 'none',
          duration: 2000
        })
        console.log('success');
      },
      fail: function(res) {
        wx.showToast({
          title: '过货单转发失败！',
          icon: 'none',
          duration: 2000
        })
        console.log('fail');
      },
      complete: function(res) {

        console.log('complete');
      }
    }
  },



  qrCode: function(options) {
    // var id = 3948;
    id = options.id;

    var self = this;
    var pages = getCurrentPages(); //获取加载的页面
    var currentPage = pages[pages.length - 1]; //获取当前页面的对象
    var url = currentPage.route; //当前页面url
    var options = currentPage.options; //如果要获取url中所带的参数可以查看options
    var qrurl = 'pages/wxgfdview/edit?id=' + id; //拼接当前页面的path地址
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
      success: function(res) {
        wx.downloadFile({
          url: getApp().globalData.servsers + "/uploadfolder/" + imgtag + '.jpg', //这里填写你服务器上保存海报图片的目录网址
          success: function(res) {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success(result) {
                wx.showModal({
                  title: '提示',
                  content: '二维码海报已保存在手机相册，请进入手机相册找到这张海报并分享到微信朋友圈。',
                  showCancel: false,
                  success: function(res) {
                    if (res.confirm) {}
                  }
                })
              }
            });
          },
          fail: function(res) {}
        });
      },
      fail: function(res) {}
    });
  }

})