// pages/stock/index_detail/index_detail.js
const shenzhengUrl = "http://hq.sinajs.cn/list=sz399001"
const shangzhengUrl = "http://hq.sinajs.cn/list=sh000001"
const chuangyeUrl = "http://hq.sinajs.cn/list=sz399006"

const imageBaseUrl="http://image.sinajs.cn/newchart/"
const test = "http://image.sinajs.cn/newchart/min/n/sh000001.gif"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSelected:[true,false,false,false],
    image: "http://image.sinajs.cn/newchart/min/n/sh000001.gif",
    fenshi:"http://image.sinajs.cn/newchart/min/n/sh000001.gif",
    rik:"http://image.sinajs.cn/newchart/daily/n/sh000001.gif",
    zhouk:"http://image.sinajs.cn/newchart/weekly/n/sh000001.gif",
    yuek:"http://image.sinajs.cn/newchart/monthly/n/sh000001.gif"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    let that=this
    let url
    let image
    let fenshi
    let rik
    let zhouk
    let yuek
    if(options.name=="上证指数"){
      url = shangzhengUrl
      wx.setNavigationBarTitle({
        title: '上证指数',
      })
      image = "http://image.sinajs.cn/newchart/min/n/sh000001.gif"
      fenshi = "http://image.sinajs.cn/newchart/min/n/sh000001.gif"
      rik = "http://image.sinajs.cn/newchart/daily/n/sh000001.gif"
      zhouk = "http://image.sinajs.cn/newchart/weekly/n/sh000001.gif"
      yuek = "http://image.sinajs.cn/newchart/monthly/n/sh000001.gif"
    }
    else if(options.name=="深证成指"){
      url = shenzhengUrl
      wx.setNavigationBarTitle({
        title: '深证成指',
      })
      image = "http://image.sinajs.cn/newchart/min/n/sz399001.gif"
      fenshi= "http://image.sinajs.cn/newchart/min/n/sz399001.gif"
      rik ="http://image.sinajs.cn/newchart/daily/n/sz399001.gif"
      zhouk = "http://image.sinajs.cn/newchart/weekly/n/sz399001.gif"
      yuek = "http://image.sinajs.cn/newchart/monthly/n/sz399001.gif"
    }
    else if(options.name=="创业板指"){
      url = chuangyeUrl
      wx.setNavigationBarTitle({
        title: '创业板指',
      })
      image = "http://image.sinajs.cn/newchart/min/n/sz399006.gif"
      fenshi = "http://image.sinajs.cn/newchart/min/n/sz399006.gif"
      rik = "http://image.sinajs.cn/newchart/daily/n/sz399006.gif"
      zhouk = "http://image.sinajs.cn/newchart/weekly/n/sz399006.gif"
      yuek = "http://image.sinajs.cn/newchart/monthly/n/sz399006.gif"
    }
    /*请求对应指数*/
    wx.request({
      url: url,
      success(res) {
        //console.log(res)
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
        let high=Number.parseFloat(arr[4]).toFixed(2)
        let low=Number.parseFloat(arr[5]).toFixed(2)
        let number=(Number.parseFloat(arr[8])/100000000).toFixed(2)
        let value=(Number.parseFloat(arr[9]/100000000)).toFixed(1)
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
          yuek,
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
  
  switchItem:function(e){
    let item=Number.parseInt(e.currentTarget.dataset.item)
    let that=this
    let isSelected = that.data.isSelected
    if(isSelected[item]==true)
      return
    for(let i=0;i<isSelected.length;i++){
      isSelected[i]=false
    }
    isSelected[item]=true
    let image
    if(item==0)
      image=that.data.fenshi
    else if(item==1)
      image=that.data.rik
    else if(item==2)
      image=that.data.zhouk
    else if(item==3)
      image=that.data.yuek
    that.setData({
      isSelected,
      image
    })
  },

})