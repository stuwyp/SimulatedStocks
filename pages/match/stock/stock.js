// pages/match/stock/stock.js

// pages/match/practice/practice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSelected: [true, false, false, false, false],
    profit: 0,
    warehouse_data: [
      {
        "name": "总资产",
        "data": "500000.00",
      },
      {
        "name": "浮动盈亏",
        "data": "0.00",
      },
      {
        "name": "当日参考盈亏",
        "data": "0.00",
      },
      {
        "name": "总市值",
        "data": "0.00",
      },
      {
        "name": "可用",
        "data": "375900.78",
      },
      {
        "name": "可取",
        "data": "0.00",
      },
    ],
    price_low: "5.23",
    price_high: "6.23",
    stock_number: 0,
    sale_data: [
      {
        "price": "8.99",
        "number": "320"
      },
      {
        "price": "8.98",
        "number": "265"
      },
      {
        "price": "8.97",
        "number": "123"
      },
      {
        "price": "8.96",
        "number": "9"
      },
      {
        "price": "8.95",
        "number": "80"
      },
    ],
    buy_data: [
      {
        "price": "8.94",
        "number": "38"
      },
      {
        "price": "8.93",
        "number": "26"
      },
      {
        "price": "8.92",
        "number": "155"
      },
      {
        "price": "8.91",
        "number": "449"
      },
      {
        "price": "8.90",
        "number": "80"
      },
    ],
    hold_stock: [
      {
        "name": "许继电气",
        "value": "123786.000",
        "profit": "1031.190",
        "profit_percent": "0.840%",
        "hold": "13800",
        "use": "0",
        "cost": "8.895",
        "price": "8.970"
      },
      {
        "name": "许继电气",
        "value": "123786.000",
        "profit": "1031.190",
        "profit_percent": "0.840%",
        "hold": "13800",
        "use": "0",
        "cost": "8.895",
        "price": "8.970"
      },
      {
        "name": "许继电气",
        "value": "123786.000",
        "profit": "-1031.190",
        "profit_percent": "-0.840%",
        "hold": "13800",
        "use": "0",
        "cost": "8.895",
        "price": "8.970"
      },
    ],
    entrust_data: [
      {
        "name": "TCL集团",
        "time": "19:07:29",
        "entrust_price": "2.560",
        "average_price": "0.000",
        "entrust_number": "73400",
        "deal_number": "0",
        "mode": "买入",
        "state": "未成交"
      },
      {
        "name": "许继电气",
        "time": "19:07:06",
        "entrust_price": "8.960",
        "average_price": "0.000",
        "entrust_number": "13800",
        "deal_number": "0",
        "mode": "卖出",
        "state": "未成交"
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
  change: function (e) {
    let that = this
    let isSelected = that.data.isSelected
    let id = Number.parseInt(e.currentTarget.dataset.id)
    if (isSelected[id])
      return
    else {
      for (let i = 0; i < isSelected.length; i++) {
        isSelected[i] = false
      }
      isSelected[id] = true
      that.setData({
        isSelected
      })
    }
  },
})


// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {

//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {

//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })