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

  onChange1(e) {
    this.setData({
      value: e.detail
    });
  },
  onSelect(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({ [key]: event.detail });
  },
  /*
    触发步进器按钮Stepper
  */
  onStepper(event) {
    var map = {
        'index': event.target.dataset.index,
        'id':event.target.dataset.id,
        'piece': event.target.dataset.piece,
        'package': event.detail
    }
    this.pushMap(map);
  },
  pushMap(event) {
    console.log('PushMap');
    var process = this.data.process;
    // TODO 2019-4-12 每次点击步进器将新的产品信息添加到process数组中，而重复的则覆盖
    process[event.index] = event;
    this.setData({
      process: process
    })
    console.log(this.data.process);
  },
  onPlus(event) {
    console.log('Plus');
    this.setData({
      packageSum: this.data.packageSum + 1
    })
  },
  onMinus(event) {
    console.log('Minus');
    this.setData({
      packageSum: this.data.packageSum - 1
    })
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
  // 入库按钮
  toggleBottomPopupIn: function() {
    this.setData({
      bottom: !this.data.bottom
    })
  },
  // 出库按钮
  toggleBottomPopupOut: function() {
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
