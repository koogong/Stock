// pages/stockAdd/add.js
import Dialog from '../../dist/dialog/dialog';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    show: '',
    bottom: false,
    bottom2: false,
    list: ['60x90', '70x90', '80x90'],
    result: [],
    products: [],
    process: [],
    packageSum: 0,
    numSum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadProducts();
  },
  loadProducts:function() {
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
        console.log('库存数据加载：');
        console.log(res.data);
        if (res.data.success) {
          that.setData({
            products: res.data.result
          })
        } else {
          wx.showToast({
            title: '数据获取失败',
            icon: 'none'
          })
        }
      }
    })
  },
  toProcess:function(e) {
    this.setData({
      process: this.data.process.concat(e.target.dataset.product)
    });
    console.log(this.data.process);
  },
  onChange1(e) {
    this.setData({
      value: e.detail
    });
  },
  /*
    触发CheckBox
  */
  onChange(event) {
    const { key } = event.currentTarget.dataset;
    console.log(event);
    this.setData({ [key]: event.detail });
    console.log(this.data.result);
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
  onFocus: function(event) {

  },

  onBlur: function(event) {

  },
  toggleBottomPopup: function() {
    this.setData({
      bottom: !this.data.bottom
    })
  },
  toggleBottomPopup2: function() {
    this.setData({
      bottom2: !this.data.bottom2
    })
  },
  onClose(event) {
    const { position, instance } = event.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？'
        }).then(() => {
          instance.close();
        });
        break;
    }
  },
  toggle(event) {
    const { name } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${name}`);
    checkbox.toggle();
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
