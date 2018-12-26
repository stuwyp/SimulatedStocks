// pages/stock/stock_detail/stock_detail.js

const baseUrl = "http://hq.sinajs.cn/list="
const baseImage ="http://image.sinajs.cn/newchart/"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSelected: [true, false, false, false],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    let that=this
    let image=baseImage+'min/n/'+options.code+'.gif'
    let fenshi = baseImage + 'min/n/' + options.code + '.gif'
    let rik = baseImage + 'daily/n/' + options.code + '.gif'
    let zhouk = baseImage + 'weekly/n/' + options.code + '.gif'
    let yuek = baseImage + 'monthly/n/' + options.code + '.gif'
    wx.setNavigationBarTitle({
      title: options.name,
    })
    console.log(options)
    let url=baseUrl+options.code
    wx.request({
      url: url,
      success(res){
        let str = res.data
        let arr = str.split(',')
        /*
          yesterday为昨日报收
          now为现在数据
          change为变化
          percent为变化率
          high为最高点
          low为最低点
          number为交易量
          value为交易额
         */
        let yesterday = Number.parseFloat(arr[2]).toFixed(2)
        let now = Number.parseFloat(arr[3]).toFixed(2)
        let change = (now - yesterday).toFixed(2)
        let percent = (Math.abs(change) * 100 / yesterday).toFixed(2)
        let high = Number.parseFloat(arr[4]).toFixed(2)
        let low = Number.parseFloat(arr[5]).toFixed(2)
        let number = (Number.parseFloat(arr[8]) / 100000000).toFixed(2)
        let value = (Number.parseFloat(arr[9] / 100000000)).toFixed(1)
        that.setData({
          yesterday,
          now,
          change,
          percent,
          high,
          low,
          number,
          value,
          image,
          fenshi,
          rik,
          zhouk,
          yuek
        })
        wx.hideLoading()
      }
    })
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
  switchItem: function (e) {
    let item = Number.parseInt(e.currentTarget.dataset.item)
    let that = this
    let isSelected = that.data.isSelected
    if (isSelected[item] == true)
      return
    for (let i = 0; i < isSelected.length; i++) {
      isSelected[i] = false
    }
    isSelected[item] = true
    let image
    if (item == 0)
      image = that.data.fenshi
    else if (item == 1)
      image = that.data.rik
    else if (item == 2)
      image = that.data.zhouk
    else if (item == 3)
      image = that.data.yuek
    that.setData({
      isSelected,
      image
    })
  },
})