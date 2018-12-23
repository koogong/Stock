import Page from '../../common/page';

Page({
  data: {
    icons: [
      'wap-nav',
      'add-o'
    ],
    sumPiece: 100,
    sum: 200
  },

  onChange(e) {
    this.setData({
      value: e.detail
    });
  },
  requestOrders: function () {
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
            original_orders: res.data.data
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
  // 根据类型搜索库存
  onSearch(event) {
    var that = this;
    var url = app.serverUrl + "/stock/add/";
    var token = getApp().globalData.usrInfo['token'];

    wx.request({
        url: url,
        method: 'POST',
        data: {
            productId: productId,
            packages: packages,
            description: description
        },
        header: {
            'content-type': 'application/x-www-form-urlencoded',
            'accessToken': token
        },
        success: function (res) {
            if (res.data.success) {
                console.log("Stock : ");
                console.log(res.data);
            }
        }
    })


    if (event.detail) {
      wx.showToast({
        title: '搜索：' + event.detail,
        icon: 'none'
      });

      wx.navigateTo({
        url: '../stockSearch/search',
      })
    }
  },

  onCancel() {
    wx.showToast({
      title: '取消',
      icon: 'none'
    });
  },

  stockClass: function() {
    wx.navigateTo({
      url: '../stockClass/class',
    })
  },

  // 跳转至产品列表页面
  toProducts: function() {
    wx.navigateTo({
      url: '../products/products'
    })
  },

  toProductAdd: function() {
    wx.navigateTo({
      url: '../productAdd/add'
    })
  },

  onProductSearch: function() {

  }


});
