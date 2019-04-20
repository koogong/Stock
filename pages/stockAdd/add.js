// pages/stockAdd/add.js
import Dialog from '../../dist/dialog/dialog';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    show: '',
    bottom: false,
    bottom2: false,
    list: ['60x90', '70x90', '80x90'],
    result: [],
    products: [],
    process: [],
    packMap: [], // 产品索引-产品件数
    packageSum: 0,
    numSum: 0,
    count: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadProducts();
  },
  loadProducts:function() {
    var that = this;
    var url = app.serverUrl + "/stock/products";

    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-from-urlencoded',
        'accessToken': app.token
      },
      success: function(res) {
        console.log('库存数据加载：');
        console.log(res.data);
        if (res.data.success) {
          that.setData({
            products: res.data.result
          })
        } else {
          wx.showToast({
            title: '数据获取失败',
            icon: 'none'
          })
        }
      }
    })
  },

  onChange1(e) {
    this.setData({
      value: e.detail
    });
  },
  onSelect(event) {
    const { key } = event.currentTarget.dataset;
    var products = this.data.products;


    var temp = [];

    this.setData({ [key]: event.detail });

    var result = this.data.result;
    // 当 result 为空清空所有相关数据
    if(this.data.result.length == 0) {
      this.setData({
        packageSum: 0,
        numSum: 0,
        PackMap: [],
        count: 0,
      })
    } else { // 将 result 中存在数据至 temp
        result.map((item) => {
          var map = {
            'index' : item,
            'package' : 0
          }
          temp.push(map);
        })
    }
    var packMap = this.data.packMap;
    // 减少了选中的选项,当packMap大于Temp时，那么则会将packMap中与temp中相等的替换temp中后将temp代替全局变量packMap
    // 如果取出if语句则会出现index不存在的问题
    if (packMap.length > temp.length) {
        console.log("Reduce");
        for(var i = 0; i < temp.length; i++) {
          for(var j = 0; j < packMap.length; j++) {
            if (temp[i].index == packMap[j].index) {
                temp[i] = packMap[j];
            }
          }
        }
    } else if(packMap.length < temp.length) {
        console.log("Increment");
        for (var i = 0; i < temp.length; i++) {
          for (var j = 0; i < packMap.length; i++) {
            if (temp[i].index == packMap[j].index) {
                temp[i] = packMap[j];
            }
          }
        }
    }

    this.setData({
      packMap: temp
    })

    console.log(this.data.result);
    console.log('PackageSum ' + this.data.packageSum);
    console.log('PackMap :');
    console.log(this.data.packMap);

  },
  /*
    触发步进器按钮Stepper
  */
  onStepper(event) {
      var packMap = this.data.packMap
      console.log("触发步进器");
      console.log(event.target.dataset.index + " : " + event.detail);

      if(packMap.length != 0) {
        for(var i = 0 ; i < packMap.length; i++) {
          if (packMap[i].index == event.target.dataset.index) {
            packMap[i].package = event.detail;
          }
        }
      }

      this.setData({
        packMap: packMap
      })
      console.log("PackMap : ");
      console.log(packMap);
  },
  onPlus(event) {

    this.setData({
      packageSum: this.data.packageSum + 1
    })
  },
  onMinus(event) {
    this.setData({
      packageSum: this.data.packageSum - 1
    })
  },
  /**
    搜索关键词获取产品信息并且选中
  **/
  onSearch(event) {
    if (this.data.value) {
      wx.showToast({
        title: '搜索：' + this.data.value,
        icon: 'none'
      });
    }
  },
  /**
    清理输入框并且重新加载所有产品数据
  **/
  onClear: function() {
    wx.showToast({
      title: '清空',
      icon: 'none'
    });
  },
  onFocus: function(event) {

  },

  onBlur: function(event) {

  },
  // 入库按钮
  toggleBottomPopupIn: function() {
    var result = this.data.result;
    var packMap = this.data.packMap;
    var temp = [];
    var packSum = 0;
    var numSum = 0;

    // 将result中存在的索引存入新的数组中
    // packMap中的index对应result的值
    console.log(packMap);
    result.map((item) => {
      packMap.map((pack) => {
        if (pack.index == item) {
            temp.push(pack);
        }
      })
    })

    console.log("Button:");
    console.log(temp);

    this.setData({
      bottom: !this.data.bottom,
      packMap: temp,
      packageSum: packSum
    })
  },
  // 出库按钮
  toggleBottomPopupOut: function() {
    this.setData({
      bottom2: !this.data.bottom2
    })
  },
  onClose(event) {
    const { position, instance } = event.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？'
        }).then(() => {
          instance.close();
        });
        break;
    }
  },
  toggle(event) {
    const { name } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${name}`);
    checkbox.toggle();
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
