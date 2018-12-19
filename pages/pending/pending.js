// pages/pending/pending.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: 0,
    rejected: 0,
    remark: '',
    pending: true
  },

  onChange: function(e) {
    console.log(e.detail);
  },

  /**
   * 完成按钮
   */
  finish: function(e) {
    console.log(e);
    this.data.value = e.detail.value.value;
    this.data.rejected = e.detail.value.rejected;
    this.data.remark = e.detail.value.remark;
    console.log(this.data.value);
    console.log(this.data.rejected);
  },










  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.identity);
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