// pages/orderAddList/list.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addList: [],
    name: ''
  },

  /**
   * @method 添加订单按钮
   * @desc 跳转到添加货物页面
   */
  addOrder: function() {

    wx.navigateTo({
      url: '../orderAdd/add',
    })
  },

  /**
   * 完成按钮
   * TODO: 
   *  1.将订单列表存入数据库
   *  2.后端分配订单任务
   * 
   */
  finishOrder: function() {
    var data = this.data;
    var name = data.name;
    var orderList = data.addList;

    console.log("finish Order");
    console.log("name : " + name);
    console.log(data.addList);

    if (name == null || name == '') {
      console.log(name);
      wx.showToast({
        title: '订单名不能为空',
        icon: 'none'
      })
    } else if (orderList == null || orderList.length == 0) {
      wx.showToast({
        title: '订单不能为空',
        icon: 'none'
      })
    } else {
      var serverUrl = app.serverUrl;
      console.log(serverUrl);
      /**
       * 向服务器发出添加订单请求
       */
      wx.request({
        url: serverUrl + '/api/v1/order/',
        method: "POST",
        data: {
          name: data.name,
          orderStatus: "待完成",
          products: orderList,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          if(res.data.status == 201) {
            wx.showToast({
              title: '添加成功'
            })
            console.log(res.data);
            wx.navigateBack({})
          } else if (res.data.status == 400) {
            wx.showToast({
              title: '订单名以存在',
              icon: 'none'
            })
            console.log(res.data);
          } else {
            wx.showToast({
              title: '添加失败',
              icon: 'none'
            })
            console.log(res.data);            
          }
        },
        fail: function() {
          wx.showToast({
            title: '订单添加失败',
            icon: "none"
          })
        }
      })
    }
  },


  /**
   * @method 添加订单名
   * @param {map} e
   * @desc 将订单名称传入本地数据
   */
  addUsername: function(e) {
    this.setData({
      name: e.detail.detail.value
    })
  },

  /**
   * @method 货物细节
   * @param {int} index
   * @desc 通过传过来的index来获取全局变量中
   *       addList数组中的数据，并传入下一个页面
   */
  detail: function(e) {

    var index = e.target.id;
    var list = getApp().globalData.addList;

    console.log(list[index]);

    var goods = list[index];
    wx.navigateTo({
      url: '../goodsDetail/detail?index=' + index,
      success: function() {
        console.log("切换至 goodsDetail 页面 index = " + index);

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("Order Add List 页面 onLoad ");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("Order Add List 页面 onShow ");
    var addList = app.globalData.addList;

    /**
     * 判断数组是否为空
     */
    if (addList == null || addList == '') {
      console.log("addList Null");
    } else {
      console.log(this.data.addList);
    }
    // 数据传入列表中
    this.setData({
      addList: addList
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    // wx.navigateBack({
    //   delta: 2
    // })
    console.log("Order Add List 页面 onUnload ");
    app.globalData.addList = [];
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})