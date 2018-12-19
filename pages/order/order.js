// pages/order/order.js
import Page from '../../common/page';
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    icons: [
      'pending-orders',
      'add-o'
    ],
    orders: [], // 修改后的的订单数据
    original_orders: [], // 原始未完成订单数据

    urgent: [], // 急需的订单数据
    original_urgent: [], // 原始急需订单数据

    todayOrders: [], // 今日订单数据
    original_todayOrders: [] // 原始今日订单数据
  },
  /**
   * 添加订单按钮
   */
  add: function() {
    wx.navigateTo({
      url: '../orderAddList/list',
    });
  },

  /**
   * 订单细节页面
   */
  orderDetail: function(e) {
    var index = e.target.id;
    var part = e.target.dataset.part;
    var order;

    if (part === "orders") {
      order = this.data.orders[index];
    } else if(part === "urgent") {
      order = this.data.urgent[index];
    } else if (part === "todayOrders") {
      order = this.data.todayOrders[index];
    } else {
      wx.showToast({
        title: '订单细节页面判断失败',
        icon: "none"
      })
    }

    app.globalData.orderDetail = order;
    wx.navigateTo({
      url: '../orderDetail/detail'
    })
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.requestOrders();
    that.today();
    that.requestUrgentOrders();
  },

  /**
   * 获取 所有订单
   */
  requestOrders: function() {
    var that = this;
    var url = app.serverUrl + "/api/v1/order/uncompleted/";

    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // 请求结果成功
        if (res.data.success) {
          console.log("orders : ");
          console.log(res.data.data);

          var data = that.changeDate(res.data.data);
          
          that.changeStatus(data);
          
          that.setData({
            orders: data,
            original_orders : res.data.data
          });
        } else {
          wx.showToast({
            title: '[未完成]订单列表获取失败',
            icon: 'none'
          })
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },

  /**
   * 获取 所有未完成的急需订单
   */
  requestUrgentOrders: function() {
    var that = this;
    var url = app.serverUrl + "/api/v1/order/urgentU";

    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // 请求结果成功
        if (res.data.success) {
          console.log("urgent : ");
          console.log(res.data.data);

          var data = that.changeDate(res.data.data);

          that.changeStatus(data);

          that.setData({
            urgent: data,
            original_urgent: res.data.data
          });
        } else {
          wx.showToast({
            title: '[急需未完成]订单列表获取失败',
            icon: 'none'
          })
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },

  /**
   * 获取 今天下的订单
   */
  today: function () {
    var that = this;
    var url = app.serverUrl + "/api/v1/order/today/";

    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // 请求结果成功
        if (res.data.success) {
          console.log("today : ");
          console.log(res.data.data);
          var data = that.changeDate(res.data.data);

          that.changeStatus(data);

          that.setData({
            todayOrders: data,
            original_todayOrder: res.data.data
          });
        } else {
          wx.showToast({
            title: '[今日]订单列表获取失败或空',
            icon: 'none'
          })
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },

  /**
   * 更改订单时间格式
   */
  changeDate: function(data) {
    for (var item in data) {
      data[item].createTime = data[item].createTime.substring(5, 10);

      if(data[item].deliveryDate != null) {
        data[item].deliveryDate = data[item].deliveryDate.substring(5, 10);
      } else {
        data[item].deliveryDate = "待定";
      }

      if(data[item].storageDate != null) {
        data[item].storageDate = data[item].storageDate.substring(5, 10);
      } else {
        data[item].storageDate = "待定";
      }
    }
    return data;
  },

  /**
   * 更改订单状态
   */
  changeStatus: function(data) {
    for (var d in data) {
      if (data[d].status == "UNCOMPLETED") {
        data[d].status = "待完成";
      } else if (data[d].status == "COMPLETED") {
        data[d].status = "已完成";
      } else {
        data[d].status = "异常";
      }
    }
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
    var that = this;
    that.today();
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