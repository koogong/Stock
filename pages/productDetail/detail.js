// pages/productDetail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: {},
    unit: '',
    showBottom: false,
    column: ['无','个', '件'],
  },
  toggleBottomPopup: function() {
    this.setData({
      showBottom: !this.data.showBottom
    })
  },
  onChange:function(event) {
    this.setData({
      unit: event.detail.value
    })
  },
  onCancel:function() {
    this.setData({
      showBottom: !this.data.showBottom,
    })
  },
  onConfirm:function() {
    this.setData({
      showBottom: !this.data.showBottom
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log("ProductId: " + getApp().globalData.productId);
      var id = getApp().globalData.productId;
      var url = getApp().serverUrl + '/product/' + id;
      var token = getApp().token;
      var product;
      var that = this;
      wx.request({
        url: url,
        method: "GET",
        header: {
            'content-type': 'application/x-www-form-urlencoded',
            'accessToken': token
        },
        success: function(res) {
          console.log(res);
          if (res.data.success) {
            that.setData({
              product: res.data.result
            })
            console.log(that.data.product);
          } else {
            wx.showToast({
              title: '加载失败!',
              icon: 'none'
            })
          }
        }
      })
  },
  /**
  * @method 更新产品属性
  * @param {map} e from表单中输入的信息
  * @desc 如果属性被更改则修改输入的信息.
  */
  updateProduct: function(event) {
    console.log("Method : updateProduct");
    var value = event.detail.value;
    console.log(value);
    console.log(this.data.product.id);

    var url = getApp().serverUrl + '/product/edit/';
    var token = getApp().token;

    wx.request({
      url: url,
      method: "POST",
      header: {
          'content-type': 'application/x-www-form-urlencoded',
          'accessToken': token
      },
      data: {
        id: this.data.product.id,
        name: value.name,
        type: value.type,
        whorl: value.whorl,
        seam: value.seam,
        minus: value.minus,
        price: value.price,
        piece: value.piece,
        unit: value.unit,
        description: value.description
      },
      success: function(res) {
        // 请求成功
        console.log(res);
        if (res.data.success) {
          wx.showToast({
            title: '更新成功'
          })
          // wx.navigateBack({})
        } else { // 请求失败
          wx.showToast({
            title: '更新失败',
            icon: 'none'
          })
        }
      }
    })


      // 如果更新成功，返回
      wx.navigateBack({delta: 0})
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
