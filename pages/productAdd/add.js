// pages/productAdd/add.js
import Toast from '../../dist/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showBottom: false,
    column: ['无','个', '件'],
    unit: ''
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
  addProduct: function(event) {
    var type = event.detail.value.type;   // 规格
    var whorl = event.detail.value.whorl; // 螺纹
    var price = event.detail.value.price; // 价格
    var piece = event.detail.value.piece; // 单件
    var unit = event.detail.value.unit;   // 单位
    console.log(event.detail);
    if (type == null || whorl == null) {
      wx.showToast({
        title: '请将产品规格输入完整',
        icon: 'none'
      })
    } else if(price == null || piece == null || unit == null || unit == "") {
      wx.showToast({
        title: '请将其他信息输入完整',
        icon: 'none'
      })
    } else {
      // 调用post请求方法
      this.postProduct(event.detail.value);
    }


  },

  postProduct: function(event) {
    var name = event.name;   // 名称
    var type = event.type;   // 规格
    var whorl = event.whorl; // 螺纹
    var seam = event.seam;   // 止口
    var minus = event.minus; // 负
    var price = event.price; // 价格
    var piece = event.piece; // 单件
    var unit = event.unit;   // 单位
    var description = event.description;// 备注

    var url = getApp().serverUrl + '/product/add/';
    var token = getApp().token;

    wx.request({
      url: url,
      method: "POST",
      data: {
        name: name,
        type: type,
        whorl: whorl,
        seam: seam,
        minus: minus,
        price: price,
        piece: piece,
        unit: unit,
        description: description
      },
      header: {
          'content-type': 'application/x-www-form-urlencoded',
          'accessToken': token
      },
      success: function(res) {
        if (res.data.success) {
          wx.showToast({
            title: '添加成功'
          })
          console.log(res.data);
          wx.navigateBack({})
        } else {
          wx.showToast({
            title: '添加失败',
            icon: 'none'
          })
        }
      }
    })

  },

  /**
  * 校验 规格 是否符合
  **/
  checkType:function() {

  },
  /**
  * 校验 螺纹 是否符合
  **/
  checkWhorl:function() {

  },
  /**
  * 校验 止口 是否符合
  **/
  checkSeam: function() {

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
