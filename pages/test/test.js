const app = getApp()

var common = require('../utils/common.js')

// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      mytxt: "这是一个Test",
      color: "green"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/shop/goods/category/all',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var categories = [{ id: 0, name: "全部" }]
      
        if (res.data.code == 0) {
          for (var i = 0; i < res.data.data.length; i++) {
            categories.push(res.data.data[i]);
          }
        }
        that.setData({
          categories: categories,
          activeCategoryId: 0,
          curPage: 1
        });

      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onRead");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload");
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("onPullDownRefresh");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { 
    console.log("onReachBottom");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("onShareAppMessage");
  },

  clickMe:function(e) {
    
    // wx.navigateTo({
    //   url: "../index/index"
    // })

    // wx.redirectTo({
    //   url: '../index/index',
    // })
    console.log("Click");
    console.log(e);
    var sex = e.currentTarget.dataset.sex;
    console.log(sex);
    common.sayHello("koogong");
    common.sayGoodbye("koogong");
  },
  tabClick: function (e) {
    this.setData({
      activeCategoryId: e.currentTarget.id,
      curPage: 1
    });
    // this.getGoodsList(this.data.activeCategoryId);
  }
})