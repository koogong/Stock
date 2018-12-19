// pages/stockClass/class.js
import Page from '../../common/page';
import config from './config';


Page({
  data: {
    items: [
      {
        // 导航名称
        text: '所有规格',
        // 该导航下所有的可选项
        children: [...config.pro1, ...config.pro2, ...config.pro3, ...config.pro4, ...config.pro5, ...config.pro6, ...config.pro7, ...config.pro8, ...config.pro9]
      }, {
        // 导航名称
        text: config.pro1Name,
        // 该导航下所有的可选项
        children: config.pro1
      }, {
        text: config.pro2Name,
        children: config.pro2
      }, {
        text: config.pro3Name,
        children: config.pro3
      }, {
        text: config.pro4Name,
        children: config.pro4
      }, {
        text: config.pro5Name,
        children: config.pro5
      }, {
        text: config.pro6Name,
        children: config.pro6
      }, {
        text: config.pro7Name,
        children: config.pro7
      }, {
        text: config.pro8Name,
        children: config.pro8
      }, {
        text: config.pro9Name,
        children: config.pro9
      }
    ],
    mainActiveIndex: 0,
    activeId: 1002
  },

  onClickNav({ detail = {} }) {
    this.setData({
      mainActiveIndex: detail.index || 0
    });
  },

  onClickItem({ detail = {} }) {
    this.setData({
      activeId: detail.id
    });
    console.log(this.data.activeId);
  },


});
