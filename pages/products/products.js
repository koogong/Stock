// pages/products/products.js
import config from './config';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      products: [],
      show: false,
      mask: false,
      mainActiveIndex: 0,
      activeId: 0,
      items: [
        {
          text: config.pro1Name,
          children: config.pro1
        }, {
          text: config.pro2Name,
          children: config.pro2
        }, {
          text: config.pro3Name,
          children: config.pro3
        }, {
          text: config.pro4Name,
          children: config.pro4
        }
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.requestProducts();
  },

  onClickNav({ detail }) {
    this.setData({
      mainActiveIndex: detail.index || 0
    });
  },

  onClickItem({ detail }) {
    this.setData({
      activeId: detail.id
    });
    console.log(detail);
  },

  /**
   * 搜索输入框内的值
   */
  onChange(e) {
    this.setData({
      value: e.detail
    });
  },

  /**
   * 搜索按钮
   */
  onSearch(event) {
    if (event.detail) {
      wx.showToast({
        title: '搜索：' + this.data.value,
        icon: 'none'
      });
    }
  },

  onCancel() {
    wx.showToast({
      title: '取消',
      icon: 'none'
    });
  },

  onSelect: function() {
    this.setData({
      show: !this.data.show,
      mask: !this.data.mask
    })
  },

  onMask: function() {
    this.setData({
      mask: !this.data.mask,
      show: false,
      show2: false
    })
  },
  /**
  * 获取 产品列表
  */
  requestProducts: function() {
    var that = this;
    var url = getApp().serverUrl + "/product/products/";
    // var token = getApp().globalData.usrInfo['token'];
    var token = getApp().token;
    wx.request({
      url: url,
      method: 'GET',
      header: {
          'content-type': 'application/x-www-form-urlencoded',
          'accessToken': token
      },
      success: function(res) {
        // 请求结果成功
        if (res.data.success) {
          console.log("Products : ");
          console.log(res.data);

          that.setData({
            products: res.data.result
          })

        } else { // 请求结果失败
          wx.showToast({
            title: '产品列表获取失败',
            icon: 'none'
          })
        }
      },
      fail: function(res) {
        console.log(res);
      }
    })
  },
  productDetail:function(event) {
    var id = event.target.id;

    getApp().globalData.productId = id;
    wx.navigateTo({
      url: '../productDetail/detail'
    })
  },

  addProduct: function() {
    wx.navigateTo({
      url: '../productAdd/add'
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
