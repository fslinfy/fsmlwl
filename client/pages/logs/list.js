var Api = require("../../utils/api.js");
const util = require('../../utils/util.js')
Page({
  data: {
    logs: []
  },
  add: function () {
    wx.setStorageSync('logs', []);
    this.setData({
      logs:[]
    })
  },
  onLoad: function () {
    Api.checkTime(); 
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})

