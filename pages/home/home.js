// pages/home/home.js
const app = getApp()

Page({

  data: {
    identity: "造型",
    tabs: [1, 2, 3, 4],
    tabsMore: [1, 2, 3, 4, 5, 6, 7, 8],
    section: ["造型", "浇铸", "喷砂", "加工", "淬火", "车磨", "装箱"]
  },

  onChange(event) {
    console.log()
    this.data.identity = event.detail.title;
    wx.showToast({
      title: `切换至 ${event.detail.title}`,
      icon: 'none'
    });
  },

  pending: function() {
    wx.navigateTo({
      url: '../pending/pending?identity='+this.data.identity,
      // success: "setIdentity"
    })
  },

  setIdentity: function() {
    console.log(this.data.identity);
    app.data.identity = this.data.identity;
  }
})