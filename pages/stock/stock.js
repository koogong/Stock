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

  onSearch(event) {
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
  }

  
});
