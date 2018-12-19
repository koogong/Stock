import Page from '../../common/page';

Page({
  data: {
    active: 0,
    active2: 0,
    icon: {
      normal:
        'https://img.yzcdn.cn/public_files/2017/10/13/c547715be149dd3faa817e4a948b40c4.png',
      active:
        'https://img.yzcdn.cn/public_files/2017/10/13/793c77793db8641c4c325b7f25bf130d.png',
      order_normal: "/pages/resources/images/order_normal.png",

      order_active: "/pages/resources/images/order_active.png",
      home_normal: "/pages/resources/images/home_normal.png",
      home_active: "/pages/resources/images/home_active.png",
      me_normal: "/pages/resources/images/me_normal.png",
      me_active: "/pages/resources/images/me_active.png"
    }
  },

  onChange(event) {
    console.log(event.detail);
    if(event.detail == 1) {
      wx.navigateTo({
        url: '../test/test'
      })
    }
  }
});
