// pages/stock-bar/stock.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0
  },
  onChange: function(event) {
    wx.showToast({
      title: `切换到标签${event.detail.index+ 1}`,
      icon: 'none'
    })
  },

  toRecord: function() {
    wx.showToast({
      title: "Record",
      icon: 'none'
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
    wx.showToast({
      title: "StockList",
      icon: 'none'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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