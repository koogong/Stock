// pages/record/record.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    inRecord: [],
    outRecord: []
  },
  /**
    搜索关键词获取产品信息并且选中
  **/
  onSearch(event) {
    if (this.data.value) {
      wx.showToast({
        title: '搜索：' + this.data.value,
        icon: 'none'
      });
    }
  },
  /**
    清理输入框并且重新加载所有产品数据
  **/
  onClear: function() {
    wx.showToast({
      title: '清空',
      icon: 'none'
    });
  },
  onChange(e) {
    this.setData({
      value: e.detail
    });
  },
  onClick(event) {
    var text = '入库';
    if(event.detail.index == 0) {
      text = '出库';
    }
    wx.showToast({
      title: text,
      icon: 'none'
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadRecords();
  },

  /**
   * 加载入库记录数据
   */
  loadRecords: function() {
    var that = this;
    var url = app.serverUrl + "/stock/record/all"

    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-from-urlencoded',
        'accessToken': app.token
      },
      success: function(res) {
        console.log(res.data);
          if (res.data.success) {
            that.setData({
              inRecord: res.data.result.in,
              outRecord: res.data.result.out
            })
          } else {
            wx.showToast({
              title: '记录获取失败',
              icon: 'none'
            })
          }

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
