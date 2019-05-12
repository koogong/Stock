// pages/stockList/list.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    products: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadProducts();
  },

  /*
    加载产品信息
  */
  loadProducts: function() {
    var that = this;
    var url = app.serverUrl + "/stock/products";

    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-from-urlencoded',
        'accessToken': app.token
      },
      success: function(res) {
        console.log('库存数据加载: ');
        console.log(res.data);

        if (res.data.success) {
            that.setData({
              products: res.data.result
            })
        } else {
          wx.showToast({
            'title': '数据获取失败',
            'icon:': 'none'
          })
        }

      }, fail: function(res) {
        wx.showToast({
          'title': '数据请求失败',
          'icon': 'none'
        })
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

  }
})
