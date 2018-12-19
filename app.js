//app.js
App({
  serverUrl: "http://192.168.0.103:8080",
  data: {
    identity: "",
    index: -1,
  },

  onLaunch: function () {
    
  },

  globalData: {
    userInfo: null,
    // subDomain: "koogong", // 如果你的域名是： https://api.it120.cc/abcd 那么这里只要填写 abcd
    version: "1.0.0",
    shareProfile: '', // 首页转发的时候话术
    addList: [], // 主要负责暂时存储的添加列表中的数据
    orderDetail: {}
  }

})