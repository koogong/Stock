// pages/goodsDetail/detail.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,   // 货物的在全局订单列表中的索引
    number: 0,  // 货物 数量
    piece: 0,   // 货物 件数
    type: "0",   // 货物 型号
    whorl: "30x0",  // 货物 螺纹
    message: "" // 货物 备注
  },

  /**
   * @method 修改货物属性
   * @param {map}e 页面中form表单中输入的信息
   * @desc 更新货物属性，如果属性被修改则更新属性，
   *       并将数据传入全局变量数组(globalData.addList[index])中
   *       否则不做修改。
   */
  updateOrder: function(e) {
    console.log("Method : updateOrder");
    var value = e.detail.value;
    var data = this.data;

    
    if (this.compareValue(value)) {// 更新成功
      getApp().globalData.addList[this.data.index] = data;

      console.log("Update Order 更新全局变量中的值 : ");
      console.log(getApp().globalData.addList[this.data.index]);

      // 如果更新成功，返回
      wx.navigateBack({})
    } else { // 未更新

    }
  },
  /**
   * @method 比较货物
   * @param {map} value 当前页面输入框中输入的值
   * @desc 比较 本地数据 与 form表单 中的数据是否一致
   * @return 数据一致 false , 数据被修改 true
   */
  compareValue: function(value) {
    var data = this.data;

    console.log(data);
    console.log(value);
    console.log(data.type != value.type);
    console.log(data.whorl != value.whorl);
    console.log(data.number != value.number);
    console.log(data.piece != value.piece);
    console.log(data.message != value.message);

    // 比较数据是否被修改
    if(data.type != value.type || data.whorl != value.whorl || data.number != value.number || data.piece != value.piece|| data.message != value.message) {
      this.setData({
        type: value.type,
        whorl: value.whorl,
        number: value.number,
        piece: value.piece,
        message: value.message
      })

      wx.showToast({
        title: '修改成功'
      })
      return true;
    } else {
      wx.showToast({
        title: '未修改',
        icon: "none"
      })
      return false;
    }
  },

  /**
   * @method 删除货物
   * @desc 将该货物从货物列表中删除即可
   */
  deleteOrder: function() {
    console.log("Method : deleteOrder");
    
    this.deleteModal();

    
  },

  deleteModal: function() {
    var index = this.data.index;
    wx.showModal({
      title: '',
      content: '确认删除该货物吗？',
      cancelColor: '#0076FF',
      confirmColor: '#0076FF',
      success: function (res) {
        if (res.confirm) {
          // 删除数组中的指定元素
          var addList = getApp().globalData.addList;
          addList.splice(index, 1);

          console.log("用户点击确定，删除成功");
          
          wx.showToast({
            title: '删除成功',
            success: function() {
              wx.navigateBack({
                delta: 1,
              }) // 返回上级页面
              // wx.redirectTo({
              //   url: '../orderAddList/list',
              // })
            }
          })
        } else if (res.cancel) {
          console.log("用户点击取消，删除失败");
        }
      }
    })
  },

  

  /**
   * 生命周期函数--监听页面加载
   * @param (map)options 传值: index 索引
   * @desc 首次加载页面时，首先获取options中index索引。
   *        之后通过索引获取全局变量中addList的属性。
   */
  onLoad: function (options) {
    console.log("Goods Detail 页面 onLoad");
    // 获取货物的 index
    var index = options.index;
    this.data.index = options.index;
 
    
    // 通过 index 获取全局变量中的goods
    var goods = app.globalData.addList[index];
    // this.data.type = goods.type;

    // 填充货物属性
    this.fillDetail(goods);
    
  },

  /**
   * @method 填充货物属性
   * @param {map}goods 货物属性
   * @desc 将传过来的货物属性传入当前页面的Data中，方便对其修改
   */
  fillDetail: function(goods) {
    this.setData({
      goods: goods,
      type: goods.type,
      whorl: goods.whorl,
      message: goods.message,
      number: goods.number,
      piece: goods.piece
    });
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
    console.log("Goods Detail 页面 Unload");
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