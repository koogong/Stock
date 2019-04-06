// pages/stock-bar/stock.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    type: 0,
    package: 0,
    quantity: 0,
    outRecord: [],
    inRecord: [],
    inSum: 0,
    outSum: 0
  },
  onChange: function(event) {
    wx.showToast({
      title: `切换到标签${event.detail.index+ 1}`,
      icon: 'none'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadTotal();
    this.loadInRecord();
    this.loadOutRecord();
  },

  loadTotal: function() {
    var that = this;
    var url = 'http://localhost:8888/stock/total';
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'accessToken': app.token
      },
      success: function (res) {
        // 请求结果成功
        console.log(res.data);
        if (res.data.success) {
          that.setData({
            type: res.data.result.type,
            quantity: res.data.result.quantity,
            package: res.data.result.package
          });
        } else {
          wx.showToast({
            title: '[Total]获取失败',
            icon: 'none'
          })
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
  loadInRecord: function() {
    var that = this;
    var url = app.serverUrl + "/stock/record/in/today";
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'accessToken': app.token
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.success) {
          that.setData ({
            inRecord: res.data.result.record,
            inSum: res.data.result.sum
          });
        } else {
          that.setData({
            inRecord: []
          })
        }
      },
      fali: function(res) {
          console.log(res);
      }
    })
  },
  loadOutRecord: function() {
    var that = this;
    var url = app.serverUrl + "/stock/record/out/today";
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'accessToken': app.token
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.success) {
          that.setData ({
            outRecord: res.data.result.record,
            outSum: res.data.result.sum
          });
        } else {
          that.setData({
            inRecord: []
          })
        }
      },
      fali: function(res) {
          console.log(res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  toRecord: function() {
    wx.navigateTo({
      url: '../record/record'
    })
  },
  toStock: function() {
    wx.navigateTo({
      url: '../stockAdd/add'
    })
  },
  toProduct: function() {
    wx.navigateTo({
      url: '../products/products'
    })
  },
  toStockList: function() {
    wx.navigateTo({
      url: '../stockList/list'
    })
  }
})
