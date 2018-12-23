// pages/orderAdd/add.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addList: [],
    index: 0
  },

  // TODO: 添加订单
  // 1. 判断是否添加成功
  // 2. 检查库存内是否有存货
  //  2.1 如果有则标记库存内有
  //  2.2 如果没有则将货物加入流程内
  addOrder:function(e) {
    console.log(e);
    var order = e.detail.value;   // 货物对象
    var type = order.type;        // 规格
    var whorl = order.whorl;      // 螺纹
    var number = order.number;    // 数量
    var piece = order.piece;      // 件数
    var message = order.message;  // 备注

    // 判断是否存在空
    if(type == null || whorl == null || number == null || number == null ) {
      wx.showToast({
        title: '请输入完整',
        icon: "none"
      })
    } else { // 输入完整
      // index自增
      this.data.index = app.data.index + 1;
      app.data.index = this.data.index;
      console.log("Index : " + this.data.index);
      // 将数据传入全局变量数组中
      getApp().globalData.addList[this.data.index] = e.detail.value;
      wx.navigateBack({

      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
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
    console.log("Hide");
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
