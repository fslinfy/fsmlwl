var Api = require("../../utils/api.js");
var callBackQuery = function (res, that) {
  var cpkc = res.data.cpkc;
  cpkc.forEach(function (item1, index1) {
    item1.forEach(function (item2, index2) {
      item2.sl = Api.slrenderer(item2.sl);
      item2.zl = Api.slrenderer(item2.zl);
      item2.kdsl = Api.slrenderer(item2.kdsl);
      item2.kdzl = Api.slrenderer(item2.kdzl);
      item2.kcsl = Api.slrenderer(item2.kcsl);
      item2.kczl = Api.slrenderer(item2.kczl);
    })
  })

  that.setData({
    menus: res.data.ck,
    cpkc: cpkc,
    cart: [],
    cpkc0: cpkc,
    sumkcsl: 0,
    sumkczl: 0,
    cartTotal: 0,
    search: '',
    activeBar: false
  })

  that.topBarInit();
  wx.hideLoading();
};
Page({
  data: {
    activeTabIndex: 0,
    activeBarIndex: 0,
    cart: [],
    sumkcsl: 0,
    sumkczl: 0,
    cartTotal: 0,
    activeBar: true,
    hidden: true
  },
  onLoad: function () {

    // this.fetchData();

    //getaccesstoken


  },
  bindfilter: function (e) {
    var that = this;
    var s = e.detail.value;
    
    var cpkc0 = that.data.cpkc0;
    var cpkc1 = that.data.cpkc;
    var cart = that.data.cart;
    var newlist = [];
    var sumsl = 0;
    var sumzl = 0;
    var cpkc = [];
    cpkc0.forEach(function (item1, index1) {
      newlist = [];
      sumsl = 0;
      sumzl = 0;

      if (index1 == that.data.activeBarIndex) {
        var item0 = cpkc1[index1];
        item0.forEach(function (item2, index2) {
          if (item2.status) {
           // sumsl = sumsl + item2.kcsl;
          //  sumzl = sumzl + item2.kczl;

            item2.sl = Api.slrenderer(item2.sl);
            item2.zl = Api.slrenderer(item2.zl);
            item2.kdsl = Api.slrenderer(item2.kdsl);
            item2.kdzl = Api.slrenderer(item2.kdzl);
            item2.kcsl = Api.slrenderer(item2.kcsl);
            item2.kczl = Api.slrenderer(item2.kczl);
            sumsl = sumsl + parseFloat(item2.kcsl);
            sumzl = sumzl + parseFloat(item2.kczl);
            newlist.push(item2);
          }
         // sumsl = parseFloat(sumsl);
         // sumzl = parseFloat(sumzl);

        })
      }
      item1.forEach(function (item2, index2) {
        if (((item2.cpmc).indexOf(s) > -1) || ((item2.cdmc).indexOf(s) > -1) || ((item2.bzmc).indexOf(s) > -1) || ((item2.cpph).indexOf(s) > -1) || (item2.status)) {
          var id = 0;
          cart.forEach(function (item, index3) {
            if (parseInt(item) == parseInt(item2.kcid)) {
              id = parseInt(item2.kcid);
            }
          })
          if (id == 0) {
            item2.sl = Api.slrenderer(item2.sl);
            item2.zl = Api.slrenderer(item2.zl);
            item2.kdsl = Api.slrenderer(item2.kdsl);
            item2.kdzl = Api.slrenderer(item2.kdzl);
            item2.kcsl = Api.slrenderer(item2.kcsl);
            item2.kczl = Api.slrenderer(item2.kczl);
            sumsl = sumsl + parseFloat(item2.kcsl);
            sumzl = sumzl + parseFloat(item2.kczl);
            newlist.push(item2);
          }
        }
      })
      cpkc.push(newlist);

      if (index1 == that.data.activeBarIndex) {
        that.setData({
          sumkcsl: Api.slrenderer(sumsl),
          sumkczl: Api.slrenderer(sumzl)
        })
      }

    })

    that.setData({
      cpkc: cpkc

    })


  },
  xskd: function () {
    
    if (!Api.checkTime()) return; 
    var that = this;
    var ckid = that.data.ckid;
    var ckmc = that.data.ckmc;
    var cp = that.data.cpkc;


    var cparray = [];
    for (let dish of cp) {
      dish.forEach((item) => {
        if (item.status) {
          item.kcsl = item.sl;
          item.kczl = item.zl;
          item.sl = 0;
          item.zl = 0;
          cparray.push(item);
        }
      })
    }
    if (cparray.length == 0) {
      wx.showModal({
        showCancel: false,
        title: '注意',
        content: "请先选择开票的商品！",
        success: function (res) {
          return;
        }
      });
      return;
    }

    var obj = {};
    obj['ckid'] = ckid;
    obj['ckmc'] = ckmc;
    obj['cp'] = cparray;




    //return;
    var name = that.data.tabName;
    var url = 'edit/edit?obj=' + JSON.stringify(obj);
    // url = 'edit/edit?obj=' + obj;

    wx.navigateTo({
      url: url
    });
  },

  edit: function (e) {
    var that = this;
    var obj = e.currentTarget.dataset.obj;
    if (obj.S_id == undefined) return;
    var objstr = JSON.stringify(obj);
    var url = 'edit/edit?obj=' + objstr
    wx.navigateTo({
      url: url
    })
  },

  // 选择CPMC
  selectcpmc(event) {
    let cp = event.currentTarget.dataset.obj.kcid;
    /*
        let flag = true;
        let cart = this.data.cart;
    
        if (cart.length > 0) {
          cart.forEach(function (item, index) {
            if (item == cp) {
              cart.splice(index, 1);
              flag = false;
            }
          })
        }
        if (flag) cart.push(cp);
        this.setData({
          cartTotal: cart.length
        })
    
    */

    this.setStatus(cp)
  },

  setStatus(dishId) {
    let dishes = this.data.cpkc;

    for (let dish of dishes) {
      dish.forEach((item) => {
        if ((item.kcid == dishId) && (item.sl > 0)) {
          item.status = !item.status || false
        }
      })
    }

    this.setData({
      cpkc: dishes
    })
    let flag = true;
    let cart = [];

    for (let dish of dishes) {
      dish.forEach((item) => {
        if (item.status) {
          cart.push(item.kcid);
        }
      })
    }

    this.setData({
      cart: cart,
      cartTotal: cart.length
    })




  },

  fetchData: function () {
    wx.showLoading({
      title: 'loading...',
    })
    var that = this;
    Api.queryData(this,
      {
        act: "cpkcmenulist",
        ckid:0,
        khid: getApp().globalData.current_khid,
        active: 1
      }, callBackQuery
    );
  },

  /*  loadData: function () {
      // 加载网络数据，获取地址列表
        this.fetchData();
  
      var vm = this;
      wx.getSystemInfo({
        success: (res) => {
          vm.setData({
            deviceWidth: res.windowWidth,
            deviceHeight: res.windowHeight
          });
        }
      });
  
  
    },
    */
  onShow: function () {
    // 页面显示
    Api.checkTime(); 
    this.fetchData();
  },

  topBarInit: function () {

    var vm = this;
    var obj = vm.data.topBarMenu;

    if (obj) {
      obj["menus"] = vm.data.menus;
      vm.setData({
        topBarMenu: obj
      });
    }
    else {
      obj = {};
      obj["activeBarIndex"] = 0;
      obj["menus"] = vm.data.menus;
      var span = wx.getSystemInfoSync().windowWidth / vm.data.menus.length + 'px';
      obj["itemWidth"] = vm.data.menus.length <= 5 ? span : '160rpx',
        vm.setData({
          activeBarIndex: 0,
          barMenu: obj.menus[0].menu,
          ckid: obj.menus[0].menuId,
          ckmc: obj.menus[0].ckmc,
          topBarMenu: obj
        });

    }
    var res = vm.data.menus;
    var k = res[obj["activeBarIndex"]];
    vm.setData({
      sumkcsl: k.sumkcsl,
      sumkczl: k.sumkczl
    });



  },

  changeTopBar: function (e) {
    if (!Api.checkTime()) return; 
    var vm = this;

    var index = e.currentTarget.dataset.index;
    var obj = vm.data.topBarMenu;


    if (obj["activeBarIndex"] == index) return;


    this.setData(
      {
        cartTotal: 0,
        cart: []
      })

    let dishes = this.data.cpkc;
    for (let dish of dishes) {
      dish.forEach((item) => {
        if (item.status) {
          item.status = false
        }
      })
    }

    this.setData({
      cpkc: this.data.cpkc
    })


    var res = vm.data.menus;
    var k = res[index];

    obj["activeBarIndex"] = index;
    vm.setData({
      activeBarIndex: index,
      ckmc: obj.menus[index].ckmc,
      ckid: obj.menus[index].menuId,
      barMenu: e.currentTarget.dataset.menu,
      activeTabIndex: 0,
      cpkc: vm.data.cpkc0,
      search: '',
      sumkcsl: k.sumkcsl,
      sumkczl: k.sumkczl,
      topBarMenu: obj
    });
  }
})