// pages/match/practice/historicalDeal/historicalDeal.js
var todayDate = new Date();
var beforeDate = new Date(todayDate.getTime() - (7 * 24 * 60 * 60 * 1000));
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todayDate: todayDate.toLocaleDateString().replace(/\//g,'-'),
    beforeDate: beforeDate.toLocaleDateString().replace(/\//g, '-'),
    entrust_data: [
      {
        "name": "TCL集团",
        "time": "19:07:29",
        "entrust_price": "2.560",
        "average_price": "0.000",
        "entrust_number": "73400",
        "deal_number": "0",
        "mode": "买入",
        "state": "全部成交"
      },
      {
        "name": "许继电气",
        "time": "19:07:06",
        "entrust_price": "8.960",
        "average_price": "0.000",
        "entrust_number": "13800",
        "deal_number": "0",
        "mode": "卖出",
        "state": "全部成交"
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  bindDateChange: function (e) {
    console.log(e.target.dataset.id)
    if (e.target.dataset.id == 1){
      this.setData({
        date1: e.detail.value
      })
    }
    else{
      this.setData({
        date2: e.detail.value
      })
    }

  },
})