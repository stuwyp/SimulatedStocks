// pages/match/match_rank/match_rank.js
let app = getApp();
const baseUrl = app.globalData.url

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    wx.setNavigationBarTitle({
      title: '排行榜',
    })
    let that=this
    let match_data=JSON.parse(options.match_data)
    let token=wx.getStorageSync('token')
    let matchid=match_data.id
    wx.request({
      url: baseUrl +'/getMatchRank',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded" //post
      },
      data:{
        token:token,
        matchid:matchid
      },
      success(res){
        console.log(res)
        if(res.data.value===1){
          that.setData({
            rankList:res.data.ranklist,
            match_data
          })
          wx.hideLoading()
        }
        else if(res.data.value===-6){
              that.setData({
                  rankList:[],
                  match_data
              })
              wx.hideLoading()
          }
        else{
          wx.hideLoading()
          wx.showToast({
            title: '出现错误',
            icon: 'none'
          })
        }
      },
      fail(res){
        console.log(res)
        wx.hideLoading()
        wx.showToast({
          title: '出现错误',
          icon:'none'
        })
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

  }
})
